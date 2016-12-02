using System;
using System.ComponentModel.DataAnnotations;
using static Enums;

namespace WebOpgave4.Models.DTOs
{
    public class ComponentGetDTO
    {
        public long ComponentId { get; set; }
        public long ComponentTypeId { get; set; }
        public int ComponentNumber { get; set; }
        public string SerialNo { get; set; }
        public ComponentStatus Status { get; set; }
        public string AdminComment { get; set; }
        public string UserComment { get; set; }
        public long? CurrentLoanInformationId { get; set; }
    }
    public class ComponentPostDTO
    {
        [Required]
        public long ComponentTypeId { get; set; }
        [Required]
        public int ComponentNumber { get; set; }
        [Required]
        public string SerialNo { get; set; }
        [Required]
        public ComponentStatus Status { get; set; }
        [Required]
        public string AdminComment { get; set; }
        [Required]
        public string UserComment { get; set; }
        public long? CurrentLoanInformationId { get; set; }
    }
}
