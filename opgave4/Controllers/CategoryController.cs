using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebOpgave4.Models.DTOs;
using WebOpgave4.Models;
using System.Linq;
using System.Collections.Generic;

namespace WebOpgave4.Controllers
{
    [Route("categories")]
    public class CategoryController : Controller
    {
        private IMapper _mapper;
        private DatabaseContext _context;

        public CategoryController(IMapper mapper, DatabaseContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpPost]
        [Route("")]
        public IActionResult CreateCategory([FromBody] CategoryPostDTO categoryDTO)
        {
            string token = Request.Headers["token"];
            if(string.IsNullOrEmpty(token))
                return BadRequest("Token is null or empty");

            Guid _token = new Guid(token);
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if(_context.Users.Where(u => u.Token == _token) == null)
                return NotFound();
            
            Category category = new Category();
            category.Name = categoryDTO.Name;

            _context.Categories.Add(category);
            _context.SaveChanges();

            var dto = _mapper.Map<CategoryGetDTO>(category);
            dto.CategoryId = category.CategoryId;
            return Ok(dto);
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetCategories()
        {
            var categories = _context.Categories.ToList();

            if(categories == null)
                return NotFound();

            return Ok(categories);

        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetCategory(int id)
        {
            var category = _context.Categories.Find(id);

            if(category == null)
                return NotFound();

            return Ok(category);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateCategory([FromBody] CategoryPostDTO categoryDTO, int id)
        {
            string token = Request.Headers["token"];
            if(string.IsNullOrEmpty(token))
                return BadRequest("Token is null or empty");

            Guid _token = new Guid(token);
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if(_context.Users.Where(u => u.Token == _token) == null)
                return NotFound();
            
            Category category = new Category();
            category.CategoryId = id;
            category.Name = categoryDTO.Name;

            _context.Categories.Update(category);
            _context.SaveChanges();

            var dto = _mapper.Map<CategoryGetDTO>(category);
            return Ok(dto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteCategory(int id)
        {
            string token = Request.Headers["token"];
            if(string.IsNullOrEmpty(token))
                return BadRequest("Token is null or empty");

            Guid _token = new Guid(token);

            if(_context.Users.Where(u => u.Token == _token) == null)
                return NotFound();
            
            var category = _context.Categories.Find(id);

            if (category == null)
                return NotFound();

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return NoContent();
        }
    }
}