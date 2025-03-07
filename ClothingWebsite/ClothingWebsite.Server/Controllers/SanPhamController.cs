using ClothingWebsite.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClothingWebsite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private readonly QuanAoContext QACont;
        public SanPhamController(QuanAoContext quanAoContext)
        {
            QACont = quanAoContext;
        }
        [HttpGet]
        public IActionResult LayDSSanPham()
        {
            try
            {
                var ans = QACont.SanPhams.Select(
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

        [HttpGet("Id/{Id}")]
        public IActionResult LaySanPhamId(string Id)
        {
            try
            {
                SanPham? sp = QACont.SanPhams.Where(a => a.MaSanPham == Id).FirstOrDefault();
                if (sp is null)
                {
                    return NotFound();
                }
                else
                {
                    var ans = new
                    {
                        MaSanPham = sp.MaSanPham,
                        TenSanPham = sp.TenSanPham,
                        Gia = sp.Gia,
                        SoLuong = sp.SoLuong,
                        HinhAnh = sp.HinhAnh,
                        Loai = sp.MaLoaiNavigation?.Loai,
                        Mau = sp.MaMauNavigation?.Mau,
                        Style = sp.MaStyleNavigation?.Style1,
                        Size = sp.MaSizeNavigation?.Size1
                    };
                    return Ok(ans);
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("Color/{Color}")]
        public IActionResult LaySanPhamColor(string Color)
        {
            try
            {
                SanPham? sp = QACont.SanPhams.Where(a => a.MaMauNavigation.Mau == Color).FirstOrDefault();
                if (sp is null)
                {
                    return NotFound();
                }
                else
                {
                    var ans = new
                    {
                        MaSanPham = sp.MaSanPham,
                        TenSanPham = sp.TenSanPham,
                        Gia = sp.Gia,
                        SoLuong = sp.SoLuong,
                        HinhAnh = sp.HinhAnh,
                        Loai = sp.MaLoaiNavigation?.Loai,
                        Mau = sp.MaMauNavigation?.Mau,
                        Style = sp.MaStyleNavigation?.Style1,
                        Size = sp.MaSizeNavigation?.Size1
                    };
                    return Ok(ans);
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("Style/{Style}")]
        public IActionResult LaySanPhamStyle(string Style)
        {
            try
            {
                SanPham? sp = QACont.SanPhams.Where(a => a.MaStyleNavigation.Style1 == Style).FirstOrDefault();
                if (sp is null)
                {
                    return NotFound();
                }
                else
                {
                    var ans = new
                    {
                        MaSanPham = sp.MaSanPham,
                        TenSanPham = sp.TenSanPham,
                        Gia = sp.Gia,
                        SoLuong = sp.SoLuong,
                        HinhAnh = sp.HinhAnh,
                        Loai = sp.MaLoaiNavigation?.Loai,
                        Mau = sp.MaMauNavigation?.Mau,
                        Style = sp.MaStyleNavigation?.Style1,
                        Size = sp.MaSizeNavigation?.Size1
                    };
                    return Ok(ans);
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("Size/{Size}")]
        public IActionResult LaySanPhamSize(string Size)
        {
            try
            {
                SanPham? sp = QACont.SanPhams.Where(a => a.MaSizeNavigation.Size1 == Size).FirstOrDefault();
                if (sp is null)
                {
                    return NotFound();
                }
                else
                {
                    var ans = new
                    {
                        MaSanPham = sp.MaSanPham,
                        TenSanPham = sp.TenSanPham,
                        Gia = sp.Gia,
                        SoLuong = sp.SoLuong,
                        HinhAnh = sp.HinhAnh,
                        Loai = sp.MaLoaiNavigation?.Loai,
                        Mau = sp.MaMauNavigation?.Mau,
                        Style = sp.MaStyleNavigation?.Style1,
                        Size = sp.MaSizeNavigation?.Size1
                    };
                    return Ok(ans);
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("PriceRange")]
        public IActionResult LaySanPhamGia(int MonMin,int MonMax)
        {
            try
            {
                SanPham? sp = QACont.SanPhams.Where(a => a.Gia >= MonMin && a.Gia <= MonMax).FirstOrDefault();
                if (sp is null)
                {
                    return NotFound();
                }
                else
                {
                    var ans = new
                    {
                        MaSanPham = sp.MaSanPham,
                        TenSanPham = sp.TenSanPham,
                        Gia = sp.Gia,
                        SoLuong = sp.SoLuong,
                        HinhAnh = sp.HinhAnh,
                        Loai = sp.MaLoaiNavigation?.Loai,
                        Mau = sp.MaMauNavigation?.Mau,
                        Style = sp.MaStyleNavigation?.Style1,
                        Size = sp.MaSizeNavigation?.Size1
                    };
                    return Ok(ans);
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("Type/{loai}")]
        public IActionResult LaySanPhamLoai(string Loai)
        {
            try
            {
                SanPham? sp = QACont.SanPhams.Where(a => a.MaLoaiNavigation.Loai == Loai).FirstOrDefault();
                if (sp is null)
                {
                    return NotFound();
                }
                else
                {
                    var ans = new
                    {
                        MaSanPham = sp.MaSanPham,
                        TenSanPham = sp.TenSanPham,
                        Gia = sp.Gia,
                        SoLuong = sp.SoLuong,
                        HinhAnh = sp.HinhAnh,
                        Loai = sp.MaLoaiNavigation?.Loai,
                        Mau = sp.MaMauNavigation?.Mau,
                        Style = sp.MaStyleNavigation?.Style1,
                        Size = sp.MaSizeNavigation?.Size1
                    };
                    return Ok(ans);
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        
    }
}
