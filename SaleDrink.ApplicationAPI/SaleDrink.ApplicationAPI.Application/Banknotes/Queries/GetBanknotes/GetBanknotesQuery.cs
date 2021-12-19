using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces.Context;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SaleDrink.ApplicationAPI.Application.Banknotes.Queries.GetBanknotes
{
    public class GetBanknotesQuery : IRequest<List<BanknoteVm>>
    {

        public class GetBanknotesQueryHandler : IRequestHandler<GetBanknotesQuery, List<BanknoteVm>>
        {
            private readonly IApplicationAPIContext _context;
            private readonly IMapper _mapper;

            public GetBanknotesQueryHandler(IApplicationAPIContext context,
                IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<BanknoteVm>> Handle(GetBanknotesQuery request, CancellationToken cancellationToken)
            {
                var vm = await _context.Banknotes
                    .ProjectTo<BanknoteVm>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                return vm;
            }
        }
    }
}
