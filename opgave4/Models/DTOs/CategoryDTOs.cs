using System;
using System.ComponentModel.DataAnnotations;

namespace WebOpgave4.Models.DTOs
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
