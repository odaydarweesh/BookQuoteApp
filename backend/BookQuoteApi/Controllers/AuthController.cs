using Microsoft.AspNetCore.Mvc;
using BookQuoteApi.Services;

namespace BookQuoteApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var response = await _authService.Register(request);

            if (!response.Success)
            {
                return BadRequest(new { message = response.Message });
            }

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var response = await _authService.Login(request);

            if (!response.Success)
            {
                return Unauthorized(new { message = response.Message });
            }

            return Ok(response);
        }
    }
}
