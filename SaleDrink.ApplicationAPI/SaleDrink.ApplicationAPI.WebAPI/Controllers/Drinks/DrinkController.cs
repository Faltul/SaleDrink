using Microsoft.AspNetCore.Mvc;
using SaleDrink.ApplicationAPI.Application.Drinks.Commands.CreateDrink;
using SaleDrink.ApplicationAPI.Application.Drinks.Commands.DeleteDrink;
using SaleDrink.ApplicationAPI.Application.Drinks.Commands.UpdateDrink;
using SaleDrink.ApplicationAPI.Application.Drinks.Commands.SaleDrink;
using SaleDrink.ApplicationAPI.Application.Drinks.Queries.GetDrinks;
using SaleDrink.ApplicationAPI.WebAPI.Models.Response;
using SaleDrink.ApplicationAPI.WebAPI.Common.Filters;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace SaleDrink.ApplicationAPI.WebAPI.Controllers.Drinks
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinkController : ApplicationAPIBaseController
    {


        [HttpGet]
        [Route("GetDrinks")]
        public async Task<ResponseContract<List<DrinkVm>>> GetDrinks( CancellationToken cancellationToken)
        {
            var vm = await Mediator.Send(new GetDrinksQuery() , cancellationToken);
            return new ResponseContract<List<DrinkVm>>() { Result = true, Data = vm };
        }


        [HttpPost]
        [Route("SaleDrink")]
        public async Task<ResponseContract<SaleDrinkRefundVm>> SaleDrink(SaleDrinkCommand command, CancellationToken cancellationToken)
        {

            var vm = await Mediator.Send(command, cancellationToken);
            return new ResponseContract<SaleDrinkRefundVm>() { Result = true, Data = vm };
        }

        [HttpPost]
        [KeyAuthorizationAttribute]
        [Route("{key}/CreateDrink")]
        public async Task<ResponseContract<Guid>> CreateDrink(CreateDrinkCommand command, CancellationToken cancellationToken)
        {

            var vm = await Mediator.Send(command, cancellationToken);
            return new ResponseContract<Guid>() { Result = true, Data = vm };
        }

        [HttpPut]
        [KeyAuthorizationAttribute]
        [Route("{key}/UpdateDrink")]
        public async Task<ResponseContract<Unit>> UpdateDrink(UpdateDrinkCommand command, CancellationToken cancellationToken)
        {

            var vm = await Mediator.Send(command, cancellationToken);
            return new ResponseContract<Unit>() { Result = true, Data = vm };
        }

        [HttpDelete]
        [KeyAuthorizationAttribute]
        [Route("{key}/DeleteDrink")]
        public async Task<ResponseContract<Unit>> DeleteDrink(Guid drinkId, CancellationToken cancellationToken)
        {

            var vm = await Mediator.Send(new DeleteDrinkCommand()
            {
                Id = drinkId
            }, cancellationToken) ;
            return new ResponseContract<Unit>() { Result = true, Data = vm };
        }
    }
}
