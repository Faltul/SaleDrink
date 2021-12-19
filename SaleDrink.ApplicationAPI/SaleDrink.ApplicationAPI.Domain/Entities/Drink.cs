using System;

namespace SaleDrink.ApplicationAPI.Domain.Entities
{
    public class Drink
    {
        public Guid Id { get; set; }
        public string Label { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public bool IsActive { get; set; }
    }
}
