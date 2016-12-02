using AutoMapper;
using WebOpgave4.Models.DTOs;
using WebOpgave4.Models;

namespace WebOpgave4
{
    public class AutoMapperProfileConfiguration : Profile
    {
        protected override void Configure()
        {
            // Doesn't work for some reason
            //CreateMap<Category, CategoryPostDTO>();

            // Works for some reason
            CreateMap<Category, CategoryGetDTO>().ReverseMap();
        }
    }
}