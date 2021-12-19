using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces.Context;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SaleDrink.ApplicationAPI.Application.Drinks.Queries.GetDrinks
{
    public class GetDrinksQuery : IRequest<List<DrinkVm>>
    {

        public class GetDrinksQueryHandler : IRequestHandler<GetDrinksQuery, List<DrinkVm>>
        {
            private readonly IApplicationAPIContext _context;
            private readonly IMapper _mapper;

            public GetDrinksQueryHandler(IApplicationAPIContext context,
                IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<DrinkVm>> Handle(GetDrinksQuery request, CancellationToken cancellationToken)
            {
                var vm = await _context.Drinks
                    .ProjectTo<DrinkVm>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                return vm;
            }
        }
    }
}
