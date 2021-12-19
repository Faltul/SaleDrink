using AutoMapper;
using MediatR;
using SaleDrink.ApplicationAPI.Application.Common.Exceptions;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces.Context;
using SaleDrink.ApplicationAPI.Domain.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SaleDrink.ApplicationAPI.Application.Drinks.Commands.CreateDrink
{
    public class CreateDrinkCommand : IRequest<Guid>
    {
        public string Label { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public bool IsActive { get; set; }

        public class CreateDrinkCommandHandler : IRequestHandler<CreateDrinkCommand, Guid>
        {
            private readonly IApplicationAPIContext _context;
            private readonly IMapper _mapper;

            public CreateDrinkCommandHandler(IApplicationAPIContext context,
                IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Guid> Handle(CreateDrinkCommand request, CancellationToken cancellationToken)
            {
                if (_context.Drinks.Any(x => x.Label.Trim().ToLower() == request.Label.Trim().ToLower()))
                {
                    throw new BadRequestException($"Уже существует напиток с данным именем. Label:'{request.Label}'", "Уже существует купюра с данным именем");
                }
                var id = Guid.NewGuid();
                await _context.Drinks.AddAsync(new Drink()
                {
                    Id = id,
                    Label = request.Label.Trim(),
                    Price = request.Price,
                    Quantity = request.Quantity,
                    IsActive = request.IsActive,

                });
                await _context.SaveChangesAsync(cancellationToken);
                return id;
            }
        }
    }
}
