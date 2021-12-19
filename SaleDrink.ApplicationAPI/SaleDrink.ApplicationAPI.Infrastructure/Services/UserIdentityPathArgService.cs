using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using SaleDrink.ApplicationAPI.Application.Common.Exceptions;


namespace SaleDrink.ApplicationAPI.Infrastructure.Services
{
    public class UserIdentityPathArgService : IUserIdentityService
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;

        public UserIdentityPathArgService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }
        public Task<bool> IsAdmin()
        {

            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext != null)
            {
                var routeData = httpContext.GetRouteData();
                var key = routeData?.Values["key"]?.ToString();

                if (key == null)
                {
                    throw new ArgumentNullException();
                }

                var adminKey = _configuration.GetSection("AdminKey")?.Value;

                if (string.IsNullOrEmpty(adminKey))
                {
                    throw new ExecutionException($"В файле конфигкрации отсутсвутет ключ администратора","Ошибка выполнения запроса");
                }

                return Task.FromResult(string.Compare(key, adminKey, true)>=0);

            }
            else
            {
                throw new ExecutionException($"Отсутсвутет HttpContext", "Ошибка выполнения запроса");

            }
        }
    }
}
