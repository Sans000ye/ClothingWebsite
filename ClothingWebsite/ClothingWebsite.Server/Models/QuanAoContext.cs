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
        => optionsBuilder.UseSqlServer("Server=HELPMEIMBLIND\\SQLEXPRESS;Database=QuanAo;Trusted_Connection=True;MultipleActiveResultSets=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LoaiSanPham>(entity =>
        {
            entity.HasKey(e => e.MaLoai).HasName("PK__LoaiSanP__730A5759D9B537CE");

            entity.ToTable("LoaiSanPham");

            entity.HasIndex(e => e.Loai, "UQ__LoaiSanP__4E48BB752EE182DB").IsUnique();

            entity.Property(e => e.Loai)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<MauSanPham>(entity =>
        {
            entity.HasKey(e => e.MaMau).HasName("PK__MauSanPh__3A5BBB7D4E06701F");

            entity.ToTable("MauSanPham");

            entity.HasIndex(e => e.Mau, "UQ__MauSanPh__C7977BC2CD465C8A").IsUnique();

            entity.Property(e => e.Mau).HasMaxLength(30);
        });

        modelBuilder.Entity<SanPham>(entity =>
        {
            entity.HasKey(e => e.MaSanPham).HasName("PK__SanPham__FAC7442D2F1AAC46");

            entity.ToTable("SanPham");

            entity.Property(e => e.MaSanPham)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.HinhAnh)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.TenSanPham).HasMaxLength(20);

            entity.HasOne(d => d.MaLoaiNavigation).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.MaLoai)
                .HasConstraintName("FK__SanPham__MaLoai__4222D4EF");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.MaMau)
                .HasConstraintName("FK__SanPham__MaMau__4316F928");
        });

        modelBuilder.Entity<SanPhamKhachHang>(entity =>
        {
            entity.HasKey(e => new { e.MaTaiKhoan, e.MaSanPham }).HasName("PK__SanPhamK__62D0116B4A0F0C6E");

            entity.ToTable("SanPhamKhachHang");

            entity.Property(e => e.MaTaiKhoan)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.MaSanPham)
                .HasMaxLength(10)
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
            entity.HasKey(e => e.MaTaiKhoan).HasName("PK__TaiKhoan__AD7C652993619B34");

            entity.ToTable("TaiKhoan");

            entity.HasIndex(e => e.Username, "UQ__TaiKhoan__536C85E43C767136").IsUnique();

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
