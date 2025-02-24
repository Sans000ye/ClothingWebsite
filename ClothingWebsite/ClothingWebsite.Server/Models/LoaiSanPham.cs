using System;
using System.Collections.Generic;

namespace ClothingWebsite.Server.Models;

public partial class LoaiSanPham
{
    public int MaLoai { get; set; }

    public string Loai { get; set; } = null!;

    public virtual ICollection<SanPham> SanPhams { get; set; } = new List<SanPham>();
}
