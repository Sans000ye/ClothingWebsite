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

    public virtual DbSet<Size> Sizes { get; set; }

    public virtual DbSet<Style> Styles { get; set; }

    public virtual DbSet<TaiKhoan> TaiKhoans { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=HELPMEIMBLIND\\SQLEXPRESS;Database=QuanAo;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LoaiSanPham>(entity =>
        {
            entity.HasKey(e => e.MaLoai);

            entity.ToTable("LoaiSanPham");

            entity.Property(e => e.MaLoai).ValueGeneratedNever();
            entity.Property(e => e.Loai)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<MauSanPham>(entity =>
        {
            entity.HasKey(e => e.MaMau);

            entity.ToTable("MauSanPham");

            entity.Property(e => e.MaMau).ValueGeneratedNever();
            entity.Property(e => e.Mau).HasMaxLength(30);
        });

        modelBuilder.Entity<SanPham>(entity =>
        {
            entity.HasKey(e => e.MaSanPham);

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
                .HasConstraintName("FK_SanPham_LoaiSanPham");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.MaMau)
                .HasConstraintName("FK_SanPham_MauSanPham");

            entity.HasOne(d => d.MaSizeNavigation).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.MaSize)
                .HasConstraintName("FK_SanPham_Size");

            entity.HasOne(d => d.MaStyleNavigation).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.MaStyle)
                .HasConstraintName("FK_SanPham_Style");
        });

        modelBuilder.Entity<SanPhamKhachHang>(entity =>
        {
            entity.HasKey(e => new { e.MaTaiKhoan, e.MaSanPham });

            entity.ToTable("SanPhamKhachHang");

            entity.Property(e => e.MaTaiKhoan)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MaSanPham)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.MaSanPhamNavigation).WithMany(p => p.SanPhamKhachHangs)
                .HasForeignKey(d => d.MaSanPham)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SanPhamKhachHang_SanPham");

            entity.HasOne(d => d.MaTaiKhoanNavigation).WithMany(p => p.SanPhamKhachHangs)
                .HasForeignKey(d => d.MaTaiKhoan)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SanPhamKhachHang_TaiKhoan");
        });

        modelBuilder.Entity<Size>(entity =>
        {
            entity.HasKey(e => e.MaSize);

            entity.ToTable("Size");

            entity.Property(e => e.MaSize).ValueGeneratedNever();
            entity.Property(e => e.Size1)
                .HasMaxLength(5)
                .HasColumnName("Size");
        });

        modelBuilder.Entity<Style>(entity =>
        {
            entity.HasKey(e => e.MaStyle);

            entity.ToTable("Style");

            entity.Property(e => e.MaStyle).ValueGeneratedNever();
            entity.Property(e => e.Style1)
                .HasMaxLength(30)
                .HasColumnName("Style");
        });

        modelBuilder.Entity<TaiKhoan>(entity =>
        {
            entity.HasKey(e => e.MaTaiKhoan);

            entity.ToTable("TaiKhoan");

            entity.Property(e => e.MaTaiKhoan)
                .HasMaxLength(100)
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
