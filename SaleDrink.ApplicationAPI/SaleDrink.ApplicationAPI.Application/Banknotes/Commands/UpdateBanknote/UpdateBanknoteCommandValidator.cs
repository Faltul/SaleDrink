using FluentValidation;


namespace SaleDrink.ApplicationAPI.Application.Banknotes.Commands.UpdateBanknote
{
    public class UpdateBanknoteCommandValidator : AbstractValidator<UpdateBanknoteCommand>
    {
        public UpdateBanknoteCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Не передан идентификатор купюры");
            RuleFor(x => x.Label).NotEmpty().NotNull().WithMessage("Не переданно наименование купюры");
            RuleFor(x => x.NominalValue).NotEmpty().GreaterThanOrEqualTo(1).WithMessage("Не переданн наминал  купюры");
        }
    }
}
