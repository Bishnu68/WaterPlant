import { GET_PLANTS_ACTION, GET_PLANTS_ERROR, GET_PLANTS_LOADING, WATER_PLANT_ACTION } from "../types";


const INITIAL_STATE = {
    loading: false,
    plants:[],
    error: ""
};

const reducer = (state = INITIAL_STATE, action) => {

  const waterPlants = () => {
    const newPlants = state.plants.map(plant => {
      if(plant.id !== action.payload.id){
        return plant
      }
      return action.payload
    })

    return newPlants

  }

    switch (action.type) {

        case GET_PLANTS_ACTION:

           return {
             ...state,
              loading: false,
              plants: action.payload

           };

        case WATER_PLANT_ACTION:
           return {
              ...state,
              loading: false,
              plants: waterPlants()

           };
        case GET_PLANTS_LOADING:
            return {
              ...state,
              loading: true,
              error: false,
 
            };
 
         case GET_PLANTS_ERROR:
            return {
               ...state,
               loading: false,
               error: action.payload
            };

         default: return state;

    }

};

export default reducer;