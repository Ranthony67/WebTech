using System.Collections.Generic;
using WebOpgave4.Models;

namespace WebOpgave4.DAL.DTOs{
    public class CategoryPostDTO{
        public string Name { get; set; }
        public ICollection<ComponentType> ComponentTypes { get; protected set; }
    }
}