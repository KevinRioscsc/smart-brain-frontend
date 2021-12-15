import React from 'react'


const Navigation = ({rout,checkSign}) => {
   
        if(checkSign){
            return(
        <nav  style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <p  onClick={() => rout('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
        )
        }else{
            return(
            
            <nav  style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <p  onClick={() => rout('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                <p  onClick={() => rout('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
          
               
         
        )
        }
    
}

export default Navigation
