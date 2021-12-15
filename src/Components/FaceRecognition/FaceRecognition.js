import React from 'react'
import './Face.css'
const FaceRecognition = ({imgUrl, boxFace}) => {
    return (
        <div className='center ma'>
            <div className="absolute mt2">
                <img  id='inputimage' src={imgUrl} width= '500px' height='auto'/>
                <div  className='bounding-box' style={{top: boxFace.topRow,  right: boxFace.rightCol, bottom: boxFace.bottomRow, left: boxFace.leftCol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition
