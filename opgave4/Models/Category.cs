using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebOpgave4.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<CategoryComponentType> CategoryComponentTypes { get; protected set; } = new HashSet<CategoryComponentType>();
    }
}
