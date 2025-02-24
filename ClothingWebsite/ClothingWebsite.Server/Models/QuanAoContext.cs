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

    public virtual DbSet<LoaiSanPham> LoaiSanPhams { get; set; }

    public virtual DbSet<MauSanPham> MauSanPhams { get; set; }

    public virtual DbSet<SanPham> SanPhams { get; set; }

    public virtual DbSet<SanPhamKhachHang> SanPhamKhachHangs { get; set; }

    public virtual DbSet<TaiKhoan> TaiKhoans { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=HELPMEIMBLIND\\SQLEXPRESS;Database=QuanAo;Trusted_Connection=True;Integrated Security=True;Encrypt=False;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LoaiSanPham>(entity =>
        {
            entity.HasKey(e => e.MaLoai).HasName("PK__LoaiSanP__730A5759C110543F");

            entity.ToTable("LoaiSanPham");

            entity.HasIndex(e => e.Loai, "UQ__LoaiSanP__4E48BB75231FA042").IsUnique();

            entity.Property(e => e.Loai)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<MauSanPham>(entity =>
        {
            entity.HasKey(e => e.MaMau).HasName("PK__MauSanPh__3A5BBB7D8523C8FE");

            entity.ToTable("MauSanPham");

            entity.HasIndex(e => e.Mau, "UQ__MauSanPh__C7977BC2A4AF3D99").IsUnique();

            entity.Property(e => e.Mau)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<SanPham>(entity =>
        {
            entity.HasKey(e => e.MaSanPham).HasName("PK__SanPham__FAC7442DA12C8AC9");

            entity.ToTable("SanPham");

            entity.Property(e => e.MaSanPham)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.MaLoaiNavigation).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.MaLoai)
                .HasConstraintName("FK__SanPham__MaLoai__4222D4EF");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.MaMau)
                .HasConstraintName("FK__SanPham__MaMau__4316F928");
        });

        modelBuilder.Entity<SanPhamKhachHang>(entity =>
        {
            entity.HasKey(e => new { e.MaTaiKhoan, e.MaSanPham }).HasName("PK__SanPhamK__62D0116B4FE28E24");

            entity.ToTable("SanPhamKhachHang");

            entity.Property(e => e.MaTaiKhoan)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.MaSanPham)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.HinhAnh)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.MaSanPhamNavigation).WithMany(p => p.SanPhamKhachHangs)
                .HasForeignKey(d => d.MaSanPham)
                .HasConstraintName("FK__SanPhamKh__MaSan__47DBAE45");

            entity.HasOne(d => d.MaTaiKhoanNavigation).WithMany(p => p.SanPhamKhachHangs)
                .HasForeignKey(d => d.MaTaiKhoan)
                .HasConstraintName("FK__SanPhamKh__MaTai__46E78A0C");
        });

        modelBuilder.Entity<TaiKhoan>(entity =>
        {
            entity.HasKey(e => e.MaTaiKhoan).HasName("PK__TaiKhoan__AD7C652946046DC5");

            entity.ToTable("TaiKhoan");

            entity.HasIndex(e => e.Username, "UQ__TaiKhoan__536C85E46D7C7386").IsUnique();

            entity.Property(e => e.MaTaiKhoan)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
