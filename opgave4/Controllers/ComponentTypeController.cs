using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebOpgave4.Models;
using WebOpgave4.Models.DTOs;

namespace WebOpgave4.Controllers
{
    [Route("componenttype")]
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

            var componentType = _mapper.Map<ComponentType>(componentTypeDTO);

            _context.Add(componentType);
            _context.SaveChanges();

            var dto = _mapper.Map<ComponentTypeGetDTO>(componentType);
            dto.ComponentTypeId = componentType.ComponentTypeId;
            return Ok(dto);
        }
    }
}