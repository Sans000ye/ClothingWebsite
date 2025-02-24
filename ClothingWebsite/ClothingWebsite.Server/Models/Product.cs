using System;
using System.Collections.Generic;

namespace ClothingWebsite.Server.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public int TypeId { get; set; }

    public int ColorId { get; set; }

    public int Amount { get; set; }

    public virtual ProductColor Color { get; set; } = null!;

    public virtual ICollection<CustomerProduct> CustomerProducts { get; set; } = new List<CustomerProduct>();

    public virtual ProductType Type { get; set; } = null!;
}
