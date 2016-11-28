using Microsoft.EntityFrameworkCore;

namespace WebOpgave4.Models
{
    public class DatabaseContext : DbContext
    {
        public virtual DbSet<Category> Categories { get; set; }
    }
}