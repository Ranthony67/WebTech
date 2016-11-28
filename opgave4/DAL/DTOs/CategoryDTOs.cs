using System.ComponentModel.DataAnnotations;

namespace WebOpgave4.DAL.DTOs
{
    public class CategoryGetDTO
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
    }

    public class CategoryPostDTO
    {

        [Required]
        public string Name { get; set; }
    }
}