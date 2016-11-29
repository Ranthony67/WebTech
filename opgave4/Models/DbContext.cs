using Microsoft.EntityFrameworkCore;

namespace WebOpgave4.Models
{
    public class DatabaseContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(@"Host=eu-cdbr-west-01.cleardb.com;Database=heroku_eb6883ea620f8fe;User ID=b53fce09ced81c;Password=c00add37;");
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Component> Components { get; set; }
        public DbSet<ComponentType> ComponentTypes { get; set; }
        public DbSet<ESImage> ESImages { get; set; }
    }
}