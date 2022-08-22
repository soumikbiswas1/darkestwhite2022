import '../App.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import {useState} from 'react';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { toast, ToastContainer } from 'react-toastify';

const token_key = "USER_TOKEN";

const user_id = "USER_ID";

function Userlogin(){   
   
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  const [url, setUrl] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const responseGoogle = (response) => {
    console.log(response);
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    setLoginStatus(true);
  };
  const logout = () => {
    console.log("logout");
    setLoginStatus(false);
  };
      const [username, setUserName] = useState("");
      const [password, setPassword] = useState("");
      const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
          .post(`http://localhost:5000/user/login`, {
            
            username: username,
            password: password,
          })
          .then((res) => {
            
             
             const token = res.data.token;
             const user_id = res.data.user[0]._id;
              console.log(res.data);
             setToken(token);
             setId(user_id);
             toast("logged in");
             window.location = "/";
              
          })
          .catch((err) => console.log(err));
      };

      const setToken = (token) => {
        window.localStorage.setItem(token_key, token);
      };

    
     const getToken = () => {
        let token = window.localStorage.getItem(token_key);
        if (!!token) return token;
        return false;
      };
      const setId = (id) => {
        window.localStorage.setItem(user_id, id);
      };
    return (
      <div className="container-login">
        <div className="container-wrapper-login">
          <h3 className="login-text">
            <i className="bi bi-person-circle ac-logo" />
            Login
          </h3>
          <form className="form-login">
            <div className="item-login">
              <input
                className="input"
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                style={{
                  height: "auto",
                }}
                value={username}
              />
            </div>
            <div className="item-login">
              <input
                className="input"
                type="password"
                placeholder="Password"
                style={{
                  height: "auto",
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />{" "}
            </div>
            <span className="remember">
              {" "}
              <a href="#">Forgot Password?</a>{" "}
            </span>
            <div className="item submit">
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
              <ToastContainer/>
            </div>
          </form>
          <h2 className="or">OR</h2>
          <div className="social-media">
            {!loginStatus && (
              <GoogleLogin
                clientId="729111369321-ccjfl5jdeqpiekfl0mots534folvdmnu.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
                uxMode="redirect"
                redirectUri="http://localhost:3000/"
              />
            )}

            {loginStatus && (
              <div>
                <GoogleLogout
                  clientId="729111369321-ccjfl5jdeqpiekfl0mots534folvdmnu.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess={logout}
                />
              </div>
            )}
          </div>
          <span className="ac">
            Don't have an Account? {}
            <Link to="/signup">SignUp</Link>
          </span>
        </div>
      </div>
    );
}


export default Userlogin;