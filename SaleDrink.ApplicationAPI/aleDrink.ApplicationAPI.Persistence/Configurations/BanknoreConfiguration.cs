using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaleDrink.ApplicationAPI.Domain.Entities;

namespace SaleDrink.ApplicationAPI.Persistence.Configurations
{
    public class BanknoreConfiguration : IEntityTypeConfiguration<Banknote>
    {
        public void Configure(EntityTypeBuilder<Banknote> builder)
        {
            builder.ToTable("Banknotes");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedNever().IsRequired();
            builder.Property(x => x.Label).IsRequired(true);
            builder.Property(x => x.NominalValue).IsRequired(true);
            builder.Property(x => x.IsActive).IsRequired(true);

        }
    }
}
