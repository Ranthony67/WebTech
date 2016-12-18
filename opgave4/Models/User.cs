using System;

namespace WebOpgave4.Models
{
    public class User
    {
        public int Id {get;set;}
        public String UserName {get;set;}
        public String Password {get;set;}
        public Guid Token {get;set;}
        public Boolean Admin {get;set;}
    }
}
