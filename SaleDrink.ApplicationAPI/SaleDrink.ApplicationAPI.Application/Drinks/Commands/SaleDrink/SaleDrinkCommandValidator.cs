using FluentValidation;

namespace SaleDrink.ApplicationAPI.Application.Drinks.Commands.SaleDrink
{
    public class SaleDrinkCommandValidator: AbstractValidator<SaleDrinkCommand>
    {
        public SaleDrinkCommandValidator()
        {
            RuleFor(x => x.DrinkId).NotEmpty().WithMessage("Не передан идентификатор напитка");

        }
    }
}
