using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClothingWebsite.Server.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LoaiSanPham",
                columns: table => new
                {
                    MaLoai = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Loai = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LoaiSanP__730A5759D9B537CE", x => x.MaLoai);
                });

            migrationBuilder.CreateTable(
                name: "MauSanPham",
                columns: table => new
                {
                    MaMau = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Mau = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__MauSanPh__3A5BBB7D4E06701F", x => x.MaMau);
                });

            migrationBuilder.CreateTable(
                name: "TaiKhoan",
                columns: table => new
                {
                    MaTaiKhoan = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    Username = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    QuyenTaiKhoan = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__TaiKhoan__AD7C652993619B34", x => x.MaTaiKhoan);
                });

            migrationBuilder.CreateTable(
                name: "SanPham",
                columns: table => new
                {
                    MaSanPham = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    TenSanPham = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    MaLoai = table.Column<int>(type: "int", nullable: false),
                    MaMau = table.Column<int>(type: "int", nullable: false),
                    HinhAnh = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    SoLuong = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SanPham__FAC7442D2F1AAC46", x => x.MaSanPham);
                    table.ForeignKey(
                        name: "FK__SanPham__MaLoai__4222D4EF",
                        column: x => x.MaLoai,
                        principalTable: "LoaiSanPham",
                        principalColumn: "MaLoai",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__SanPham__MaMau__4316F928",
                        column: x => x.MaMau,
                        principalTable: "MauSanPham",
                        principalColumn: "MaMau",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SanPhamKhachHang",
                columns: table => new
                {
                    MaTaiKhoan = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    MaSanPham = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SanPhamK__62D0116B4A0F0C6E", x => new { x.MaTaiKhoan, x.MaSanPham });
                    table.ForeignKey(
                        name: "FK__SanPhamKh__MaSan__47DBAE45",
                        column: x => x.MaSanPham,
                        principalTable: "SanPham",
                        principalColumn: "MaSanPham",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__SanPhamKh__MaTai__46E78A0C",
                        column: x => x.MaTaiKhoan,
                        principalTable: "TaiKhoan",
                        principalColumn: "MaTaiKhoan",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "UQ__LoaiSanP__4E48BB752EE182DB",
                table: "LoaiSanPham",
                column: "Loai",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__MauSanPh__C7977BC2CD465C8A",
                table: "MauSanPham",
                column: "Mau",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SanPham_MaLoai",
                table: "SanPham",
                column: "MaLoai");

            migrationBuilder.CreateIndex(
                name: "IX_SanPham_MaMau",
                table: "SanPham",
                column: "MaMau");

            migrationBuilder.CreateIndex(
                name: "IX_SanPhamKhachHang_MaSanPham",
                table: "SanPhamKhachHang",
                column: "MaSanPham");

            migrationBuilder.CreateIndex(
                name: "UQ__TaiKhoan__536C85E43C767136",
                table: "TaiKhoan",
                column: "Username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SanPhamKhachHang");

            migrationBuilder.DropTable(
                name: "SanPham");

            migrationBuilder.DropTable(
                name: "TaiKhoan");

            migrationBuilder.DropTable(
                name: "LoaiSanPham");

            migrationBuilder.DropTable(
                name: "MauSanPham");
        }
    }
}
