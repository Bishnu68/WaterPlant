import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { REACT_APP_BACKEND_API } from '../contants/env'
import { GET_PLANTS_ACTION, GET_PLANTS_ERROR, GET_PLANTS_LOADING, WATER_PLANT_ACTION } from '../redux/types'

const ButtonAndProgress = ({plantID, lastWatered}) => {

  const dispatch = useDispatch()


    const handleWater = async () => {
        setWatering(true)
        console.log('checking data before dispatch')
        dispatch({
          type: GET_PLANTS_LOADING
      })
        console.log('checking data after dispatch')
        try{
          const response = await fetch(`${REACT_APP_BACKEND_API}/waterPlants/${plantID}`,{ method:'PUT'}).then(response => response.json())
        console.log('checking data', response)
          dispatch ({
              type: WATER_PLANT_ACTION,
              payload:response
          });

      } catch(error){
          console.log('checking error', error)
          dispatch ({
              type: GET_PLANTS_ERROR,
              payload:'error'
          });
      }
  }

    const StyleProgressBar = {
        display: 'inline',
        width: '60%', 
        marginLeft: '114px', 
        color: 'green' , 
        marginButtom: '6px'

    }

    const StyleBlock = {
        display: 'inherit'
    }

    const StyleButton = {
        backgroundColor: 'green',
        color: 'white', 
        height: '32px', 
        borderColor: 'green'
    }

    const disabledButton = {
        backgroundColor: 'grey',
        borderColor: 'grey'
    }

    

    const [countOfProgess, setCountOfProgess] = useState(0);
    const [watering, setWatering] = useState(false)

    useEffect(() => {
      if(!watering){
          return
      }

      setTimeout(() => {
          setWatering(false)
      }, 10000);
    }, [watering])
    

    const lastWateredDate = new Date(lastWatered).getTime()
    const now = new Date().getTime()
    const lastWateredAgo = now - lastWateredDate
    const isDry = (lastWateredAgo / (1000 * 60 *6)) >= 6 
        
    return (
    
    <div style={StyleBlock}>
      <button style = { !watering ? StyleButton : { StyleButton,...disabledButton}} onClick={handleWater} disabled={watering}>Water</button>
    
      { isDry &&
       <div  style={{...StyleProgressBar,  color: 'red'}}>
       <h6>Please Water!</h6>
       </div>}
      
      { watering &&
       <div  style={StyleProgressBar}>
       <h6>Watering...</h6>
       </div>}
      
    </div>
  )
}

export default ButtonAndProgress