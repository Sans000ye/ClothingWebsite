using System;
using System.Collections.Generic;

namespace ClothingWebsite.Server.Models;

public partial class CustomerProduct
{
    public int CustomerId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public virtual Account Customer { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
