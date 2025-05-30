﻿// <auto-generated />
using ClothingWebsite.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ClothingWebsite.Server.Migrations
{
    [DbContext(typeof(QuanAoContext))]
    [Migration("20250501114150_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ClothingWebsite.Server.Models.LoaiSanPham", b =>
                {
                    b.Property<int>("MaLoai")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaLoai"));

                    b.Property<string>("Loai")
                        .IsRequired()
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.HasKey("MaLoai")
                        .HasName("PK__LoaiSanP__730A57590A1EAD0A");

                    b.HasIndex(new[] { "Loai" }, "UQ__LoaiSanP__4E48BB75B91FC594")
                        .IsUnique();

                    b.ToTable("LoaiSanPham", (string)null);
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.MauSanPham", b =>
                {
                    b.Property<int>("MaMau")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaMau"));

                    b.Property<string>("Mau")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("MaMau")
                        .HasName("PK__MauSanPh__3A5BBB7D1434B5F5");

                    b.HasIndex(new[] { "Mau" }, "UQ__MauSanPh__C7977BC267540E66")
                        .IsUnique();

                    b.ToTable("MauSanPham", (string)null);
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.SanPham", b =>
                {
                    b.Property<string>("MaSanPham")
                        .HasMaxLength(10)
                        .IsUnicode(false)
                        .HasColumnType("varchar(10)");

                    b.Property<int?>("Gia")
                        .HasColumnType("int");

                    b.Property<string>("HinhAnh")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<int>("MaLoai")
                        .HasColumnType("int");

                    b.Property<int>("MaMau")
                        .HasColumnType("int");

                    b.Property<int>("MaSize")
                        .HasColumnType("int");

                    b.Property<int>("MaStyle")
                        .HasColumnType("int");

                    b.Property<int>("SoLuong")
                        .HasColumnType("int");

                    b.Property<string>("TenSanPham")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("MaSanPham")
                        .HasName("PK__SanPham__FAC7442DFF6F453A");

                    b.HasIndex("MaLoai");

                    b.HasIndex("MaMau");

                    b.HasIndex("MaSize");

                    b.HasIndex("MaStyle");

                    b.ToTable("SanPham", (string)null);
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.SanPhamKhachHang", b =>
                {
                    b.Property<string>("MaTaiKhoan")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("MaSanPham")
                        .HasMaxLength(10)
                        .IsUnicode(false)
                        .HasColumnType("varchar(10)");

                    b.Property<int>("SoLuong")
                        .HasColumnType("int");

                    b.HasKey("MaTaiKhoan", "MaSanPham")
                        .HasName("PK__SanPhamK__62D0116B24603860");

                    b.HasIndex("MaSanPham");

                    b.ToTable("SanPhamKhachHang", (string)null);
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.Size", b =>
                {
                    b.Property<int>("MaSize")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaSize"));

                    b.Property<string>("Size1")
                        .IsRequired()
                        .HasMaxLength(5)
                        .HasColumnType("nvarchar(5)")
                        .HasColumnName("Size");

                    b.HasKey("MaSize")
                        .HasName("PK__Size__A787E7EDA48E3A87");

                    b.HasIndex(new[] { "Size1" }, "UQ__Size__A3250D06BE91F199")
                        .IsUnique();

                    b.ToTable("Size", (string)null);
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.Style", b =>
                {
                    b.Property<int>("MaStyle")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaStyle"));

                    b.Property<string>("Style1")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)")
                        .HasColumnName("Style");

                    b.HasKey("MaStyle")
                        .HasName("PK__Style__4ED8ED094AF605AE");

                    b.HasIndex(new[] { "Style1" }, "UQ__Style__72289F9592F96805")
                        .IsUnique();

                    b.ToTable("Style", (string)null);
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.TaiKhoan", b =>
                {
                    b.Property<string>("MaTaiKhoan")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<int>("QuyenTaiKhoan")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("MaTaiKhoan")
                        .HasName("PK__TaiKhoan__AD7C65298F5CD87B");

                    b.HasIndex(new[] { "Username" }, "UQ__TaiKhoan__536C85E458DB4F16")
                        .IsUnique();

                    b.ToTable("TaiKhoan", (string)null);
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.SanPham", b =>
                {
                    b.HasOne("ClothingWebsite.Server.Models.LoaiSanPham", "MaLoaiNavigation")
                        .WithMany("SanPhams")
                        .HasForeignKey("MaLoai")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__SanPham__MaLoai__47DBAE45");

                    b.HasOne("ClothingWebsite.Server.Models.MauSanPham", "MaMauNavigation")
                        .WithMany("SanPhams")
                        .HasForeignKey("MaMau")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__SanPham__MaMau__48CFD27E");

                    b.HasOne("ClothingWebsite.Server.Models.Size", "MaSizeNavigation")
                        .WithMany("SanPhams")
                        .HasForeignKey("MaSize")
                        .IsRequired()
                        .HasConstraintName("FK_SanPham_Size");

                    b.HasOne("ClothingWebsite.Server.Models.Style", "MaStyleNavigation")
                        .WithMany("SanPhams")
                        .HasForeignKey("MaStyle")
                        .IsRequired()
                        .HasConstraintName("FK__SanPham__MaStyle__7A672E12");

                    b.Navigation("MaLoaiNavigation");

                    b.Navigation("MaMauNavigation");

                    b.Navigation("MaSizeNavigation");

                    b.Navigation("MaStyleNavigation");
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.SanPhamKhachHang", b =>
                {
                    b.HasOne("ClothingWebsite.Server.Models.SanPham", "MaSanPhamNavigation")
                        .WithMany("SanPhamKhachHangs")
                        .HasForeignKey("MaSanPham")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__SanPhamKh__MaSan__4D94879B");

                    b.HasOne("ClothingWebsite.Server.Models.TaiKhoan", "MaTaiKhoanNavigation")
                        .WithMany("SanPhamKhachHangs")
                        .HasForeignKey("MaTaiKhoan")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__SanPhamKh__MaTai__4CA06362");

                    b.Navigation("MaSanPhamNavigation");

                    b.Navigation("MaTaiKhoanNavigation");
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.LoaiSanPham", b =>
                {
                    b.Navigation("SanPhams");
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.MauSanPham", b =>
                {
                    b.Navigation("SanPhams");
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.SanPham", b =>
                {
                    b.Navigation("SanPhamKhachHangs");
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.Size", b =>
                {
                    b.Navigation("SanPhams");
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.Style", b =>
                {
                    b.Navigation("SanPhams");
                });

            modelBuilder.Entity("ClothingWebsite.Server.Models.TaiKhoan", b =>
                {
                    b.Navigation("SanPhamKhachHangs");
                });
#pragma warning restore 612, 618
        }
    }
}
