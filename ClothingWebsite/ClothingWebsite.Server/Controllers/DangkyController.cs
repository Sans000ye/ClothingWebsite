using ClothingWebsite.Server.Models;
using ClothingWebsite.Server.Models.Converter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace ClothingWebsite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DangkyController : ControllerBase
    {
        private readonly QuanAoContext db;
        public DangkyController(QuanAoContext QACont)
        {
            db = QACont;
        }

        [HttpGet]
        public IActionResult GetUserList()
        {
            try
            {
                var List = db.TaiKhoans.Select(
                         u => new
                         {
                             MaTaiKhoan     = u.MaTaiKhoan,
                             Username       = u.Username,
                             Password       = u.Password,
                             QuyenTaiKhoan  = u.QuyenTaiKhoan
                         }
                                                    ).ToList();
                return Ok(List);
            }
            catch
            {
                return BadRequest();
            }
        }
        
    }
}
