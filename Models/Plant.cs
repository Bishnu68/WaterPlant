using System;

namespace waterPlants
{
    public class Plant
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool isWatering { get; set; }

        public DateTime lastWatered { get; set; }

        public string DateToDisplay
        {
            get
            {
                return lastWatered.ToString("MM/dd/yyyy hh:mm tt");
            }
        }



    }
}