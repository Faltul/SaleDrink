using SaleDrink.ApplicationAPI.Application.Drinks.Commands.SaleDrink.Models;
using System.Collections.Generic;

namespace SaleDrink.ApplicationAPI.Application.Drinks.Commands.SaleDrink
{
    public  class SaleDrinkRefundVm
    {
        public decimal Amount { get; set; }
        public List<RefundBanknoteDto> RefundBanknotes { get; set; }

    }

}
