using System.Collections.Generic;

namespace WebOpgave4.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<CategoryComponentType> CategoryComponentTypes { get; protected set; } = new HashSet<CategoryComponentType>();
    }
}
