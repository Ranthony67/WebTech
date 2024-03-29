namespace WebOpgave4.Models
{
    public class CategoryComponentType
    {
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }

        public long ComponentTypeId { get; set; }
        public virtual ComponentType ComponentType { get; set; }
    }
}