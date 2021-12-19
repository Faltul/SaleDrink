using System.Threading.Tasks;
using SaleDrink.ApplicationAPI.Domain.Entities;

namespace SaleDrink.ApplicationAPI.Application.Common.Interfaces
{
    public interface INotificationService
    {
        Task ChangeBanknote(Banknote banknote);
        Task ChangeDrink(Drink drink);
    }
}
