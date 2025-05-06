public class SanPhamFilter
{
    public string MaSanPham { get; set; } = "";
    public string TenSanPham { get; set; } = "";
    public int MaLoai { get; set; }
    public int MaMau { get; set; }
    public int MaSize { get; set; }
    public int MaStyle { get; set; }
    public string HinhAnh { get; set; } = "";
    public int SoLuong { get; set; }
    public decimal? MinGia { get; set; }
    public decimal? MaxGia { get; set; }
}