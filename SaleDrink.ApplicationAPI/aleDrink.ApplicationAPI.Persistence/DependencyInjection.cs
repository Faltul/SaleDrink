using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces.Context;
using Spektr.ApplicationAPI.Persistence.Contexts;

namespace SaleDrink.ApplicationAPI.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddDbContext<IApplicationAPIContext, ApplicationAPIContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            return services;
        }
    }
}
