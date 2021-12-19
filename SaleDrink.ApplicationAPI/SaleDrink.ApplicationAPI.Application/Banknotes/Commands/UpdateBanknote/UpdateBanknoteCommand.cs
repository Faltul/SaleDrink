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


namespace SaleDrink.ApplicationAPI.Application.Banknotes.Commands.UpdateBanknote
{
    public class UpdateBanknoteCommand : IRequest<Unit>
    {
        public Guid Id { get; set; }
        public string Label { get; set; }
        public int NominalValue { get; set; }
        public bool IsActive { get; set; }

        public class UpdateBanknoteCommandHandler : IRequestHandler<UpdateBanknoteCommand, Unit>
        {
            private readonly IApplicationAPIContext _context;
            private readonly IHubContext<NotificationHub, INotificationService> _hubContext;
            private readonly IMapper _mapper;

            public UpdateBanknoteCommandHandler(IApplicationAPIContext context,
                IHubContext<NotificationHub, INotificationService> hubContext,
                IMapper mapper)
            {
                _context = context;
                _hubContext = hubContext;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(UpdateBanknoteCommand request, CancellationToken cancellationToken)
            {

                var banknote = await _context.Banknotes
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                if (banknote == null)
                {
                    throw new NotFoundException("Banknotes", request.Id, "Не удалсось найти купюру");
                }
                if (_context.Banknotes.Any(x => (x.Label.Trim().ToLower() == request.Label.Trim().ToLower() ||
                                                x.NominalValue == request.NominalValue) && 
                                                x.Id!=request.Id))
                {
                    throw new BadRequestException($"Уже существует купюра с данным именем или номиналом. Label:'{request.Label}' NominalValue:'{request.NominalValue}'", "Уже существует купюра с данным именем или номиналом");
                }
                using (var transaction = _context.Database.BeginTransaction())
                {
                    banknote.NominalValue = request.NominalValue;
                    banknote.Label = request.Label;
                    banknote.IsActive = request.IsActive;
                    await _context.SaveChangesAsync(cancellationToken);
                    await _hubContext.Clients.All.ChangeBanknote(banknote);
                    await transaction.CommitAsync(cancellationToken);

                }

                return Unit.Value;
            }
        }
    }
}
