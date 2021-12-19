using System;

namespace SaleDrink.ApplicationAPI.Domain.Entities
{
    public class Banknote
    {
        public Guid Id { get; set; }
        public string Label { get; set; }
        public int NominalValue { get; set; }
        public bool IsActive { get; set; }

    }
}
