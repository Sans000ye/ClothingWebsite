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
        [HttpGet("Filter/{Target}")]
        public IActionResult Filter (string Target, string Target2)
        {
            int.TryParse(Target, out int T1);
            int.TryParse(Target2, out int T2);
            try 
            {
                IEnumerable<SanPham>sp = db.SanPhams.Where( a => a.MaSizeNavigation.Size1   == Target || 
                                                                a.MaLoaiNavigation.Loai         == Target ||
                                                                a.MaStyleNavigation.Style1      == Target ||
                                                                a.MaMauNavigation.Mau           == Target ||
                                                                        (T1 >= a.Gia && a.Gia <= T2)        );
                if (sp is null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(sp);
                }
            } 
            catch { return BadRequest(); }
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
