using System.Net;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebOpgave4.DAL.DTOs;
using WebOpgave4.Models;

namespace WebOpgave4.Controllers
{
    public class CategoryController : Controller
    {
        private IMapper _mapper;
        private DatabaseContext _context;
        
        CategoryController(IMapper mapper, DatabaseContext context){
            _mapper = mapper;
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateCategory([FromBody] CategoryPostDTO categoryDTO)
        {
            if(!ModelState.IsValid) 
                return BadRequest(ModelState);
            
            var category = Mapper.Map<Category>(categoryDTO);

            _context.Categories.Add(category);
            _context.SaveChanges();

            var dto = Mapper.Map<CategoryGetDTO>(category);
            return CreatedAtRoute("CategoryController", new {id = category.CategoryId}, dto);
        }

        [HttpPut]
        public IActionResult UpdateCategory([FromBody] CategoryPostDTO  categoryDTO, int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var category = Mapper.Map<Category>(categoryDTO);
            category.CategoryId = id;

            _context.Categories.Update(category);
            _context.SaveChanges();

            var dto = Mapper.Map<CategoryGetDTO>(category);
            return Ok(dto);
        }

        public IActionResult DeleteCategory(int id)
        {
            var category = _context.Categories.Find(id);
            _context.Categories.Remove(category);
            _context.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}