using ClothingWebsite.Server.Models;

namespace ClothingWebsite.Server.MyModels
{
    public class CSanPham
    {
        public string MaSanPham { get; set; }

        public string? TenSanPham { get; set; }

        public int? MaLoai { get; set; }

        public int? MaMau { get; set; }

        public int? MaSize { get; set; }

        public int? MaStyle { get; set; }

        public string? HinhAnh { get; set; }

        public int? Gia { get; set; }

        public int? SoLuong { get; set; }
        public static CSanPham chuyendoi(SanPham x)
        {
            return new CSanPham
            {
                MaSanPham = x.MaSanPham,
                TenSanPham = x.TenSanPham,
                MaLoai = x.MaLoai,
                MaMau = x.MaMau,
                MaSize = x.MaSize,
                MaStyle = x.MaStyle,
                HinhAnh = x.HinhAnh,
                Gia = x.Gia,
                SoLuong = x.SoLuong,
            };
        }        
    }
}
