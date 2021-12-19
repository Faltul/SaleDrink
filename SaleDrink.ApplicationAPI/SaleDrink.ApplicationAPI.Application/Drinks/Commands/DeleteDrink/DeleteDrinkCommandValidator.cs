using FluentValidation;


namespace SaleDrink.ApplicationAPI.Application.Drinks.Commands.DeleteDrink
{
    public class DeleteDrinkCommandValidator : AbstractValidator<DeleteDrinkCommand>
    {
        public DeleteDrinkCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Не передан идентификатор напитка");
        }
    }
}
