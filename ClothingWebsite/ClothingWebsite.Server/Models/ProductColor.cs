using System;
using System.Collections.Generic;

namespace ClothingWebsite.Server.Models;

public partial class ProductColor
{
    public int ColorId { get; set; }

    public string Color { get; set; } = null!;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
