using System;
using System.Collections.Generic;
using System.Drawing;


namespace ClothingWebsite.Server.Models;

public partial class SanPham
{
    public string MaSanPham { get; set; } = null!;

    public string? TenSanPham { get; set; }

    public int? MaLoai { get; set; }

    public int? MaMau { get; set; }

    public int? MaSize { get; set; }

    public int? MaStyle { get; set; }

    public string? HinhAnh { get; set; }

    public int? Gia { get; set; }

    public int? SoLuong { get; set; }

    public virtual LoaiSanPham? MaLoaiNavigation { get; set; }

    public virtual MauSanPham? MaMauNavigation { get; set; }

    public virtual Size? MaSizeNavigation { get; set; }

    public virtual Style? MaStyleNavigation { get; set; }

    public virtual ICollection<SanPhamKhachHang> SanPhamKhachHangs { get; set; } = new List<SanPhamKhachHang>();
}
