using Microsoft.AspNetCore.Mvc;
using ClothingWebsite.Server.Models;
using ClothingWebsite.Server.Models.Converter;

namespace ClothingWebsite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuanAoController : ControllerBase
    {
        private readonly QuanAoContext _context;

        public QuanAoController(QuanAoContext context)
        {
            _context = context;
        }

        [HttpGet("ListQuanAo")]
        public IActionResult GetDSSanPham()
        {
            try
            {
                List<CSanPham> ds = _context.SanPhams
                    .Select(t => CSanPham.chuyendoi(t))
                    .ToList();

                return Ok(ds);
            }
            catch
            {
                return BadRequest("Lỗi khi truy vấn sản phẩm.");
            }
        }
        [HttpGet("ListQuanAoByStyle")]
        public IActionResult GetDSSanPhamTheoStyle([FromQuery] int style)
        {
            try
            {
                List<CSanPham> ds = _context.SanPhams
                    .Where(sp => sp.MaStyle == style)
                    .Select(t => CSanPham.chuyendoi(t))
                    .ToList();
                return Ok(ds);
            }
            catch
            {
                return BadRequest($"Lỗi khi truy vấn sản phẩm MaStyle = {style}.");
            }
        }

        [HttpGet("ListQuanAoByLoai")]
        public IActionResult GetDSSanPhamTheoLoai([FromQuery] int loai)
        {
            try
            {
                List<CSanPham> ds = _context.SanPhams
                    .Where(sp => sp.MaLoai == loai)
                    .Select(t => CSanPham.chuyendoi(t))
                    .ToList();
                return Ok(ds);
            }
            catch
            {
                return BadRequest($"Lỗi khi truy vấn sản phẩm MaLoai = {loai}.");
            }
        }






    }
}
