namespace DemoProject.API.Data
{
    public class AppBuildingDbSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string BuildingsCollectionName { get; set; } = null!;
    }
}
