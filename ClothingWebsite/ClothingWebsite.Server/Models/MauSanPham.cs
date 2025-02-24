using System;
using System.Collections.Generic;

namespace ClothingWebsite.Server.Models;

public partial class MauSanPham
{
    public int MaMau { get; set; }

    public string Mau { get; set; } = null!;

    public virtual ICollection<SanPham> SanPhams { get; set; } = new List<SanPham>();
}
