using Microsoft.AspNetCore.Mvc;
using SaleDrink.ApplicationAPI.Application.Banknotes.Commands.CreateBanknote;
using SaleDrink.ApplicationAPI.Application.Banknotes.Commands.DeleteBanknote;
using SaleDrink.ApplicationAPI.Application.Banknotes.Commands.UpdateBanknote;
using SaleDrink.ApplicationAPI.Application.Banknotes.Queries.GetBanknotes;
using SaleDrink.ApplicationAPI.WebAPI.Models.Response;
using SaleDrink.ApplicationAPI.WebAPI.Common.Filters;
using SaleDrink.ApplicationAPI.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace SaleDrink.ApplicationAPI.WebAPI.Controllers.Banknotes
{
    [Route("api/[controller]")]
    [ApiController]
    public class BanknoteController : ApplicationAPIBaseController
    {

       
        [HttpGet]
        [Route("GetBanknotes")]
        public async Task<ResponseContract<List<BanknoteVm>>> GetBanknotes( CancellationToken cancellationToken)
        {
            var vm = await Mediator.Send(new GetBanknotesQuery() , cancellationToken);
            return new ResponseContract<List<BanknoteVm>>() { Result = true, Data = vm };
        }


    

        [HttpPost]
        [KeyAuthorizationAttribute]
        [Route("{key}/CreateBanknote")]
        public async Task<ResponseContract<Guid>> CreateBanknote(CreateBanknoteCommand command, CancellationToken cancellationToken)
        {

            var vm = await Mediator.Send(command, cancellationToken);
            return new ResponseContract<Guid>() { Result = true, Data = vm };
        }

        [HttpPut]
        [KeyAuthorizationAttribute]
        [Route("{key}/UpdateBanknote")]
        public async Task<ResponseContract<Unit>> UpdateBanknote(UpdateBanknoteCommand command, CancellationToken cancellationToken)
        {

            var vm = await Mediator.Send(command, cancellationToken);
            return new ResponseContract<Unit>() { Result = true, Data = vm };
        }

        [HttpDelete]
        [KeyAuthorizationAttribute]
        [Route("{key}/DeleteBanknote")]
        public async Task<ResponseContract<Unit>> DeleteBanknote(Guid banknoteId, CancellationToken cancellationToken)
        {

            var vm = await Mediator.Send(new DeleteBanknoteCommand()
            {
                Id = banknoteId
            }, cancellationToken) ;
            return new ResponseContract<Unit>() { Result = true, Data = vm };
        }
    }
}
