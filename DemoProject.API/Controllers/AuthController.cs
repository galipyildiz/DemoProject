using DemoProject.API.DTOs;
using DemoProject.API.Models;
using DemoProject.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;

        public AuthController(UserService userService)
        {
            _userService = userService;
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserRegisterDTO request)
        {
            if (await _userService.AnyUserNameAsync(request.Username) || await _userService.AnyEmailAsync(request.Email))
            {
                return BadRequest(new
                {
                    StatusCode = "400",
                    Description = "Email or username must be unique"
                });
            }
            _userService.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            User user = new User()
            {
                Email = request.Email,
                Username = request.Username,
                Password = passwordHash,
                PasswordSalt = passwordSalt
            };
            await _userService.AddUserAsync(user);
            return Ok(user);
        }
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLoginDTO request)
        {
            if (!await _userService.AnyUserNameAsync(request.Username))
            {
                return BadRequest(new
                {
                    StatusCode = "400",
                    Description = "User not found."
                });
            }
            User user = await _userService.FindUserAsync(request.Username);
            if (!_userService.VerifyPasswordHash(request.Password, user.Password, user.PasswordSalt))
            {
                return BadRequest(new
                {
                    StatusCode = "400",
                    Description = "Wrong password."
                });
            }
            
            string token = _userService.CreateToken(user);

            return Ok(token);
        }
    }
}
