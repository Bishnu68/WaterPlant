using System.Linq;
using System.Collections.Generic;
using System;
using System.IO;
using Newtonsoft.Json;

namespace waterPlants
{
    public class PlantRepository : IPlant
    {
        // List<Plant> listPlant = new List<Plant>
        // {
        //     new Plant{Id=1,Name = "Merigold", Description = "Description 1", isWatering = true, lastWatered = new DateTime()   },
        //     new Plant{Id=2, Name = "SomeRandomFlower", Description = "Description 2 ", isWatering = false, lastWatered = new DateTime() },
        //     new Plant{Id=3, Name = "Flower3", Description = "Description 2 ", isWatering = false, lastWatered = new DateTime(2015,12,10) },
        //     new Plant{Id=4, Name = "SomeRandomFlower", Description = "Description 2 ", isWatering = false, lastWatered = new DateTime() },
        //     new Plant{Id=5, Name = "SomeRandomFlower", Description = "Description 2 ", isWatering = false, lastWatered = new DateTime() }
        // };


        List<Plant> listPlant = JsonConvert.DeserializeObject<List<Plant>>(File.ReadAllText(@".\Data\Plants.json"));

        public List<Plant> GetAllPlant()
        {
            return listPlant;
        }

        public Plant getPlant(int id)
        {
            return listPlant.FirstOrDefault(
                x => x.Id == id
            );
        }

        public Plant updatePlant(int id)
        {

            int IndexNo = listPlant.FindIndex(plant => plant.Id == id);
            listPlant[IndexNo].lastWatered = DateTime.Now;


            string output = Newtonsoft.Json.JsonConvert.SerializeObject(listPlant, Newtonsoft.Json.Formatting.Indented);
            File.WriteAllText(@".\Data\Plants.json", output);

            Plant found = listPlant.FirstOrDefault(c => c.Id == id);
            return found;
        }



    }
}