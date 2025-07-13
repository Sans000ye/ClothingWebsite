using Microsoft.AspNetCore.Mvc;
using ClothingWebsite.Server.Models;
using Microsoft.EntityFrameworkCore;
using ClothingWebsite.Server.Models.Converter;

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
        public async Task<IActionResult> ApplyFilters([FromBody] SanPhamFilter filter)
        {
            var query = _context.SanPhams.AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.MaSanPham))
                query = query.Where(p => p.MaSanPham == filter.MaSanPham);

            if (!string.IsNullOrWhiteSpace(filter.TenSanPham))
                query = query.Where(p => p.TenSanPham.Contains(filter.TenSanPham));

            if (filter.MaLoai != 0)
                query = query.Where(p => p.MaLoai == filter.MaLoai);

            if (filter.MaMau != 0)
                query = query.Where(p => p.MaMau == filter.MaMau);

            if (filter.MaSize != 0)
                query = query.Where(p => p.MaSize == filter.MaSize);

            if (filter.MaStyle != 0)
                query = query.Where(p => p.MaStyle == filter.MaStyle);

            if (!string.IsNullOrWhiteSpace(filter.HinhAnh))
                query = query.Where(p => p.HinhAnh == filter.HinhAnh);

            if (filter.MinGia.HasValue)
                query = query.Where(p => p.Gia >= filter.MinGia.Value);

            if (filter.MaxGia.HasValue && filter.MaxGia.Value > 0)
                query = query.Where(p => p.Gia <= filter.MaxGia.Value);

            if (filter.SoLuong != 0)
                query = query.Where(p => p.SoLuong == filter.SoLuong);

            var results = await query
                .Select(t => CSanPham.chuyendoi(t))
                .ToListAsync();

            return Ok(results);
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