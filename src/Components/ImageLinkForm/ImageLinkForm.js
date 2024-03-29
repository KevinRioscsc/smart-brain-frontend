import React from 'react'
import './Image.css'
const ImageLinkForm = ({InputChange, button}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic brain will detect faces in your photo. Give it a try'}
            </p>
            <div className='center'>
                <div className="form center pa4 br3 shadow-5">
                    <input className='f4 pa2 w-70 center' type="text" onChange={InputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer' onClick={button}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm
