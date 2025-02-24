using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ClothingWebsite.Server.Models;

public partial class QuanAoContext : DbContext
{
    public QuanAoContext()
    {
    }

    public QuanAoContext(DbContextOptions<QuanAoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<CustomerProduct> CustomerProducts { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductColor> ProductColors { get; set; }

    public virtual DbSet<ProductType> ProductTypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=HELPMEIMBLIND\\SQLEXPRESS;Database=QuanAo;Trusted_Connection=True;Integrated Security=True;Encrypt=False;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.AccountId).HasName("PK__Account__46A222CDB5ED18D8");

            entity.ToTable("Account");

            entity.HasIndex(e => e.Username, "UQ__Account__F3DBC5729A2E0E73").IsUnique();

            entity.Property(e => e.AccountId).HasColumnName("account_id");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.UserPower).HasColumnName("user_power");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        modelBuilder.Entity<CustomerProduct>(entity =>
        {
            entity.HasKey(e => new { e.CustomerId, e.ProductId }).HasName("PK__Customer__8915EC5AEBEDB9CB");

            entity.ToTable("Customer_Product");

            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.Customer).WithMany(p => p.CustomerProducts)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Customer___custo__5165187F");

            entity.HasOne(d => d.Product).WithMany(p => p.CustomerProducts)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__Customer___produ__52593CB8");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Product__47027DF5C3785C2E");

            entity.ToTable("Product");

            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.ColorId).HasColumnName("color_id");
            entity.Property(e => e.TypeId).HasColumnName("type_id");

            entity.HasOne(d => d.Color).WithMany(p => p.Products)
                .HasForeignKey(d => d.ColorId)
                .HasConstraintName("FK__Product__color_i__4D94879B");

            entity.HasOne(d => d.Type).WithMany(p => p.Products)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("FK__Product__type_id__4CA06362");
        });

        modelBuilder.Entity<ProductColor>(entity =>
        {
            entity.HasKey(e => e.ColorId).HasName("PK__Product___1143CECB0643E4DA");

            entity.ToTable("Product_Color");

            entity.HasIndex(e => e.Color, "UQ__Product___900DC6E9F1FAD0A5").IsUnique();

            entity.Property(e => e.ColorId).HasColumnName("color_id");
            entity.Property(e => e.Color)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("color");
        });

        modelBuilder.Entity<ProductType>(entity =>
        {
            entity.HasKey(e => e.TypeId).HasName("PK__Product___2C000598F70CF72F");

            entity.ToTable("Product_Type");

            entity.HasIndex(e => e.ProductType1, "UQ__Product___D1B20C68BE5AC269").IsUnique();

            entity.Property(e => e.TypeId).HasColumnName("type_id");
            entity.Property(e => e.ProductType1)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("product_type");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
