using System;
using System.ComponentModel.DataAnnotations;
using static Enums;

namespace WebOpgave4.Models.DTOs
{
    public class ComponentTypeGetDTO
    {
        public long ComponentTypeId { get; set; }
        public string Name { get; set; }
        public string Info { get; set; }
        public string Location { get; set; }
        public ComponentTypeStatus Status { get; set; }
        public string Datasheet { get; set; }
        public string ImageUrl { get; set; }
        public string Manufacturer { get; set; }
        public string WikiLink { get; set; }
        public string AdminComment { get; set; }
        public int ImageId { get; set; }
        public virtual ESImage Image { get; set; }

    }
    public class ComponentTypePostDTO
    {
        [Required]
        public string Name { get; set; }
        public string Info { get; set; }
        public string Location { get; set; }
        [Required]
        public ComponentTypeStatus Status { get; set; }
        public string Datasheet { get; set; }
        public string ImageUrl { get; set; }
        [Required]
        public string Manufacturer { get; set; }
        public string WikiLink { get; set; }
        public string AdminComment { get; set; }
        public int ImageId { get; set; }
        public virtual ESImage Image { get; set; }
    }
}
