using Microsoft.AspNetCore.Mvc;
using ClothingWebsite.Server.Models;
using ClothingWebsite.Server.MyModels;
using Microsoft.EntityFrameworkCore;

namespace ClothingWebsite.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SanPhamController : ControllerBase
    {
        private readonly QuanAoContext _context;

        public SanPhamController(QuanAoContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                var products = _context.SanPhams
                    .Select(t => CSanPham.chuyendoi(t))
                    .ToList();
                return Ok(products);
            }
            catch
            {
                return BadRequest("Lỗi khi truy vấn tất cả sản phẩm.");
            }
        }

        [HttpGet("GetByStyle")]
        public IActionResult GetByStyle([FromQuery] int style)
        {
            try
            {
                var products = _context.SanPhams
                    .Where(sp => sp.MaStyle == style)
                    .Select(t => CSanPham.chuyendoi(t))
                    .ToList();
                return Ok(products);
            }
            catch
            {
                return BadRequest($"Lỗi khi truy vấn sản phẩm theo style {style}.");
            }
        }

        [HttpGet("GetByType")]
        public IActionResult GetByType([FromQuery] int type)
        {
            try
            {
                var products = _context.SanPhams
                    .Where(sp => sp.MaLoai == type)
                    .Select(t => CSanPham.chuyendoi(t))
                    .ToList();
                return Ok(products);
            }
            catch
            {
                return BadRequest($"Lỗi khi truy vấn sản phẩm theo loại {type}.");
            }
        }

        [HttpPost("ApplyFilters")]
        public async Task<IActionResult> ApplyFilters([FromBody] FilterCriteria criteria)
        {
            try
            {
                var query = _context.SanPhams
                    .Include(p => p.MaLoaiNavigation)
                    .Include(p => p.MaStyleNavigation)
                    .Include(p => p.MaSizeNavigation)
                    .Include(p => p.MaMauNavigation)
                    .AsQueryable();

                if (!string.IsNullOrEmpty(criteria.Type))
                {
                    query = query.Where(p => p.MaLoaiNavigation != null && 
                                            p.MaLoaiNavigation.Loai.ToLower() == criteria.Type.ToLower());
                }

                var results = await query
                    .Select(t => CSanPham.chuyendoi(t))
                    .ToListAsync();

                return results.Any() 
                    ? Ok(results) 
                    : NotFound(new { message = "Không tìm thấy sản phẩm phù hợp." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Lỗi khi lọc sản phẩm: {ex.Message}" });
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] CSanPham sanPham) 
        {
            try
            {
                var product = new SanPham
                {
                    MaSanPham = sanPham.MaSanPham,
                    TenSanPham = sanPham.TenSanPham,
                    MaLoai = sanPham.MaLoai,
                    MaMau = sanPham.MaMau,
                    MaSize = sanPham.MaSize,
                    MaStyle = sanPham.MaStyle,
                    HinhAnh = sanPham.HinhAnh,
                    Gia = sanPham.Gia,
                    SoLuong = sanPham.SoLuong
                };
                _context.SanPhams.Add(product);
                _context.SaveChanges();
                return Ok(CSanPham.chuyendoi(product));
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi khi thêm sản phẩm: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                var product = _context.SanPhams.Find(id);
                if (product == null)
                    return NotFound($"Không tìm thấy sản phẩm có mã {id}");

                _context.SanPhams.Remove(product);
                _context.SaveChanges();
                return Ok($"Đã xóa sản phẩm có mã {id}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi khi xóa sản phẩm: {ex.Message}");
            }
        }
    }
}