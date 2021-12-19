using AutoMapper;
using SaleDrink.ApplicationAPI.Application.Common.Mappings;
using SaleDrink.ApplicationAPI.Domain.Entities;


namespace SaleDrink.ApplicationAPI.Application.Drinks.Commands.SaleDrink.Models
{
    public  class BanknoteShortDto : IMapFrom<Banknote>
    {
        public string Label { get; set; }
        public int NominalValue { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Banknote, BanknoteShortDto>()
                .ForMember(d => d.Label, opt => opt.MapFrom(s => s.Label))
                .ForMember(d => d.NominalValue, opt => opt.MapFrom(s => s.NominalValue));
        }

    }
}
