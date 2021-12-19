using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SaleDrink.ApplicationAPI.Application.Common.Exceptions;
using SaleDrink.ApplicationAPI.WebAPI.Models.Response;

namespace SaleDrink.ApplicationAPI.WebAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [Route("error")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ResponseContract<object> Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            return new ResponseContract<object>()
            {
                Result = false,
                Error = new ErrorContract()
                {
                    Message = context?.Error is UserInterfaceException
                                ? $"{((UserInterfaceException)context?.Error)?.UIMessage}"
                                : "Ошибка выполнения запроса",
                    ErrorCode = context?.Error is UserInterfaceException
                                ? $"{((UserInterfaceException)context?.Error)?.Id}"
                                : string.Empty
                }
            };
        }


    }
}