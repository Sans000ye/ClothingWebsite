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
                    table.PrimaryKey("PK__LoaiSanP__730A5759C110543F", x => x.MaLoai);
                });

            migrationBuilder.CreateTable(
                name: "MauSanPham",
                columns: table => new
                {
                    MaMau = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Mau = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__MauSanPh__3A5BBB7D8523C8FE", x => x.MaMau);
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
                    table.PrimaryKey("PK__TaiKhoan__AD7C652946046DC5", x => x.MaTaiKhoan);
                });

            migrationBuilder.CreateTable(
                name: "SanPham",
                columns: table => new
                {
                    MaSanPham = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    MaLoai = table.Column<int>(type: "int", nullable: false),
                    MaMau = table.Column<int>(type: "int", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SanPham__FAC7442DA12C8AC9", x => x.MaSanPham);
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
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    HinhAnh = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SanPhamK__62D0116B4FE28E24", x => new { x.MaTaiKhoan, x.MaSanPham });
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
                name: "UQ__LoaiSanP__4E48BB75231FA042",
                table: "LoaiSanPham",
                column: "Loai",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__MauSanPh__C7977BC2A4AF3D99",
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
                name: "UQ__TaiKhoan__536C85E46D7C7386",
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
