using ClothingWebsite.Server.Models;
using ClothingWebsite.Server.Models.Converter;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClothingWebsite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController(QuanAoContext db) : ControllerBase
    {
        private readonly QuanAoContext _db = db;
        [HttpGet]
        public IActionResult LayDSSanPham()
        {
            try
            {
                var ans = db.SanPhams.Select(
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

        [HttpGet]
        public ActionResult<IEnumerable<SanPham>> GetSanPhams(
            [FromQuery] string style,
            [FromQuery] string size,
            [FromQuery] string loai,
            [FromQuery] string mau,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice)
        {
            var query = db.SanPhams.AsQueryable();
            if (!string.IsNullOrEmpty(style))
            {
                query = query.Where(p => p.MaStyleNavigation.Style1 == style);
            }
            if (!string.IsNullOrEmpty(size))
            {
                query = query.Where(p => p.MaSizeNavigation.Size1 == size);
            }
            if (!string.IsNullOrEmpty(loai))
            {
                query = query.Where(p => p.MaLoaiNavigation.Loai == loai);
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

            // Execute the query and return the results
            var filteredProducts = query.ToList();
            return Ok(filteredProducts);
        }

        [HttpPost("ApplyFilters")]
        public IActionResult ApplyFilters([FromBody] FilterCriteria filterCriteria)
        {
            try
            {
                var sp = db.SanPhams.AsQueryable();

                // Apply filters based on the criteria
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
                // Log the exception (optional)
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }

        [HttpDelete("Remove/{Id}")]
        public IActionResult XoaSanPham(string Id)
        {
            try
            {
                SanPham? sp = db.SanPhams.Where(a => a.MaSanPham == Id).FirstOrDefault();
                if (sp is null)
                {
                    return NotFound();
                }
                else
                {
                    db.SanPhams.Remove(sp);
                    db.SaveChanges();
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
                db.SanPhams.Add(obj);
                db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}