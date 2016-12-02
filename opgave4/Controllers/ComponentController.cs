using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebOpgave4.Models;
using WebOpgave4.Models.DTOs;

namespace WebOpgave4.Controllers
{
    [Route("component")]
    public class ComponentController : Controller 
    {
        private IMapper _mapper;
        private DatabaseContext _context;

        public ComponentController(IMapper mapper, DatabaseContext context){
            _mapper = mapper;
            _context = context;
        }

        [HttpPost]
        [Route("")]
        public IActionResult CreateComponent([FromBody] ComponentPostDTO componentDTO)
        {
            if(!ModelState.IsValid)
                return BadRequest();

            var component = _mapper.Map<Component>(componentDTO);

            // Component component = new Component();
            // component.ComponentTypeId = componentDTO.ComponentTypeId;
            // component.ComponentNumber = componentDTO.ComponentNumber;
            // component.SerialNo = componentDTO.SerialNo;
            // component.Status = componentDTO.Status;
            // component.AdminComment = componentDTO.AdminComment;
            // component.UserComment = componentDTO.UserComment;
            // component.CurrentLoanInformationId = componentDTO.CurrentLoanInformationId;
            
            _context.Components.Add(component);
            _context.SaveChanges();

            var dto = _mapper.Map<ComponentGetDTO>(component);
            dto.ComponentId = component.ComponentId;
            return Ok(dto);
        }
    }
}