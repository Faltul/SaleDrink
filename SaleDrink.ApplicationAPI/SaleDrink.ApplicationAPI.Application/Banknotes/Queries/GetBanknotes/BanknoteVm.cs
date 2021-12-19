using AutoMapper;
using SaleDrink.ApplicationAPI.Application.Common.Mappings;
using SaleDrink.ApplicationAPI.Domain.Entities;
using System;

namespace SaleDrink.ApplicationAPI.Application.Banknotes.Queries.GetBanknotes
{
    public class BanknoteVm : IMapFrom<Banknote>
    {
        public Guid Id { get; set; }
        public string Label { get; set; }
        public int NominalValue { get; set; }
        public bool IsActive { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Banknote, BanknoteVm>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Label, opt => opt.MapFrom(s => s.Label))
                .ForMember(d => d.NominalValue, opt => opt.MapFrom(s => s.NominalValue))
                .ForMember(d => d.IsActive, opt => opt.MapFrom(s => s.IsActive));
        }

    }
}
