using ClothingWebsite.Server.Models;
using ClothingWebsite.Server.Models.Converter;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        // Route: api/SanPham/LayDSSanPham
        [HttpGet("LayDSSanPham")]
        public IActionResult LayDSSanPham()
        {
            try
            {
                var ans = _context.SanPhams.Select(
                    t => new
                    {
                        t.MaSanPham,
                        t.TenSanPham,
                        t.Gia,
                        t.SoLuong,
                        t.HinhAnh,
                        t.MaLoaiNavigation.Loai,
                        t.MaMauNavigation.Mau,
                        t.MaStyleNavigation.Style1,
                        t.MaSizeNavigation.Size1
                    }
                ).ToList();
                return Ok(ans);
            }
            catch
            {
                return BadRequest();
            }
        }

        // Route: api/SanPham/GetSanPhams
        [HttpGet("GetSanPhams")]
        public IActionResult GetSanPhams(
            [FromQuery] string? style = null, // Make parameters optional
            [FromQuery] string? size = null,
            [FromQuery] string? mau = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null)
        {
            try
            {
                var query = _context.SanPhams.AsQueryable();

                // Apply filters only if the parameter is not null or empty
                if (!string.IsNullOrEmpty(style))
                {
                    query = query.Where(p => p.MaStyleNavigation.Style1 == style);
                }
                if (!string.IsNullOrEmpty(size))
                {
                    query = query.Where(p => p.MaSizeNavigation.Size1 == size);
                }
                if (!string.IsNullOrEmpty(mau))
                {
                    query = query.Where(p => p.MaMauNavigation.Mau == mau);
                }
                if (minPrice.HasValue)
                {
                    query = query.Where(p => p.Gia >= minPrice.Value);
                }
                if (maxPrice.HasValue)
                {
                    query = query.Where(p => p.Gia <= maxPrice.Value);
                }

                var filteredProducts = query.Select(t => new
                {
                    t.MaSanPham,
                    t.TenSanPham,
                    t.Gia,
                    t.SoLuong,
                    t.HinhAnh,
                    t.MaLoaiNavigation.Loai,
                    t.MaMauNavigation.Mau,
                    t.MaStyleNavigation.Style1,
                    t.MaSizeNavigation.Size1
                }).ToList();

                return Ok(filteredProducts);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }

        // Route: api/SanPham/ApplyFilters
        [HttpPost("ApplyFilters")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public IActionResult ApplyFilters([FromBody] FilterCriteria filterCriteria)
        {
            try
            {
                var query = _context.SanPhams
                    .Include(s => s.MaLoaiNavigation)
                    .Include(s => s.MaMauNavigation)
                    .Include(s => s.MaSizeNavigation)
                    .Include(s => s.MaStyleNavigation)
                    .AsQueryable();

                // Apply filters only if they are provided
                if (!string.IsNullOrEmpty(filterCriteria.Type))
                {
                    query = query.Where(p => p.MaLoaiNavigation.Loai == filterCriteria.Type);
                }

                if (filterCriteria.PriceRange != null && filterCriteria.PriceRange.Length == 2)
                {
                    query = query.Where(p => p.Gia >= filterCriteria.PriceRange[0] && 
                                           p.Gia <= filterCriteria.PriceRange[1]);
                }

                if (!string.IsNullOrEmpty(filterCriteria.Style))
                {
                    query = query.Where(p => p.MaStyleNavigation.Style1 == filterCriteria.Style);
                }

                if (!string.IsNullOrEmpty(filterCriteria.Size))
                {
                    query = query.Where(p => p.MaSizeNavigation.Size1 == filterCriteria.Size);
                }

                if (!string.IsNullOrEmpty(filterCriteria.Color))
                {
                    query = query.Where(p => p.MaMauNavigation.Mau == filterCriteria.Color);
                }

                var result = query.Select(p => new
                {
                    p.MaSanPham,
                    p.TenSanPham,
                    p.Gia,
                    p.SoLuong,
                    p.HinhAnh,
                    Loai = p.MaLoaiNavigation.Loai,
                    Mau = p.MaMauNavigation.Mau,
                    Size = p.MaSizeNavigation.Size1,
                    Style = p.MaStyleNavigation.Style1
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Remove/{Id}")]
        public IActionResult XoaSanPham(string Id)
        {
            try
            {
                SanPham? sp = _context.SanPhams.Where(a => a.MaSanPham == Id).FirstOrDefault();
                if (sp is null)
                {
                    return NotFound();
                }
                else
                {
                    _context.SanPhams.Remove(sp);
                    _context.SaveChanges();
                    return Ok();
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult ThemSanPham([FromBody] CSanPham value)
        {
            try
            {
                var obj = value.Adapt<SanPham>();
                _context.SanPhams.Add(obj);
                _context.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}