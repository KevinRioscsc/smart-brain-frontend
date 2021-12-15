
import './App.css';
import {useState} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank'
import Particles from "react-tsparticles";
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIN/SignIn';
import Register from './Register/Register';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '9a169df65b974780a0ed8ca16aa6e07e'
 });



function App() {
  const [input, setInput] = useState("");
  const [img, setImg] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [signin, setSignIn] = useState(false); 
  const [user, setUser] = useState({
            id: '',
            name:'',
            email:'',
            entries: 0,
            joined:''
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name:data.name,
      email:data.email,
      entries: data.entries ,
      joined: data.joined
    })
  }

  const OnInputChange = (event) =>{
    setInput(event.target.value)
}



  const calculateLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;//outputs a percentage of the image size
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }
  const displayBox = (box2) => {
   
    setBox( box2);
    console.log("Box:", box);
    
  }

  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const onSubmit = () =>{
    
    setImg(input);
    
    fetch('https://whispering-dawn-49492.herokuapp.com/imageurl', {
          method:'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
               input:input
            })
        })
        .then(response => response.json())
    .then(response =>{ 
      if(response){
        fetch('https://whispering-dawn-49492.herokuapp.com/image', {
          method:'put',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
               id:user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          setUser(Object.assign(user, {entries: count}))
        })
      }
      displayBox(calculateLocation(response))
    })
    .catch(err => console.log(err));
    
  }
  const routeChange = (route) => {
    if(route === 'signout'){
      setSignIn(false);
    }else if(route === 'home'){
      setSignIn(true);
    }
    setRoute(route);

  } 
  return (
    <div className="App">
         <Particles
         className='particles'
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
       
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }}
    />
       
        <Navigation checkSign = {signin} rout = {routeChange} />
        { route === 'home' 
        ? <div>
            <Logo/>
            <Rank name = {user.name} entries = {user.entries}/>
            <ImageLinkForm InputChange = {OnInputChange} button = {onSubmit}/>
            <FaceRecognition boxFace = {box} imgUrl = {img}/>
          </div>
        : (
          route === 'signin'
          ? <SignIn loadUser = {loadUser} onRouteChange = {routeChange}/> 
          : <Register loadUser = {loadUser} onRouteChange = {routeChange}/> 
        )
        }
    </div>
  );
}

export default App;
