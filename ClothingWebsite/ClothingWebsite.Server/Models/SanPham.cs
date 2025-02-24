using System;
using System.Collections.Generic;

namespace ClothingWebsite.Server.Models;

public partial class SanPham
{
    public string MaSanPham { get; set; } = null!;

    public int MaLoai { get; set; }

    public int MaMau { get; set; }

    public int SoLuong { get; set; }

    public virtual LoaiSanPham MaLoaiNavigation { get; set; } = null!;

    public virtual MauSanPham MaMauNavigation { get; set; } = null!;

    public virtual ICollection<SanPhamKhachHang> SanPhamKhachHangs { get; set; } = new List<SanPhamKhachHang>();
}
