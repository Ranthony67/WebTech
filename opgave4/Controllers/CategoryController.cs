using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebOpgave4.Models.DTOs;
using WebOpgave4.Models;

namespace WebOpgave4.Controllers
{
    [Route("category")]
    public class CategoryController : Controller
    {
        private IMapper _mapper;
        private DatabaseContext _context;

        public CategoryController(IMapper mapper, DatabaseContext context){
            _mapper = mapper;
            _context = context;
        }

        [HttpPost]
        [Route("")]
        public IActionResult CreateCategory([FromBody] CategoryPostDTO categoryDTO)
        {            
            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            Category category = new Category();
            category.Name = categoryDTO.Name;

            _context.Categories.Add(category);
            _context.SaveChanges();

            var dto = _mapper.Map<CategoryGetDTO>(category);
            dto.CategoryId = category.CategoryId;
            return Ok(dto);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateCategory([FromBody] CategoryPostDTO categoryDTO, int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            Category category = new Category();
            category.CategoryId = id;
            category.Name = categoryDTO.Name;

            _context.Categories.Update(category);
            _context.SaveChanges();

            var dto = _mapper.Map<CategoryGetDTO>(category);
            return Ok(dto);
        }

        [Route("{id:int}")]
        public IActionResult DeleteCategory(int id)
        {
            var category = _context.Categories.Find(id);

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return NoContent();
        }
    }
}