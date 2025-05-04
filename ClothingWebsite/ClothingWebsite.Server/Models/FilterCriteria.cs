namespace ClothingWebsite.Server.Models
{
    public class FilterCriteria
    {
        public string Type { get; set; } = string.Empty;
        public decimal[] PriceRange { get; set; } = new decimal[] { 0, 1000000 };
        public string Style { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
    }
}
