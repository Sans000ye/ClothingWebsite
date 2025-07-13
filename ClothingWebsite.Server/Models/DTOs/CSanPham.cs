namespace ClothingWebsite.Server.Models.Converter
{
    public class CSanPham
    {
        public string MaSanPham { get; set; } = null!;
        public string TenSanPham { get; set; } = string.Empty;
        public string HinhAnh { get; set; } = string.Empty;
        public int? Gia { get; set; }
        public int? SoLuong { get; set; }
        public int? MaLoai { get; set; }
        public int? MaMau { get; set; }
        public int? MaSize { get; set; }
        public int? MaStyle { get; set; }
        public virtual LoaiSanPham MaLoaiNavigation { get; set; } = null!;
        public virtual MauSanPham MaMauNavigation { get; set; } = null!;
        public virtual Size MaSizeNavigation { get; set; } = null!;
        public virtual Style MaStyleNavigation { get; set; } = null!;
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
        public static SanPham chuyendoiNguoc(CSanPham cSanPham)
        {
            return new SanPham
            {
                // Map properties from CSanPham to SanPham
                // Example:
                MaSanPham = cSanPham.MaSanPham,
                TenSanPham = cSanPham.TenSanPham,
                Gia = cSanPham.Gia,
                // Add other property mappings as needed
            };
        }
    }
}
