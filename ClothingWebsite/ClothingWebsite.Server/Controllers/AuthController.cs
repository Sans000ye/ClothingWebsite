using ClothingWebsite.Server.Models;
using ClothingWebsite.Server.Models.Converter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClothingWebsite.Server.Data;
using ClothingWebsite.Server.DTOs;


namespace AuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly QuanAoContext _context;

        public AuthController(QuanAoContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest req)
        {
            if (await _context.TaiKhoans.AnyAsync(u => u.Username == req.Username))
                return BadRequest(new { message = "Username đã tồn tại" });

            var user = new TaiKhoan
            {
                MaTaiKhoan = Guid.NewGuid().ToString(),
                Username = req.Username,
                Password = req.Password,
                QuyenTaiKhoan = 0 // hoặc set quyền mặc định
            };

            _context.TaiKhoans.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đăng ký thành công" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var user = await _context.TaiKhoans
                .FirstOrDefaultAsync(u => u.Username == req.Username && u.Password == req.Password);

            if (user == null)
                return Unauthorized(new { message = "Tài khoản hoặc mật khẩu không đúng" });

            return Ok(new { message = "Đăng nhập thành công" });
        }

    }
}