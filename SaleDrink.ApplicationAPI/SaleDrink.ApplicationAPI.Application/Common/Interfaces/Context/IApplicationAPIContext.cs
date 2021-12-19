using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SaleDrink.ApplicationAPI.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace SaleDrink.ApplicationAPI.Application.Common.Interfaces.Context
{
    public interface IApplicationAPIContext
    {
        DbSet<Drink> Drinks { get; set; }
        DbSet<Banknote> Banknotes { get; set; }
        DatabaseFacade Database { get; }


        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
  
    }
}
