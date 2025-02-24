using System;
using System.Collections.Generic;

namespace ClothingWebsite.Server.Models;

public partial class SanPhamKhachHang
{
    public string MaTaiKhoan { get; set; } = null!;

    public string MaSanPham { get; set; } = null!;

    public int SoLuong { get; set; }

    public string? HinhAnh { get; set; }

    public virtual SanPham MaSanPhamNavigation { get; set; } = null!;

    public virtual TaiKhoan MaTaiKhoanNavigation { get; set; } = null!;
}
