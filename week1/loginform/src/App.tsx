import React, {useState} from 'react';
import LoginForm from './LoginForm';

type User = {
  name: string,
  email: string,
}
type Details = {
  name:string,
  email:string,
  password:string,
}


function App() {
  const adminUser = {
    email:"admin@admin.com",
    password: "admin123",
  }

  const [user, setUser] = useState<User>({name:"", email:""});
  const [error, setError] = useState<string>("")

  const Login = (details:Details) => {
    console.log(details);
    if(details.email === adminUser.email && details.password === adminUser.password){
      console.log("Logged In");
      setUser({
        name: details.name,
        email: details.email
      })
    } else {
      console.log("Wrong Input");
      setError("Wrong Input");
    }
  }
  const Logout = () => {
    console.log("Logout");
    setUser({name:"", email:""});
  }

  return (
    <div className="App">
    {(user.email != "" ? (
      <div className="welcome">
        <h2>Welcome, <span>{user.name}</span></h2>
        <button onClick={Logout}>Logout</button>
      </div>
      ) : (
        <LoginForm Login={Login} error={error}></LoginForm>
      )
      )}
    </div>
  );
}

export default App;
