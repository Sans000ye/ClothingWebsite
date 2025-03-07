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
        => optionsBuilder.UseSqlServer("Server=HELPMEIMBLIND\\SQLEXPRESS;Database=QuanAo;Trusted_Connection=True;MultipleActiveResultSets=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LoaiSanPham>(entity =>
        {
            entity.HasKey(e => e.MaLoai).HasName("PK__LoaiSanP__730A57590A1EAD0A");

            entity.ToTable("LoaiSanPham");

            entity.HasIndex(e => e.Loai, "UQ__LoaiSanP__4E48BB75B91FC594").IsUnique();

            entity.Property(e => e.Loai)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<MauSanPham>(entity =>
        {
            entity.HasKey(e => e.MaMau).HasName("PK__MauSanPh__3A5BBB7D1434B5F5");

            entity.ToTable("MauSanPham");

            entity.HasIndex(e => e.Mau, "UQ__MauSanPh__C7977BC267540E66").IsUnique();

            entity.Property(e => e.Mau).HasMaxLength(30);
        });

        modelBuilder.Entity<SanPham>(entity =>
        {
            entity.HasKey(e => e.MaSanPham).HasName("PK__SanPham__FAC7442DFF6F453A");

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
                .HasConstraintName("FK__SanPham__MaLoai__47DBAE45");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.MaMau)
                .HasConstraintName("FK__SanPham__MaMau__48CFD27E");

            entity.HasOne(d => d.MaSizeNavigation).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.MaSize)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SanPham_Size");

            entity.HasOne(d => d.MaStyleNavigation).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.MaStyle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SanPham__MaStyle__7A672E12");
        });

        modelBuilder.Entity<SanPhamKhachHang>(entity =>
        {
            entity.HasKey(e => new { e.MaTaiKhoan, e.MaSanPham }).HasName("PK__SanPhamK__62D0116B24603860");

            entity.ToTable("SanPhamKhachHang");

            entity.Property(e => e.MaTaiKhoan)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.MaSanPham)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.MaSanPhamNavigation).WithMany(p => p.SanPhamKhachHangs)
                .HasForeignKey(d => d.MaSanPham)
                .HasConstraintName("FK__SanPhamKh__MaSan__4D94879B");

            entity.HasOne(d => d.MaTaiKhoanNavigation).WithMany(p => p.SanPhamKhachHangs)
                .HasForeignKey(d => d.MaTaiKhoan)
                .HasConstraintName("FK__SanPhamKh__MaTai__4CA06362");
        });

        modelBuilder.Entity<Size>(entity =>
        {
            entity.HasKey(e => e.MaSize).HasName("PK__Size__A787E7EDA48E3A87");

            entity.ToTable("Size");

            entity.HasIndex(e => e.Size1, "UQ__Size__A3250D06BE91F199").IsUnique();

            entity.Property(e => e.Size1)
                .HasMaxLength(5)
                .HasColumnName("Size");
        });

        modelBuilder.Entity<Style>(entity =>
        {
            entity.HasKey(e => e.MaStyle).HasName("PK__Style__4ED8ED094AF605AE");

            entity.ToTable("Style");

            entity.HasIndex(e => e.Style1, "UQ__Style__72289F9592F96805").IsUnique();

            entity.Property(e => e.Style1)
                .HasMaxLength(30)
                .HasColumnName("Style");
        });

        modelBuilder.Entity<TaiKhoan>(entity =>
        {
            entity.HasKey(e => e.MaTaiKhoan).HasName("PK__TaiKhoan__AD7C65298F5CD87B");

            entity.ToTable("TaiKhoan");

            entity.HasIndex(e => e.Username, "UQ__TaiKhoan__536C85E458DB4F16").IsUnique();

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
