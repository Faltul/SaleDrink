using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces;
using SaleDrink.ApplicationAPI.Infrastructure.Services;

namespace SaleDrink.ApplicationAPI.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient(typeof(IUserIdentityService), typeof(UserIdentityPathArgService));
           
            return services;
        }
    }
}
