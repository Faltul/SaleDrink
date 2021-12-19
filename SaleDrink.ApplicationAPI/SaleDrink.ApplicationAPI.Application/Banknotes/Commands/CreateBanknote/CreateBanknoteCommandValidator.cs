using FluentValidation;

namespace SaleDrink.ApplicationAPI.Application.Banknotes.Commands.CreateBanknote
{
    public class CreateBanknoteCommandValidator: AbstractValidator<CreateBanknoteCommand>
    {
        public CreateBanknoteCommandValidator()
        {
            RuleFor(x => x.Label).NotEmpty().NotNull().WithMessage("Не переданно наименование купюры");
            RuleFor(x => x.NominalValue).NotEmpty().GreaterThanOrEqualTo(1).WithMessage("Не переданн наминал  купюры");
        }
    }
}
