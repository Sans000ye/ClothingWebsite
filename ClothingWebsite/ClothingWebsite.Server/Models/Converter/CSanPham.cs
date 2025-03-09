namespace ClothingWebsite.Server.Models.Converter
{
    public class CSanPham
    {
        public string MaSanPham { get; set; } = null!;
        public string TenSanPham { get; set; } = null!;
        public string? HinhAnh { get; set; }
        public int? Gia { get; set; }
        public int SoLuong { get; set; }
        public int MaLoai { get; set; }
        public int MaMau { get; set; }
        public int MaSize { get; set; }
        public int MaStyle { get; set; }
        public virtual LoaiSanPham MaLoaiNavigation { get; set; } = null!;
        public virtual MauSanPham MaMauNavigation { get; set; } = null!;
        public virtual Size MaSizeNavigation { get; set; } = null!;
        public virtual Style MaStyleNavigation { get; set; } = null!;
    }
}
