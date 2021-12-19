using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SaleDrink.ApplicationAPI.Application.Common.Exceptions
{

    [Serializable]
    public class ValidationException : UserInterfaceException
    {
        public ValidationException()
            : base("Произошла одна или несколько ошибок валидации.", "Произошла одна или несколько ошибок валидации.")
        {
            Failures = new Dictionary<string, string[]>();
        }

        public ValidationException(List<ValidationFailure> failures)
            : base("Произошла одна или несколько ошибок валидации.", "Произошла одна или несколько ошибок валидации.")
        {
            Failures = new Dictionary<string, string[]>();

            var propertyNames = failures
                .Select(e => e.PropertyName)
                .Distinct();

            foreach (var propertyName in propertyNames)
            {
                var propertyFailures = failures
                    .Where(e => e.PropertyName == propertyName)
                    .Select(e => e.ErrorMessage)
                    .ToArray();

                Failures.Add( propertyName, propertyFailures);
            }
        }

        public IDictionary<string, string[]> Failures { get; }

    }
}
