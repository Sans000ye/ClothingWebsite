using System;
using System.Collections.Generic;

namespace ClothingWebsite.Server.Models;
public partial class Size
{
    public int MaSize { get; set; }

    public string? Size1 { get; set; }

    public virtual ICollection<SanPham> SanPhams { get; set; } = new List<SanPham>();
}
