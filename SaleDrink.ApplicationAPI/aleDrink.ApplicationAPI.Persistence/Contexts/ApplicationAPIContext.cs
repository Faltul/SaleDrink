using Microsoft.EntityFrameworkCore;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces.Context;
using SaleDrink.ApplicationAPI.Domain.Entities;

namespace Spektr.ApplicationAPI.Persistence.Contexts
{
    public class ApplicationAPIContext : DbContext, IApplicationAPIContext
    {
        
        public DbSet<Drink> Drinks { get; set; }
        public DbSet<Banknote> Banknotes { get; set; }

        public ApplicationAPIContext(DbContextOptions<ApplicationAPIContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("Cyrillic_General_CI_AS");
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationAPIContext).Assembly);
        }
  
    }
}
