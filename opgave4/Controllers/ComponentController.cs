using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebOpgave4.Models;
using WebOpgave4.Models.DTOs;

namespace WebOpgave4.Controllers
{
    [Route("components")]
    public class ComponentController : Controller
    {
        private IMapper _mapper;
        private DatabaseContext _context;

        public ComponentController(IMapper mapper, DatabaseContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpPost]
        [Route("")]
        public IActionResult CreateComponent([FromBody] ComponentPostDTO componentDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            Component component = new Component();
            component.ComponentTypeId = componentDTO.ComponentTypeId;
            component.ComponentNumber = componentDTO.ComponentNumber;
            component.SerialNo = componentDTO.SerialNo;
            component.Status = componentDTO.Status;
            component.AdminComment = componentDTO.AdminComment;
            component.UserComment = componentDTO.UserComment;
            
            if(component.CurrentLoanInformationId != null) component.CurrentLoanInformationId = componentDTO.CurrentLoanInformationId;

            _context.Components.Add(component);
            _context.SaveChanges();

            var dto = _mapper.Map<ComponentGetDTO>(component);
            dto.ComponentId = component.ComponentId;
            return Ok(dto);
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetComponents()
        {
            var components = _context.Components.ToList();
            return Ok(components);
        }

        [HttpGet]
        [Route("{id:long}")]
        public IActionResult GetComponent(long id)
        {
            var component = _context.Components.Find(id);
            if(component == null)
                return NotFound();

            return Ok(component);
        }
    }
}