using DemoProject.API.Data;
using DemoProject.API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DemoProject.API.Services
{
    public class BuildingService
    {
        private readonly IMongoCollection<Building> _buildingCollection;
        public BuildingService(IOptions<AppBuildingDbSettings> appBuildingDbSettings)
        {
            var mongoClient = new MongoClient(appBuildingDbSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(appBuildingDbSettings.Value.DatabaseName);

            _buildingCollection = mongoDatabase.GetCollection<Building>(appBuildingDbSettings.Value.BuildingsCollectionName);
        }

        public async Task<List<Building>> GetAllBuildingsAsync()
        {
            return await _buildingCollection.Find(_ => true).ToListAsync();
        }
        public async Task<Building> GetBuildingAsync(string id)
        {
            return await _buildingCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }
        public async Task<Building> GetUserBuildingAsync(string id, int userId)
        {
            return await _buildingCollection.Find(x => x.Id == id && x.UserId == userId).FirstOrDefaultAsync();
        }
        public async Task<List<Building>> GetUserAllBuildingAsync(int userId)
        {
            return await _buildingCollection.Find(x => x.UserId == userId).ToListAsync();
        }
        public async Task<List<BuildingType>> GetNotInsertedBuildingTypesAsync(int userId)
        {
            List<Building> buildings = await GetUserAllBuildingAsync(userId);
            List<BuildingType> insertedBuildingTypes = buildings.Select(x => x.BuildingType).ToList();
            return Enum.GetValues(typeof(BuildingType)).Cast<BuildingType>().Where(x => !insertedBuildingTypes.Contains(x)).ToList();
        }
        public async Task<bool> IsUserBuildingTypeExistsAsync(int userId, BuildingType buildingType)
        {
            return await _buildingCollection.Find(x => x.UserId == userId && x.BuildingType == buildingType).AnyAsync();
        }
        public async Task CreateBuildingAsync(Building building)
        {
            await _buildingCollection.InsertOneAsync(building);
        }
        public async Task UpdateBuildingAsync(string id, Building building)
        {
            await _buildingCollection.ReplaceOneAsync(x => x.Id == id, building);
        }
        public async Task RemoveBuildingAsync(string id)
        {
            await _buildingCollection.DeleteOneAsync(x => x.Id == id);
        }
    }
}
