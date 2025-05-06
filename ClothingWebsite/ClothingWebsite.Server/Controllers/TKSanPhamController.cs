using ClothingWebsite.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ClothingWebsite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TKSanPhamController : ControllerBase
    {
        private readonly QuanAoContext _context;

        public TKSanPhamController(QuanAoContext context)
        {
            _context = context;
        }

        // API tìm kiếm sản phẩm
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<SanPham>>> SearchProducts([FromQuery] string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                return BadRequest("Từ khóa tìm kiếm không được để trống.");
            }

            var result = await _context.SanPhams
                .Where(sp => sp.TenSanPham.Contains(keyword))
                .ToListAsync();

            return Ok(result);
        }
    }
}