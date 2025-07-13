using System;
using System.Collections.Generic;

namespace ClothingWebsite.Server.Models;

public partial class Style
{
    public int MaStyle { get; set; }

    public string? Style1 { get; set; }

    public virtual ICollection<SanPham> SanPhams { get; set; } = new List<SanPham>();
}
