/*ชินวัตร บูรพา*/ 

import './CSS/Register.css'
import { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function checkPassword(password) {
  // เช็คถ้ารหัสต่ำกว่า8ตัวอักษร
  if (password.length < 8) {
    return {valid: false, message: 'Password must be at least 8 characters long.'};
  }

  // ตรวจสอบว่ารหัสผ่านประกอบด้วยอักษรตัวพิมพ์เล็กอย่างน้อย 1 ตัว ตัวพิมพ์ใหญ่ 1 ตัว และตัวเลข 1 ตัว
  let hasLowercase = false;
  let hasUppercase = false;
  let hasNumber = false;
  for (let i = 0; i < password.length; i++) {
    let character = password.charAt(i);
    
    if (character >= 'a' && character <= 'z') {// เช็คว่ามีตัวอักษรพิมพ์เล็กหรือไม่
      
      hasLowercase = true;// ถ้ามีให้เป็นจริง
      
    } else if (character >= 'A' && character <= 'Z') {// เช็คว่ามีตัวอักษรพิมพ์ใหญ่หรือไม่
      
      hasUppercase = true;// ถ้ามีให้เป็นจริง
      
    } else if (character >= '0' && character <= '9') {// เช็คว่ามีตัวเลขหรือไม่
      
      hasNumber = true;// ถ้ามีให้เป็นจริง
    }
    if (hasLowercase && hasUppercase && hasNumber) { // จากนั้นจะตวรจสอบว่าเงื่อนไขเป็นจริงหรือไม
    break;
    }
  }
  if (!hasLowercase || !hasUppercase || !hasNumber) {//ถ้าเงื่อนไขไม่ครบจะแจ้งเตือนไปยัง user
    return {valid: false, message: 'Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 number.'};
  }

  return {valid: true}; //ถ้าผ่านทุกเงื่อนไขก็เป็นการจบลูป
}


function Register() {
    const [inputs, setInputs] = useState({});
    const MySwal = withReactContent(Swal)   
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const checkPass = checkPassword(inputs.Password);
      if (!checkPass.valid) {
      alert(checkPass.message);
      return;
    }
      
    var raw = JSON.stringify({
        Email: inputs.Email,
        Password: inputs.Password,
      });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3333/register", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'ok'){
            MySwal.fire({
                title: <strong>Good job!</strong>,
                html: <h3>LOGIN SUCCESS</h3>,
                icon: 'success'
            })
            setTimeout(function () {
            window.location = "/Login"
            },2000)
        }else{
            MySwal.fire({
                title: <strong>BAD WAY</strong>,
                html: <h2>มีข้อผิดพลาดเกิดขึ้น</h2>,
                icon: 'error'
            })
        }
    })
      .catch(error => console.log('error', error));
        console.log(inputs)
    }
    return(
        <div className="container1">
        <div className="Heading">สมัครสมาชิก</div>
        <div className="form-headline"></div>
      <form onSubmit={handleSubmit}>
        <div className="Input-Email">
        <label>
          <input className="input-email-form"
            type="email"
            name="Email"
            id='Email'
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
            id='Password'
            value={inputs.Password || ""}
            onChange={handleChange}
            placeholder="รหัสผ่าน"
          /><br/>
          <input className="input-confirmpassword-form"
            type="password"
            name="Password2"
            placeholder="คอมเฟิร์มรหัสผ่าน"
          />
          <br/>
        </label>
        <br/>
        </div>
        <div className="button">
        <input className="signIn"  type="submit" />
        </div>
      </form>
      </div>
    );
  }

export default Register;