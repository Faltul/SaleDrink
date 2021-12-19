using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SaleDrink.ApplicationAPI.Application.Common.Exceptions;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces.Context;
using System;
using System.Threading;
using System.Threading.Tasks;


namespace SaleDrink.ApplicationAPI.Application.Drinks.Commands.DeleteDrink
{
    public class DeleteDrinkCommand : IRequest<Unit>
    {
        public Guid Id { get; set; }
 
        public class DeleteDrinkCommandHandler : IRequestHandler<DeleteDrinkCommand, Unit>
        {
            private readonly IApplicationAPIContext _context;
            private readonly IMapper _mapper;

            public DeleteDrinkCommandHandler(IApplicationAPIContext context,
                IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(DeleteDrinkCommand request, CancellationToken cancellationToken)
            {

                var drink = await _context.Drinks
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                if (drink == null)
                {
                    throw new NotFoundException("Drinks", request.Id, "Не удалсось найти напиток");
                }
                _context.Drinks.Remove(drink);
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}
