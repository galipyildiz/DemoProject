using DemoProject.API.DTOs;
using DemoProject.API.Models;
using DemoProject.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DemoProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BuildingsController : ControllerBase
    {
        private readonly BuildingService _buildingService;

        public BuildingsController(BuildingService buildingService)
        {
            _buildingService = buildingService;
        }
#pragma warning disable CS8602 // Dereference of a possibly null reference.
        public int UserId => Convert.ToInt32((HttpContext.User.Identity as ClaimsIdentity).FindFirst(ClaimTypes.NameIdentifier).Value);
#pragma warning restore CS8602 // Dereference of a possibly null reference.

        [HttpGet]
        public async Task<ActionResult<List<Building>>> GetAllBuildings()
        {
            return await _buildingService.GetUserAllBuildingAsync(UserId);
        }
        [Route("AvailableTypes")]
        [HttpGet]
        public async Task<ActionResult<List<BuildingType>>> GetUserBuildingTypes()
        {
            return await _buildingService.GetNotInsertedBuildingTypesAsync(UserId);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Building>> GetBuilding(string id)
        {
            Building building = await _buildingService.GetUserBuildingAsync(id, UserId);
            if (building == null)
            {
                return BadRequest(new
                {
                    StatusCode = "400",
                    Description = "Building is not found."
                });
            }
            return Ok(building);
        }
        [HttpPost]
        public async Task<ActionResult> PostBuilding(BuildingDTO buildingDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    Code = "400",
                    Description = "BuildingCost must be greater than zero, ConstructionTime must be between 30 and 1800"
                });
            }
            if (await _buildingService.IsUserBuildingTypeExistsAsync(UserId, buildingDTO.BuildingType))
            {
                return BadRequest(new
                {
                    Code = "400",
                    Description = "BuildingType already exists."
                });
            }
            await _buildingService.CreateBuildingAsync(new Building()
            {
                BuildingCost = buildingDTO.BuildingCost,
                ConstructionTime = buildingDTO.ConstructionTime,
                BuildingType = buildingDTO.BuildingType,
                UserId = this.UserId
            });
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBuilding(string id)
        {
            Building building = await _buildingService.GetUserBuildingAsync(id, UserId);
            if (building == null)
            {
                return BadRequest(new
                {
                    Code = "400",
                    Description = "Building not found."
                });
            }
            await _buildingService.RemoveBuildingAsync(id);
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> PutBuilding(string id, BuildingDTO buildingDTO)
        {
            Building building = await _buildingService.GetUserBuildingAsync(id, UserId);
            if (building == null)
            {
                return BadRequest(new
                {
                    Code = "400",
                    Description = "Building not found."
                });
            }
            if (await _buildingService.IsUserBuildingTypeExistsAsync(UserId, buildingDTO.BuildingType))
            {
                return BadRequest(new
                {
                    Code = "400",
                    Description = "BuildingType already exists."
                });
            }
            building.ConstructionTime = building.ConstructionTime;
            building.BuildingType = buildingDTO.BuildingType;
            building.BuildingCost = buildingDTO.BuildingCost;
            await _buildingService.UpdateBuildingAsync(id, building);
            return Ok();
        }
    }
}
