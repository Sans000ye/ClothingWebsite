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
        private readonly QuanAoContext _db;

        public SanPhamController(QuanAoContext db)
        {
            _db = db;
        }

        // Route: api/SanPham/LayDSSanPham
        [HttpGet("LayDSSanPham")]
        public IActionResult LayDSSanPham()
        {
            try
            {
                var ans = _db.SanPhams.Select(
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
                var query = _db.SanPhams.AsQueryable();

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
        public IActionResult ApplyFilters([FromBody] FilterCriteria filterCriteria)
        {
            try
            {
                var sp = _db.SanPhams.AsQueryable();

                if (!string.IsNullOrEmpty(filterCriteria.Style))
                {
                    sp = sp.Where(a => a.MaStyleNavigation.Style1 == filterCriteria.Style);
                }

                if (!string.IsNullOrEmpty(filterCriteria.Size))
                {
                    sp = sp.Where(a => a.MaSizeNavigation.Size1 == filterCriteria.Size);
                }

                if (!string.IsNullOrEmpty(filterCriteria.Type))
                {
                    sp = sp.Where(a => a.MaLoaiNavigation.Loai == filterCriteria.Type);
                }

                if (!string.IsNullOrEmpty(filterCriteria.Color))
                {
                    sp = sp.Where(a => a.MaMauNavigation.Mau == filterCriteria.Color);
                }

                if (filterCriteria.PriceRange != null && filterCriteria.PriceRange.Length == 2)
                {
                    int minPrice = filterCriteria.PriceRange[0];
                    int maxPrice = filterCriteria.PriceRange[1];
                    sp = sp.Where(a => a.Gia >= minPrice && a.Gia <= maxPrice);
                }

                var result = sp.Select(t => new
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

                if (result == null || !result.Any())
                {
                    return NotFound();
                }
                else
                {
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }

        [HttpDelete("Remove/{Id}")]
        public IActionResult XoaSanPham(string Id)
        {
            try
            {
                SanPham? sp = _db.SanPhams.Where(a => a.MaSanPham == Id).FirstOrDefault();
                if (sp is null)
                {
                    return NotFound();
                }
                else
                {
                    _db.SanPhams.Remove(sp);
                    _db.SaveChanges();
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
                _db.SanPhams.Add(obj);
                _db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}