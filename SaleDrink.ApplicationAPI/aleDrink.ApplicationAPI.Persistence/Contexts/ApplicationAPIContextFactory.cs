using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Spektr.ApplicationAPI.Persistence.Contexts
{
    public class ApplicationAPIContextFactory : IDesignTimeDbContextFactory<ApplicationAPIContext>
    {
        public ApplicationAPIContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationAPIContext>();


             optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;AttachDBFilename=C:\\Проекты\\Тестовое задание\\TestDB.mdf;Trusted_Connection=true;MultipleActiveResultSets=true");
            return new ApplicationAPIContext(optionsBuilder.Options);
        }
    }
}
