using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebOpgave4.Models.DTOs;
using WebOpgave4.Models;
using System.Linq;

namespace WebOpgave4.Controllers
{
    [Route("users")]
    public class AccountController : Controller
    {
        private IMapper _mapper;
        private DatabaseContext _context;

        public AccountController(IMapper mapper, DatabaseContext context)
        {
            _mapper = mapper;
            _context = context;
        }       

        [HttpPost]
        [Route("sign_in")]
        public IActionResult SignIn([FromBody] SignInDTO SignIn)
        {
            if(!string.IsNullOrEmpty(Request.Headers["token"]))
            {
                User user = _context.Users.Where(u => u.UserName == SignIn.Username && u.Password == u.Password).First();
                
                if(user == null)
                    return NotFound();
                
                return Ok();
            } 

            return BadRequest();
        }

        [HttpPost]
        [Route("sign_up")]
        public IActionResult SignUp([FromBody] UserSignUpDTO SignUp)
        {
            User user = new User();
            user.UserName = SignUp.UserName;
            user.Password = SignUp.Password;
            user.Admin = true;
            user.Token = new Guid();

            _context.Users.Add(user);

            UserSignUpReturnDTO dto = new UserSignUpReturnDTO();
            dto.admin = user.Admin;
            dto.Token = user.Token;

            return Ok(dto);
        }

    }
}