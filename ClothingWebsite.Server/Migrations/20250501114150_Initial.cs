using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable
namespace ClothingWebsite.Server.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
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
                    table.PrimaryKey("PK__LoaiSanP__730A57590A1EAD0A", x => x.MaLoai);
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
                    table.PrimaryKey("PK__MauSanPh__3A5BBB7D1434B5F5", x => x.MaMau);
                });

            migrationBuilder.CreateTable(
                name: "Size",
                columns: table => new
                {
                    MaSize = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Size = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Size__A787E7EDA48E3A87", x => x.MaSize);
                });

            migrationBuilder.CreateTable(
                name: "Style",
                columns: table => new
                {
                    MaStyle = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Style = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Style__4ED8ED094AF605AE", x => x.MaStyle);
                });

            migrationBuilder.CreateTable(
                name: "TaiKhoan",
                columns: table => new
                {
                    MaTaiKhoan = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Username = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    QuyenTaiKhoan = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__TaiKhoan__AD7C65298F5CD87B", x => x.MaTaiKhoan);
                });

            migrationBuilder.CreateTable(
                name: "SanPham",
                columns: table => new
                {
                    MaSanPham = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    TenSanPham = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    HinhAnh = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Gia = table.Column<int>(type: "int", nullable: true),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    MaLoai = table.Column<int>(type: "int", nullable: false),
                    MaMau = table.Column<int>(type: "int", nullable: false),
                    MaSize = table.Column<int>(type: "int", nullable: false),
                    MaStyle = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SanPham__FAC7442DFF6F453A", x => x.MaSanPham);
                    table.ForeignKey(
                        name: "FK_SanPham_Size",
                        column: x => x.MaSize,
                        principalTable: "Size",
                        principalColumn: "MaSize");
                    table.ForeignKey(
                        name: "FK__SanPham__MaLoai__47DBAE45",
                        column: x => x.MaLoai,
                        principalTable: "LoaiSanPham",
                        principalColumn: "MaLoai",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__SanPham__MaMau__48CFD27E",
                        column: x => x.MaMau,
                        principalTable: "MauSanPham",
                        principalColumn: "MaMau",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__SanPham__MaStyle__7A672E12",
                        column: x => x.MaStyle,
                        principalTable: "Style",
                        principalColumn: "MaStyle");
                });

            migrationBuilder.CreateTable(
                name: "SanPhamKhachHang",
                columns: table => new
                {
                    MaTaiKhoan = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    MaSanPham = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SanPhamK__62D0116B24603860", x => new { x.MaTaiKhoan, x.MaSanPham });
                    table.ForeignKey(
                        name: "FK__SanPhamKh__MaSan__4D94879B",
                        column: x => x.MaSanPham,
                        principalTable: "SanPham",
                        principalColumn: "MaSanPham",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__SanPhamKh__MaTai__4CA06362",
                        column: x => x.MaTaiKhoan,
                        principalTable: "TaiKhoan",
                        principalColumn: "MaTaiKhoan",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "UQ__LoaiSanP__4E48BB75B91FC594",
                table: "LoaiSanPham",
                column: "Loai",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__MauSanPh__C7977BC267540E66",
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
                name: "IX_SanPham_MaSize",
                table: "SanPham",
                column: "MaSize");

            migrationBuilder.CreateIndex(
                name: "IX_SanPham_MaStyle",
                table: "SanPham",
                column: "MaStyle");

            migrationBuilder.CreateIndex(
                name: "IX_SanPhamKhachHang_MaSanPham",
                table: "SanPhamKhachHang",
                column: "MaSanPham");

            migrationBuilder.CreateIndex(
                name: "UQ__Size__A3250D06BE91F199",
                table: "Size",
                column: "Size",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Style__72289F9592F96805",
                table: "Style",
                column: "Style",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__TaiKhoan__536C85E458DB4F16",
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
                name: "Size");

            migrationBuilder.DropTable(
                name: "LoaiSanPham");

            migrationBuilder.DropTable(
                name: "MauSanPham");

            migrationBuilder.DropTable(
                name: "Style");
        }
    }
}
