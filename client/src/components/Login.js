import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [loginCred, setLoginCred] = useState({
    credentials: {
      username: "",
      password: "",
    },
  });

  const handleChanges = (e) => {
    setLoginCred({
      credentials: {
        ...loginCred.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  const login = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/login", loginCred.credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);

        props.history.push("/friends");
      })
      .catch((err) => console.log("login axios post err", err));
  };

  return (
    <div>
      <form onSubmit={login}>
        <input
          name="username"
          type="text"
          onChange={handleChanges}
          value={loginCred.credentials.username}
        />
        <input
          name="password"
          type="text"
          onChange={handleChanges}
          value={loginCred.credentials.password}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
