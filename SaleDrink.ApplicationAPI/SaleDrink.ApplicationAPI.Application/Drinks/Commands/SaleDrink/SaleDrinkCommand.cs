using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using SaleDrink.ApplicationAPI.Application.Common.Exceptions;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces.Context;
using SaleDrink.ApplicationAPI.Application.Common.Infrastructure.Hubs;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces;
using SaleDrink.ApplicationAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace SaleDrink.ApplicationAPI.Application.Drinks.Commands.SaleDrink
{
    public class SaleDrinkCommand : IRequest<SaleDrinkRefundVm>
    {
        public Guid DrinkId { get; set; }
        public List<Guid> BanknotesId { get; set; }

        public class SaleDrinkCommandHandler : IRequestHandler<SaleDrinkCommand, SaleDrinkRefundVm>
        {
            private readonly IApplicationAPIContext _context;
            private readonly IHubContext<NotificationHub, INotificationService> _hubContext;
            private readonly IMapper _mapper;

            public SaleDrinkCommandHandler(IApplicationAPIContext context,
                IHubContext<NotificationHub, INotificationService> hubContext,
                IMapper mapper)
            {
                _context = context;
                _hubContext = hubContext;
                _mapper = mapper;
            }

            public async Task<SaleDrinkRefundVm> Handle(SaleDrinkCommand request, CancellationToken cancellationToken)
            {
                var drink = await _context.Drinks
                    .FirstOrDefaultAsync(x => x.Id == request.DrinkId);
                if (drink == null)
                {
                    throw new NotFoundException("Drinks", request.DrinkId, "Не удалсось найти напиток");
                }
                var banknotes = await _context.Banknotes
                    .Where(x=>x.IsActive)
                    .ToListAsync(cancellationToken);
                var amount =  banknotes.Join(request.BanknotesId,x=>x.Id,y=>y, (x,y)=>x)
                    .Sum(x => x.NominalValue);
                if (drink.Price> amount)
                {
                    throw new BadRequestException($"Недостаточно суммы для покупки. Proce:'{drink.Price}' Amount: '{amount}'", "Недостаточно суммы для покупки");
                }
                var refunds = new List<Banknote>();
                var refundAmaunt = amount - drink.Price;
                var refundAmauntTmp = refundAmaunt;

                foreach (var banknote in banknotes.OrderByDescending(x=>x.NominalValue))
                {
                    var isProccess = true;
                    while (isProccess)
                    {
                        if (refundAmauntTmp >= banknote.NominalValue)
                        {
                            refunds.Add(banknote);
                            refundAmauntTmp = refundAmauntTmp - banknote.NominalValue;
                        }
                        else
                        {
                            isProccess = false;
                        }
                    }
                    if(refundAmauntTmp==0)
                    {
                        break;
                    }
                }
                if (refunds.Sum(x=>x.NominalValue)!= refundAmaunt)
                {
                    throw new ExecutionException($"Невозможно выдать сдачу", "Невозможно выдать сдачу");

                }
                if (drink.Quantity<=0)
                {
                    throw new BadRequestException($"Напитка нет в наличии DrinkId:'{request.DrinkId}'", "Напитка нет в наличии") ;

                }
                using (var transaction = _context.Database.BeginTransaction())
                {
                    drink.Quantity = --drink.Quantity;
                    await _context.SaveChangesAsync(cancellationToken);
                    await _hubContext.Clients.All.ChangeDrink(drink);
                    var vm = new SaleDrinkRefundVm()
                    {
                        Amount = refundAmaunt,
                        RefundBanknotes = refunds.GroupBy(x => x.Id).Select(x => new Models.RefundBanknoteDto()
                        {
                            Quantity = x.Count(),
                            Banknote = new Models.BanknoteShortDto()
                            {
                                Label = x.FirstOrDefault().Label,
                                NominalValue = x.FirstOrDefault().NominalValue
                            }
                        }).ToList()
                    };
                    await transaction.CommitAsync(cancellationToken);
                    return vm;
                }
                    
                
            }
        }
    }
}
