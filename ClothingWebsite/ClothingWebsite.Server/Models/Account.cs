using System;
using System.Collections.Generic;

namespace ClothingWebsite.Server.Models;

public partial class Account
{
    public int AccountId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int UserPower { get; set; }

    public virtual ICollection<CustomerProduct> CustomerProducts { get; set; } = new List<CustomerProduct>();
}
