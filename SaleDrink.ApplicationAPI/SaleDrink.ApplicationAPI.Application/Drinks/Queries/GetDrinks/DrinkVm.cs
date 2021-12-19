using AutoMapper;
using SaleDrink.ApplicationAPI.Application.Common.Mappings;
using SaleDrink.ApplicationAPI.Domain.Entities;
using System;

namespace SaleDrink.ApplicationAPI.Application.Drinks.Queries.GetDrinks
{
    public class DrinkVm : IMapFrom<Drink>
    {
        public Guid Id { get; set; }
        public string Label { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public bool IsActive { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Drink, DrinkVm>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Label, opt => opt.MapFrom(s => s.Label))
                .ForMember(d => d.Price, opt => opt.MapFrom(s => s.Price))
                .ForMember(d => d.Quantity, opt => opt.MapFrom(s => s.Quantity))
                .ForMember(d => d.IsActive, opt => opt.MapFrom(s => s.IsActive));
        }

    }
}
