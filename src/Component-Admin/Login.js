import "./Login.css";
import { useState, useEffect} from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {gapi} from "gapi-script";


function Logins() {
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
  
  const [inputs, setInputs] = useState({});
  const MySwal = withReactContent(Swal)
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
          MySwal.fire({
            title: <strong>Good job!</strong>,
            html: <h3>LOGIN SUCCESS</h3>,
            icon: 'success',
        })
          setTimeout(function () {
            window.location = "/Products"        
          },2000)
      }else{
        MySwal.fire({
          title: <strong>BAD WAY</strong>,
          html: <h2>LOGIN FAILED</h2>,
          icon: 'error'
        })
      }
    })
      .catch((error) => console.log("error", error));
    
      console.log(inputs);
  };

  return (
    <div className="container2">
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
      <input className="signIn" type="submit" />
      </div>
    </form>      
    </div>
    
  );
}

export default Logins;
