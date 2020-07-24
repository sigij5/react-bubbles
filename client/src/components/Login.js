import React, {useState} from "react";
import axios from 'axios'


const initialCredentials = {
  username: '',
  password: '',
}

const Login = props => {
  const [credentials, setCredentials] = useState(initialCredentials)

  // make a post request to retrieve a token from the api
    const handleChanges = e => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
      });
    }

    const login = e => {
      e.preventDefault();
      axios
        .post("http://localhost:5000/api/login", {username: `${credentials.username}`, password: `${credentials.password}`})
        .then(res => {
          localStorage.setItem('token', res.data.payload)
          props.history.push('/bubble-page')
        })
        .catch(err => console.log(err))
    }
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input 
          type='text'
          placeholder='Username'
          name='username'
          value={credentials.username}
          onChange={handleChanges}
        />
        <input 
          type='text'
          placeholder='Password'
          name='password'
          value={credentials.password}
          onChange={handleChanges}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
