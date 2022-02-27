using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DemoProject.API.Models
{
    public class Building
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public int BuildingCost { get; set; }
        public int ConstructionTime { get; set; }
        public BuildingType BuildingType { get; set; }
        public int UserId { get; set; }
    }

    public enum BuildingType
    {
        Farm, Academy, Headquarters, Lumbermill, Barracks
    }
}
