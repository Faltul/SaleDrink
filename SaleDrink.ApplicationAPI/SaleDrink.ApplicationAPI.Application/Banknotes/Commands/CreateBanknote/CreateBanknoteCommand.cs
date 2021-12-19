using AutoMapper;
using MediatR;
using SaleDrink.ApplicationAPI.Application.Common.Exceptions;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces.Context;
using SaleDrink.ApplicationAPI.Domain.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SaleDrink.ApplicationAPI.Application.Banknotes.Commands.CreateBanknote
{
    public class CreateBanknoteCommand : IRequest<Guid>
    {
        public string Label { get; set; }
        public int NominalValue { get; set; }
        public bool IsActive { get; set; }

        public class CreateBanknoteCommandHandler : IRequestHandler<CreateBanknoteCommand, Guid>
        {
            private readonly IApplicationAPIContext _context;
            private readonly IMapper _mapper;

            public CreateBanknoteCommandHandler(IApplicationAPIContext context,
                IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Guid> Handle(CreateBanknoteCommand request, CancellationToken cancellationToken)
            {
                if (_context.Banknotes.Any(x => x.Label.Trim().ToLower() == request.Label.Trim().ToLower() ||
                                                x.NominalValue==request.NominalValue))
                {
                    throw new BadRequestException($"Уже существует купюра с данным именем или номиналом. Label:'{request.Label}' NominalValue:'{request.NominalValue}'", "Уже существует купюра с данным именем или номиналом");
                }
                var id = Guid.NewGuid();
                await _context.Banknotes.AddAsync(new Banknote()
                {
                    Id = id,
                    Label = request.Label.Trim(),
                    NominalValue = request.NominalValue,
                    IsActive = request.IsActive,

                });
                await _context.SaveChangesAsync(cancellationToken);
                return id;
            }
        }
    }
}
