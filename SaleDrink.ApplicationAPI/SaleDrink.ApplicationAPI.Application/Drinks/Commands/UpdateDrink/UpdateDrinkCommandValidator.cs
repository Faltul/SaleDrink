using FluentValidation;


namespace SaleDrink.ApplicationAPI.Application.Drinks.Commands.UpdateDrink
{
    public class UpdateDrinkCommandValidator : AbstractValidator<UpdateDrinkCommand>
    {
        public UpdateDrinkCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Не передан идентификатор напитка");
            RuleFor(x => x.Label).NotEmpty().NotNull().WithMessage("Не переданно наименование купюры");
            RuleFor(x => x.Price).NotEmpty().GreaterThanOrEqualTo(1).WithMessage("Не передана цена");
            RuleFor(x => x.Quantity).NotEmpty().GreaterThanOrEqualTo(1).WithMessage("Не передано колличество");
        }
    }
}
