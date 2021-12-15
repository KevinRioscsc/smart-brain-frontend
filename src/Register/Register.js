import React,{useState} from 'react'

const Register = ({onRouteChange, loadUser}) => {
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    const onEmailChange = (event) =>{
        setEmail({SignInEmail: event.target.value});
    }
    const onNameChange = (event) =>{
        setName({SignInName: event.target.value});
    }
    const onPasswordChange = (event) =>{
        setPassword({SignInPassword: event.target.value});
    }
    const onSubmitSignIN = () => {
        
        fetch('https://whispering-dawn-49492.herokuapp.com/register', {
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email.SignInEmail,
                password: password.SignInPassword,
                name: name.SignInName
            })
        }).then(response => response.json())
        .then(user => {
            
            if(user.id){
               
                loadUser(user)
                onRouteChange('home')
            }
        })
       
    }
    return (
        <article className='br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
            <main class="pa4 black-80">
                <div class="measure ">
                    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                    <legend class="f1 fw6 ph0 mh0">Register</legend>
                    <div class="mt3">
                        <label class="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input onChange={onNameChange} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                    </div>
                    <div class="mt3">
                        <label class="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={onEmailChange} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div class="mv3">
                        <label class="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={onPasswordChange} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                   
                    </fieldset>
                    <div class="">
                    <input onClick={onSubmitSignIN} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                    </div>
                    
                </div>
            </main>
        </article>

    )
}

export default Register
