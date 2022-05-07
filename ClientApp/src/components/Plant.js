    import React from 'react'
    import ButtonAndProgress from './ButtonAndProgress'
    import { useSelector } from 'react-redux'

    const Plant = () => {

    const {plants, loading} = useSelector((state) => state.plants)



    const plantStyle = {
        width: '300px', 
        height: '350px',
        minWidth: '300px', 
        margin: '15px', 
        padding: '10px', 
        backgroundColor: "hwb(220deg 94% 0%)"
    }

    const imageStyle = {
        
        width: '50%' , 
        height: '50%', 
        display: 'block', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        borderColor: "skyblue", 
        borderStyle: "solid", 
        borderRadius: "35px"

        
    }

    const divStyle = {
        display: 'flex', 
        justifyContent: 'space-around', 
        flexWrap: 'wrap'
    }

    const cardTitle = {
        textAlign: "center"
    }

  

    return (
        <div style={divStyle}>

            {plants.map((plant) => (
                <div className='card' style={plantStyle} key = {plant.id} >
                    <h5 className = 'card-title' style={cardTitle}>{plant.name}</h5>
                    <img src='/FlowerImage.jpg' alt='Flower' style={imageStyle} />
                    <div style={{display: "flex"}}>
                        <p><b> Biological Name :</b>  </p> <p>{plant.description}</p>
                    </div>
                    <div style={{display: "flex"}}>
                        <p><b> Last Watered :</b>  </p> <p>{plant.dateToDisplay}</p>
                    </div>
                
                

                    <ButtonAndProgress plantID={plant.id} lastWatered={plant.lastWatered}/>


                </div>
                ))
            }
        </div>
    )}

    export default Plant