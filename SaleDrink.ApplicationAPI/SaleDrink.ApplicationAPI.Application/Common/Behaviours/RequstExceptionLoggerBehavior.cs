using MediatR;
using Microsoft.Extensions.Logging;
using SaleDrink.ApplicationAPI.Application.Common.Exceptions;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SaleDrink.ApplicationAPI.Application.Common.Behaviours
{
    public class RequstExceptionLoggerBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private readonly ILogger<RequstExceptionLoggerBehavior<TRequest, TResponse>> _logger;

        public RequstExceptionLoggerBehavior(ILogger<RequstExceptionLoggerBehavior<TRequest, TResponse>> logger)
        {
            _logger = logger;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            try
            {
                var response = await next().ConfigureAwait(false);
                return response;
            }
            catch(Exception ex)
            {
                var uiException = ex as UserInterfaceException;
                if (uiException!=null)
                {
                    var name = typeof(TRequest).Name;
                    _logger.LogError($"Exception Request: '{name}' '{request}'. Messages: '{ex.ToString()}'. Guid: '{uiException.Id}'");
                    throw;
                }
                else
                {
                    var exception = new ExecutionException(ex.Message, ex);
                    var name = typeof(TRequest).Name;
                    if (!(ex is TaskCanceledException))
                        _logger.LogError($"Exception Request: '{name}' '{request}'. Messages: '{ex.ToString()}'. Guid: '{exception.Id}'");
                    throw exception;
                }
            }
        }
    }
}
