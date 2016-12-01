namespace WebOpgave4.Models
{
    public class CategoryComponentType
    {
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public long ComponentTypeId { get; set; }
        public ComponentType ComponentType { get; set; }
    }
}