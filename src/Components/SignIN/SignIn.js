import React from 'react'
import { useState } from 'react';

const SignIn = ({onRouteChange, loadUser}) => {
    const [email,setEmail] = useState();
    const[password, setPassword] = useState();

    const onEmailChange = (event) =>{
        setEmail({SignInEmail: event.target.value});
    }
    const onPasswordChange = (event) =>{
        setPassword({SignInPassword: event.target.value});
    }

    const onSubmitSignIN = () => {
        console.log(password, email);
        fetch('https://whispering-dawn-49492.herokuapp.com/signin', {
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email.SignInEmail,
                password: password.SignInPassword
            })
        }).then(response => response.json())
        .then(user => {
            if(user.id){
                loadUser(user);
                onRouteChange('home')
            }
        })
       
    }
    return (
        <article className='br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
            <main className="pa4 black-80">
                <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div class="mt3">
                        <label class="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                   
                    </fieldset>
                    <div className="">
                    <input onClick={onSubmitSignIN} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                    
                    </div>
                </div>
            </main>
        </article>

    )
}

export default SignIn
