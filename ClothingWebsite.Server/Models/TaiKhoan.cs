using System;
using System.Collections.Generic;

namespace ClothingWebsite.Server.Models;

public partial class TaiKhoan
{
    public string MaTaiKhoan { get; set; } = null!;

    public string? Username { get; set; }

    public string? Password { get; set; }

    public int? QuyenTaiKhoan { get; set; }

    public virtual ICollection<SanPhamKhachHang> SanPhamKhachHangs { get; set; } = new List<SanPhamKhachHang>();


}
