using FluentValidation;


namespace SaleDrink.ApplicationAPI.Application.Banknotes.Commands.DeleteBanknote
{
    public class DeleteBanknoteCommandValidator : AbstractValidator<DeleteBanknoteCommand>
    {
        public DeleteBanknoteCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Не передан идентификатор купюры");
        }
    }
}
