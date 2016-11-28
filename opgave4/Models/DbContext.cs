using Microsoft.EntityFrameworkCore;

namespace WebOpgave4.Models
{
    public class DatabaseContext : DbContext
    {
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Component> Components { get; set; }
        public virtual DbSet<ComponentType> ComponentTypes { get; set; }
        public virtual DbSet<ESImage> ESImages { get; set; }
    }
}