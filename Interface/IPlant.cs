using System.Collections.Generic;

namespace waterPlants
{
    public interface IPlant
    {
        List<Plant> GetAllPlant();
        Plant getPlant(int id);

        Plant updatePlant(int id);

    }

}