using FluentValidation;

namespace SaleDrink.ApplicationAPI.Application.Drinks.Commands.CreateDrink
{
    public class CreateDrinkCommandValidator : AbstractValidator<CreateDrinkCommand>
    {
        public CreateDrinkCommandValidator()
        {
            RuleFor(x => x.Label).NotEmpty().NotNull().WithMessage("Не переданно наименование купюры");
            RuleFor(x => x.Price).NotEmpty().GreaterThanOrEqualTo(1).WithMessage("Не передана цена");
            RuleFor(x => x.Quantity).NotEmpty().GreaterThanOrEqualTo(1).WithMessage("Не передано колличество");
        }
    }
}
