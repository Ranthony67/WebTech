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
            string token = Request.Headers["token"];
            if(string.IsNullOrEmpty(token))
                return BadRequest("Token is null or empty");

            Guid _token = new Guid(token);
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if(_context.Users.Where(u => u.Token == _token) == null)
                return NotFound();
            

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

            if(components == null)
                return NotFound();
            
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

        [HttpPost]
        [Route("{id:int}")]
        public IActionResult UpdateComponent([FromBody] ComponentPostDTO componentDTO, int id)
        {
            string token = Request.Headers["token"];
            if(string.IsNullOrEmpty(token))
                return BadRequest("Token is null or empty");

            Guid _token = new Guid(token);
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if(_context.Users.Where(u => u.Token == _token) == null)
                return NotFound();
            

            Component component = new Component();
            component.ComponentId = id;
            component.ComponentTypeId = componentDTO.ComponentTypeId;
            component.SerialNo = componentDTO.SerialNo;
            component.Status = componentDTO.Status;
            component.AdminComment = componentDTO.AdminComment;
            component.UserComment = componentDTO.UserComment;

            if(componentDTO.CurrentLoanInformationId != null) component.CurrentLoanInformationId = componentDTO.CurrentLoanInformationId;

            _context.Components.Update(component);
            _context.SaveChanges();

            var dto = _mapper.Map<ComponentGetDTO>(component);
            return Ok(dto);
        }

        [Route("{id:long}")]
        public IActionResult DeleteComponent(long id)
        {
            string token = Request.Headers["token"];
            if(string.IsNullOrEmpty(token))
                return BadRequest("Token is null or empty");

            Guid _token = new Guid(token);
            
            if(_context.Users.Where(u => u.Token == _token) == null)
                return NotFound();
            
            var component = _context.Components.Find(id);
            
            if(component == null) 
                return NotFound();

            _context.Components.Remove(component);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpGet]
        [Route("{id:int}/categories/{categoryId:int}")]
        public IActionResult GetComponentTypesOfCategory(int id, int categoryId)
        {
            var componenttypes = _context.CategoryComponentType.Where(cc => cc.CategoryId == categoryId).ToList();

            if (componenttypes == null)
                return NotFound();

            return Ok(componenttypes);
        }
    }
}