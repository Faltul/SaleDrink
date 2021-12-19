using System.Threading.Tasks;

namespace SaleDrink.ApplicationAPI.Application.Common.Interfaces
{
    public interface IUserIdentityService
    {
        Task<bool> IsAdmin ();
  
    }
}
