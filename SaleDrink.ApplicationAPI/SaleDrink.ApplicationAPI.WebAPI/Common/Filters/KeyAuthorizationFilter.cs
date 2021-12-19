using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces;
using System.Threading.Tasks;

namespace SaleDrink.ApplicationAPI.WebAPI.Common.Filters
{


    public class KeyAuthorizationAttribute : TypeFilterAttribute
    {
        public KeyAuthorizationAttribute() : base(typeof(KeyAuthorizationFilter))
        {
        }
    }

    public class KeyAuthorizationFilter : IAsyncAuthorizationFilter
    {
        private readonly IUserIdentityService _userIdentityService;

        public KeyAuthorizationFilter(IUserIdentityService userIdentityService)
        {
            _userIdentityService = userIdentityService;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var isAdmin = await _userIdentityService.IsAdmin();
            if (!isAdmin)
            {
                context.Result = new StatusCodeResult(403);
            }
        }
    }



    
}
