using System.Collections.Generic;
using static Enums;

namespace WebOpgave4.Models
{
    public class ComponentType
    {
        public long ComponentTypeId { get; set; }
        public string ComponentName { get; set; }
        public string ComponentInfo { get; set; }
        public string Location { get; set; }
        public ComponentTypeStatus Status { get; set; }
        public string Datasheet { get; set; }
        public string ImageUrl { get; set; }
        public string Manufacturer { get; set; }
        public string WikiLink { get; set; }
        public string AdminComment { get; set; }
        public virtual ESImage Image { get; set; }
        public virtual ICollection<Component> Components { get; protected set; } = new HashSet<Component>();
        public virtual ICollection<CategoryComponentType> CategoryComponentTypes { get; protected set; } = new HashSet<CategoryComponentType>();
    }
}
