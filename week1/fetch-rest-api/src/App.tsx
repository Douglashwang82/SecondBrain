import React, { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
type Joke = {
  setup: string,
  delivery: string,
}

function App() {
  const [data, setData] = useState<string>("");
  const [status, setStatus] = useState("default");
  const [error, setError] = useState("");
  const fetchJoke = async () => {
    console.log("isloading");
    setStatus("loading");
    setError("");
    try {
      const response = await axios.get("https://v2.jokeapi.dev/joke/Programming?type=single");
      // const response = await axios.get("hhh");
      setData(response.data.joke);
      setStatus("success");
      console.log(response);
    } catch (errors) {   // unknown type
      if (axios.isAxiosError(errors)) {
        console.log("error message: " + errors.message)
        setError(errors.message);
      }
      setStatus("error");
    }
  }


  return (
    <div className="App">
      {
        (status === "loading") ?
          (
            <div className="loading">
              <div className="spinner">
                <CircularProgress></CircularProgress>
              </div>
              <div className="mybutton">
                <button onClick={fetchJoke}>Get a joke!</button>
                <button onClick={() => setStatus("default")}>Reset</button>
              </div>
            </div>
          ) :
          (status === "success") ?
            (
              <div className="success">
                <h2>{data}</h2>
                <div className="mybutton">
                  <button onClick={fetchJoke}>Get a joke!</button>
                  <button onClick={() => setStatus("default")}>Reset</button>
                </div>
              </div>
            ) :
            (status === "error") ?
              (
                <div className="error">
                  <h2>Error: {error}</h2>
                  <div className="mybutton">
                    <button onClick={fetchJoke}>Get a joke!</button>
                    <button onClick={() => setStatus("default")}>Reset</button>
                  </div>
                </div>
              ) :
              <div className="default">
                <h2>Programing Joke Delivery!</h2>
                <div className="mybutton">
                  <button onClick={fetchJoke}>Get a joke!</button>
                </div>
              </div>
      }
    </div>
  );
}

export default App;
