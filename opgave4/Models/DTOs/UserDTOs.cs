using System;
using System.ComponentModel.DataAnnotations;

namespace WebOpgave4.Models.DTOs
{
    public class UserSignUpDTO
    {
        public string UserName {get;set;}
        public string Password { get; set; }
    }

    public class UserSignUpReturnDTO
    {
        public Guid Token {get;set;}
        public Boolean admin {get;set;}
    }

    public class SignInDTO
    {
        public string Username {get;set;}
        public string Password{get;set;}
    }
}
