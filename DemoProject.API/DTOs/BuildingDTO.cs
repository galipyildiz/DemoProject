using DemoProject.API.Models;
using System.ComponentModel.DataAnnotations;

namespace DemoProject.API.DTOs
{
    public class BuildingDTO
    {
        [Range(1, double.MaxValue)]
        public int BuildingCost { get; set; }

        [Range(30, 1800)]
        public int ConstructionTime { get; set; }
        public BuildingType BuildingType { get; set; }
    }
}
