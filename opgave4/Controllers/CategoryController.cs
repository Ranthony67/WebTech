using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebOpgave4.DAL.DTOs;
using WebOpgave4.Models;

namespace WebOpgave4.Controllers
{
    public class CategoryController : Controller
    {
        private IMapper _mapper { get; set; }
        
        CategoryController(IMapper mapper){
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult CreateCategory([FromBody] CategoryPostDTO categoryDTO)
        {
            Category category;
            
            return NotFound();
        }

        [HttpPut]
        public IActionResult UpdateCategory([FromBody] CategoryPostDTO category)
        {

            return NotFound();
        }

        public IActionResult DeleteCategory(int id)
        {

            return NotFound();
        }
    }
}