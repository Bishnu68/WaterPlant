import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navigation  from './components/Navigation'
import Plant from './components/Plant'
import { REACT_APP_BACKEND_API } from './contants/env'
import { GET_PLANTS_ACTION, GET_PLANTS_ERROR, GET_PLANTS_LOADING, WATER_PLANT_ACTION } from './redux/types'

const App = () => {

  const dispatch = useDispatch()

  const plants = useSelector((state) => state.plants)


  useEffect(() => {

    const getPlantAction = async () => {

      dispatch({
          type: GET_PLANTS_LOADING
      })
      try{
          const response = await fetch(`${REACT_APP_BACKEND_API}/waterPlants`).then(response => response.json())
          const payload = response
          dispatch ({
              type: GET_PLANTS_ACTION,
              payload
  
          });
  
      } catch(error){
          dispatch ({
              type: GET_PLANTS_ERROR,
              payload:'error'
          });
      }
  }

    getPlantAction()

  }, [dispatch])


  console.log('checking plants', plants)



  return (
    <div>
      <Navigation/>
      <Plant/>
    </div>
  )
}

export default App