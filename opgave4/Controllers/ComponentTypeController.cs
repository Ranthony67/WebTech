using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebOpgave4.Models;
using WebOpgave4.Models.DTOs;

namespace WebOpgave4.Controllers
{
    [Route("component_types")]
    public class ComponentTypeController : Controller
    {
        private IMapper _mapper;
        private DatabaseContext _context;

        public ComponentTypeController(IMapper mapper, DatabaseContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpPost]
        [Route("")]
        public IActionResult CreateComponentType([FromBody] ComponentTypePostDTO componentTypeDTO)
        {
            if(!ModelState.IsValid)
                return BadRequest();

            ComponentType componentType = new ComponentType();
            componentType.Name = componentTypeDTO.Name;
            componentType.Status = componentTypeDTO.Status;
            componentType.Manufacturer = componentTypeDTO.Manufacturer;

            if(componentTypeDTO.Info != null) componentType.Info = componentTypeDTO.Info;
            if(componentTypeDTO.Location != null) componentType.Location = componentTypeDTO.Location;
            if(componentTypeDTO.Datasheet != null) componentType.Datasheet = componentTypeDTO.Datasheet;
            if(componentTypeDTO.ImageUrl != null) componentType.ImageUrl = componentTypeDTO.ImageUrl;
            if(componentTypeDTO.WikiLink != null) componentType.WikiLink = componentTypeDTO.WikiLink;
            if(componentTypeDTO.AdminComment != null) componentType.AdminComment = componentTypeDTO.AdminComment;
            if(componentTypeDTO.ImageId != null) componentType.ImageId = componentTypeDTO.ImageId;

            _context.Add(componentType);
            _context.SaveChanges();

            var dto = _mapper.Map<ComponentTypeGetDTO>(componentType);
            dto.ComponentTypeId = componentType.ComponentTypeId;
            return Ok(dto);
        }
    }
}