using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SaleDrink.ApplicationAPI.Application.Common.Exceptions;
using SaleDrink.ApplicationAPI.Application.Common.Infrastructure.Hubs;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces.Context;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SaleDrink.ApplicationAPI.Application.Drinks.Commands.UpdateDrink
{
    public class UpdateDrinkCommand : IRequest<Unit>
    {
        public Guid Id { get; set; }
        public string Label { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public bool IsActive { get; set; }

        public class UpdateDrinkCommandHandler : IRequestHandler<UpdateDrinkCommand, Unit>
        {
            private readonly IApplicationAPIContext _context;
            private readonly IHubContext<NotificationHub, INotificationService> _hubContext;
            private readonly IMapper _mapper;

            public UpdateDrinkCommandHandler(IApplicationAPIContext context,
                IHubContext<NotificationHub, INotificationService> hubContext,
                IMapper mapper)
            {
                _context = context;
                _hubContext = hubContext;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(UpdateDrinkCommand request, CancellationToken cancellationToken)
            {

                var drink = await _context.Drinks
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                if (drink == null)
                {
                    throw new NotFoundException("Drinks", request.Id, "Не удалсось найти напиток");
                }
                if (_context.Drinks.Any(x => x.Label.Trim().ToLower() == request.Label.Trim().ToLower() &&
                                                x.Id!=request.Id))
                {
                    throw new BadRequestException($"Уже существует напиток с данным именем. Label:'{request.Label}'", "Уже существует напиток с данным именем");
                }
                using (var transaction = _context.Database.BeginTransaction())
                {
                    drink.Price = request.Price;
                    drink.Quantity = request.Quantity;
                    drink.Label = request.Label;
                    drink.IsActive = request.IsActive;
                    await _context.SaveChangesAsync(cancellationToken);
                    await _hubContext.Clients.All.ChangeDrink(drink);
                    await transaction.CommitAsync(cancellationToken);

                }

                return Unit.Value;
            }
        }
    }
}
