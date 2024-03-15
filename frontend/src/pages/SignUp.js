import { AuthContext } from "../App.js";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GeneralConst from "../resources/General.js"
import "../style.css";

const SignUp = () =>{
  const context = useContext(AuthContext);

  const [form, setForm] = useState({
    username:"",
    password:"",
    email:""
  });

  const updateForm = (e)  =>{
    setForm(previousState =>{
      return { 
        ...previousState,
        [e.target.name]:e.target.value
      }
    });
  }

  return(
    <div className="login-container-bg">
      <div className="login-container">
        <div>
          <h2>{GeneralConst.SIGNUP_TOBE_MEMBER}</h2>
          {context.isErrorInput && (
            <p className="wrong-username-password">{GeneralConst.SIGNUP_WRONG_INPUT}</p>
          )}
          <label htmlFor="title">{GeneralConst.USERNAME}</label><br />
          <input 
            type="text"
            name="username"
            onChange={(e)=>{updateForm(e)}}
          /><br />
          <label htmlFor="title">{GeneralConst.PASSWORD}</label><br />
          <input 
            type="password"
            name="password"
            onChange={(e)=>{updateForm(e)}}
          /><br />
          <label htmlFor="title">{GeneralConst.EMAIL}</label><br />
          <input 
            type="email"
            name="email"
            onChange={(e)=>{updateForm(e)}}
          /><br />
          <button
          className="btn-cust btn-signup btn-login-signup-first-child"
            onClick={
              ()=>context.handleSubmitSignUp(
                form.username, 
                form.password, 
                form.email
              )
            }
          >
            {GeneralConst.SUBMIT}
          </button>
          <Link to="/login">
            <button 
              className="btn-cust btn-login"
            >
              {GeneralConst.BACKTOLOGIN}
            </button>
          </Link>
        </div>
      </div>      
    </div>
  )
}
  
export default SignUp