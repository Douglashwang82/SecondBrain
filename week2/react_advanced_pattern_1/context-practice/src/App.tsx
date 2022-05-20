import React, {
  ChangeEventHandler,
  createContext,
  FormEvent,
  useContext,
  useEffect,
  useReducer,
  useState,

} from 'react';
import './App.css';

// types
type User = {
  userid: string,
  username: string,
  userbio: string,
}
type UserState = {
  user: User,
  preuser: User,
  status: "PENDING" | "RESOLVED" | "REJECTED" | null,
  error: any // temporary
}

type Action = {
  type: 'START_UPDATE' | 'FINISH_UPDATE' | 'FAIL_UPDATE' | 'RESET',
  newUser: User,
  error: any // temporary
}

type Dispatch = (action: Action) => void;


// context initial
const UserStateContext = createContext<{ state: UserState; dispatch: Dispatch } | undefined>(undefined);

function userReducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case "START_UPDATE": {
      console.log("start");
      return {
        ...state,
        user: { ...state.user, ...action.newUser },
        preuser: state.user,
        status: "PENDING",
      };
    }
    case "FINISH_UPDATE": {
      console.log("finish");
      return {
        user: action.newUser,
        preuser: state.user,
        status: "RESOLVED",
        error: null,
      };
    }
    case "FAIL_UPDATE": {
      console.log("fail");
      return {
        user: state.preuser, // temporary
        preuser: state.user,
        status: "REJECTED",
        error: action.error,

      };
    }
    case "RESET": {
      console.log("reset");
      return {
        ...state,
        status: null,
        error: null,
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const defaultUser = {
  userid: "0",
  username: "robin",
  userbio: "tatata",
} as User;

function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, { user: defaultUser, preuser: defaultUser, status: null, error: null });
  const value = { state, dispatch }
  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  )
}


function useUser() {
  const context = useContext(UserStateContext);
  if (context == undefined) {
    throw new Error("useCount must be used within a UserProvider.");
  }
  return context;
}


async function updateUser(dispatch: Dispatch, currentUser: User, newUser: User) {
  dispatch({ type: "START_UPDATE", newUser: currentUser, error: null })

  try {
    // fetching here
    // fake data first

    // random error;
    const randNumber = Math.floor(Math.random() * 10);
    if (randNumber <= 5) throw new Error("error on purpose");
    dispatch({ type: "FINISH_UPDATE", newUser: newUser, error: null })

  } catch (error) {
    dispatch({ type: "FAIL_UPDATE", newUser: currentUser, error: error })
  }
}

function Form() {
  const { state, dispatch } = useUser();
  const [formState, setFormState] = useState<User>(defaultUser);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    updateUser(dispatch, state.user, formState);
    console.log("submited");
  }

  useEffect(() => {
    console.log("curr user: ")
    console.log(state.user);
  }, [state]
  );

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>User ID:</label>
        <input name="userid" type="text" onChange={(e) => handleFormChange(e)} disabled value={0}></input>

        <label>User Name:</label>
        <input name="username" type="text" onChange={(e) => handleFormChange(e)} value={formState.username}></input>

        <label>User Biography:</label>
        <input name="userbio" type="textarea" onChange={(e) => handleFormChange(e)} value={formState.userbio}></input>
        <button onClick={() => {
          setFormState(state.user)
          dispatch({
            type: "RESET",
            newUser: state.user,
            error: null,
          })
        }}>reset</button>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

type AvatarCreator = {
  seed: string,
}
function AvatarCreator() {
  const { state } = useUser();
  const seed = state.user.username + state.user.userbio;
  return (
    <div style={{"margin":"auto", "display": "grid", "gridTemplateColumns": "auto auto","width":"10%"}}>
      <div>
        <img src={`https://avatars.dicebear.com/api/male/:${seed}.svg`} style={{ "width": "100px", "height": "100px", "margin": "auto" }}></img>
      </div>
      <div style={{ "display": "grid" }}>
        <label>User Name: {state.user.username}</label>
        <label>User Bio: {state.user.userbio}</label>
        <label>User ID: {state.user.userid}</label>
      </div>
    </div>

  )
}
function App() {
  return (
    <div className="App">
      <h1>Context Module Functions</h1>
      <UserProvider>
        <Form />
        <AvatarCreator />
      </UserProvider>
    </div>
  );
}

export default App;
