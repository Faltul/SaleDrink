using Microsoft.AspNetCore.SignalR;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces;

namespace SaleDrink.ApplicationAPI.Application.Common.Infrastructure.Hubs
{
    public class NotificationHub: Hub<INotificationService> 
    {


    }
}
