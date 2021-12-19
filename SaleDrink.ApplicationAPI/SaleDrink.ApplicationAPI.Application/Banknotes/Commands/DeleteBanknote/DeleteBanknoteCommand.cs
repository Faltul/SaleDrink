using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SaleDrink.ApplicationAPI.Application.Common.Exceptions;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces.Context;
using System;
using System.Threading;
using System.Threading.Tasks;


namespace SaleDrink.ApplicationAPI.Application.Banknotes.Commands.DeleteBanknote
{
    public class DeleteBanknoteCommand : IRequest<Unit>
    {
        public Guid Id { get; set; }
 
        public class DeleteBanknoteCommandHandler : IRequestHandler<DeleteBanknoteCommand, Unit>
        {
            private readonly IApplicationAPIContext _context;
            private readonly IMapper _mapper;

            public DeleteBanknoteCommandHandler(IApplicationAPIContext context,
                IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(DeleteBanknoteCommand request, CancellationToken cancellationToken)
            {

                var banknote = await _context.Banknotes
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                if (banknote == null)
                {
                    throw new NotFoundException("Banknotes", request.Id, "Не удалсось найти купюру");
                }
                _context.Banknotes.Remove(banknote);
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}
