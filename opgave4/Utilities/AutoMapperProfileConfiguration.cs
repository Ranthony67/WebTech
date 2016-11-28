using AutoMapper;
using WebOpgave4.DAL.DTOs;
using WebOpgave4.Models;

namespace WebOpgave4
{
    public class AutoMapperProfileConfiguration : Profile
    {
        protected override void Configure()
        {
            CreateMap<Category, CategoryPostDTO>();
            CreateMap<CategoryGetDTO, Category>();
        }
    }
}