using ClothingWebsite.Server.Models;
using ClothingWebsite.Server.Models.Converter;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClothingWebsite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private readonly QuanAoContext db;
        public SanPhamController(QuanAoContext quanAoContext)
        {
            db = quanAoContext;
        }
        [HttpGet]
        public IActionResult LayDSSanPham()
        {
            try
            {
                var ans = db.SanPhams.Select(
                    t => new
                    {
                        MaSanPham = t.MaSanPham,
                        TenSanPham = t.TenSanPham,
                        Gia = t.Gia,
                        SoLuong = t.SoLuong,
                        HinhAnh = t.HinhAnh,
                        Loai = t.MaLoaiNavigation.Loai,
                        Mau = t.MaMauNavigation.Mau,
                        Style = t.MaStyleNavigation.Style1,
                        Size = t.MaSizeNavigation.Size1
                    }
                    ).ToList();
                return Ok(ans);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("Filter/{Target}/{Target2}")]
        public IActionResult Filter(string Target, string Target2)
        {
            int.TryParse(Target, out int T1);
            int.TryParse(Target2, out int T2);
            try
            {
                var sp = db.SanPhams.AsQueryable();

                if (!string.IsNullOrEmpty(Target))
                {
                    sp = sp.Where(a => a.MaSizeNavigation.Size1 == Target ||
                                       a.MaLoaiNavigation.Loai == Target ||
                                       a.MaStyleNavigation.Style1 == Target ||
                                       a.MaMauNavigation.Mau == Target);
                }

                if (T1 > 0 && T2 > 0)
                {
                    sp = sp.Where(a => a.Gia >= T1 && a.Gia <= T2);
                }

                var result = sp.ToList();

                if (result == null || !result.Any())
                {
                    return NotFound();
                }
                else
                {
                    return Ok(result);
                }
            }
            catch
            {
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
