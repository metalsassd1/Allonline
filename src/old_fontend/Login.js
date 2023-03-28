/*ชินวัตร บูรพา*/ 
import "./CSS/Login.css";
import { useState, useEffect} from "react";
import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
import { Link } from "react-router-dom";
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script";
import FacebookLogin from 'react-facebook-login';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
  const clientID = "104307352529-na572bo9111puq6e9it30h7tqt0o2q68.apps.googleusercontent.com"

  useEffect(() =>{
    function start () {
      gapi.client.init({
        clientID: clientID,
        scope: ""
      })
    }
    gapi.load("client:auth2",start)
  }, [])
  
  const onSuccess = (res) =>{
    window.location = "/"
  }


  const onFailure = (res) =>{
    console.log('Failed',res);
  }

  
  const responseFacebook = (res) =>{
    console.log("login result",res  )
    window.location = "/"
  }
  const componentClicked = (data) =>{
    console.warn(data);
  }
  const [inputs, setInputs] = useState({});
  // const MySwal = withReactContent(Swal)
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Email: inputs.Email,
      Password: inputs.Password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok'){
          localStorage.setItem('token', result.token)
          Swal.fire({
            title: 'Login Success',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(https://sweetalert2.github.io/#examplesimages/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://media.tenor.com/7Hu7qzFdgxQAAAAi/okay.gif")
              top
              no-repeat
            `
          })
          setTimeout(function () {
            window.location = "/"        
          },2000)
      }else{
        Swal.fire({
          title: 'Invalid Email or Password',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(https://sweetalert2.github.io/#examplesimages/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://media.tenor.com/lCs1cxTz2ywAAAAi/chibi-anime.gif")
            top
            no-repeat
          `
        })
      }
    })
      .catch((error) => console.log("error", error));
    
      console.log(inputs);
  };

  return (
    <div className="container1">
      <div className="Heading">เข้าสู่ระบบ</div>
      <div className="form-headline"></div>
    <form onSubmit={handleSubmit}>
      <div className="Input-Email">
      <label>
        <input className="input-email-form"
          type="email"
          name="Email"
          value={inputs.Email || ""}
          onChange={handleChange}
          placeholder="อีเมล"
        />
      </label>
      </div>
      <div className="Input-Password">
      <label>
        <input className="input-password-form"
          type="password"
          name="Password"
          value={inputs.Password || ""}
          onChange={handleChange}
          placeholder="รหัสผ่าน"
        />
      </label>
      </div>
      <div className="button">
        <Link to='/Register'>
      <button className="signUp" type="submit">Register</button>
      </Link>
      <input className="signIn" type="submit" />
      </div>
    </form>
    <br/>
    <div className="Heading2">หรือ</div>
    <div className="form-headline"></div>
<div>
  <div className="admin">
      <Link to='/Logins'>
      <button className="ADMIN" type="submit">ADMIN</button>
      </Link>
      </div>
            <GoogleLogin
            clientId={clientID}
            render={(renderProps)=>(
                  <button  onClick={renderProps.onClick} 
                  disabled={renderProps.disabled} 
                  className="google" ><GoogleIcon/> &nbsp; Login with Google</button>
                  )}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            // isSignedIn={true} 

            //  
            />
      </div>

            <FacebookLogin 
            
            appId="1562050147948713"
            // autoLoad={true}
            fields="name,email,picture"
            textButton={
              <div className="textfacebook">
              <FacebookOutlinedIcon  />&nbsp;
              Login with Facebook
              </div>
            }
            onClick={componentClicked}
            callback={responseFacebook}
            cssClass="facebook"
            />
    </div>
    
  );
}

export default Login;
