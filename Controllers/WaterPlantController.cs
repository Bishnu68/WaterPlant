using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace waterPlants.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class WaterPlantsController : ControllerBase
    {
        private IPlant plant = new PlantRepository();

        private readonly ILogger<WaterPlantsController> _logger;

        public WaterPlantsController(ILogger<WaterPlantsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Plant>> GetAllPlant()
        {
            try
            {
                var result = plant.GetAllPlant();
                if (result == null)
                {
                    return NotFound();
                }
                return result;
            }
            catch (Exception)
            {

                return StatusCode(
                    StatusCodes.Status500InternalServerError, "Error retrieving data!!");
            }



        }


        [HttpGet("{id:int}")]
        public ActionResult<Plant> GetPlant(int id)
        {
            try
            {
                var result = plant.getPlant(id);
                if (result == null)
                {
                    return NotFound();
                }

                return result;
            }
            catch (Exception)
            {

                return StatusCode(
                    StatusCodes.Status500InternalServerError, "Error retrieving data!!");
            }


        }

        [HttpPut("{id}")]
        public ActionResult<Plant> UpdatePlant(int id)
        {
            //Check if the plant exists 
            var result = plant.getPlant(id);
            if (result == null)
            {
                return NotFound();
            }
            else
            {

                DateTime currentTime = DateTime.Now;
                TimeSpan span = currentTime.Subtract(result.lastWatered);
                if (span.Seconds > 10)
                {
                    //make the update 
                    return plant.updatePlant(id);
                }
                else
                {
                    return BadRequest("Already watered!!");
                }
            }



        }



    }

}