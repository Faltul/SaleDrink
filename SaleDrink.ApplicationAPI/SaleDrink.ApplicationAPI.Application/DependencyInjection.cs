using System;
using System.Reflection;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using SaleDrink.ApplicationAPI.Application.Common.Behaviours;
using SaleDrink.ApplicationAPI.Domain.Entities;
using MediatR;


namespace SaleDrink.ApplicationAPI.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequstExceptionLoggerBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));

            FluentValidation.AssemblyScanner.FindValidatorsInAssemblyContaining(typeof(DependencyInjection))
               .ForEach(result => services.AddScoped(result.InterfaceType, result.ValidatorType));


            return services;
        }
    }
}
