import React,{useReducer, useState} from 'react';
import logo from './logo.svg';
import './App.css';

// Types
type UncontrolledState = {
  count:number
}


type ControlledState = {
  count: number,
  previous?: number,
  suggested?: number,
}

type Action = {
  type:string,
}

type SimpleComponentProps = {
  controlledState?: ControlledState,
  handleOnClick?: any,
}

type simpleComponentReducerProps = {
  state:UncontrolledState,
  action: Action,
}

type useSimpleComponentProps = {
  controlledState?: ControlledState,
  handleOnClick?: any,
}

function simpleComponentReducer(state:UncontrolledState, action:Action) {
  switch (action.type) {
    case "onClick": {
      return {
        ...state,
        count: state.count + 1
      }
    }
    default: {
      throw new Error("Unknown action");
    }
  }
}


function useSimpleComponent({controlledState, handleOnClick}:useSimpleComponentProps) {
  const [UncontrolledState, dispatch] = useReducer(simpleComponentReducer, {count:0});
  if (controlledState && handleOnClick) return {controlledState, handleDispatch:handleOnClick}
  return {UncontrolledState, handleDispatch:dispatch};
}

function SimpleComponent({controlledState, handleOnClick}:SimpleComponentProps) {
  const {UncontrolledState, handleDispatch} = useSimpleComponent({controlledState, handleOnClick});
  return (
  <div>
  <button onClick={() => handleDispatch({type:"onClick"})}>Click</button>
  <p>{controlledState? "controlled":"uncontrolled"}</p>
  {controlledState? JSON.stringify(controlledState) : JSON.stringify(UncontrolledState)}
  </div>);
}

function App() {
  const [controlledState , setControlledState] = useState<ControlledState>({count:0});
  return (
    <div className="App">
    <h1>Uncontrolled Component</h1>
    <SimpleComponent/>

    <h1>Controlled Component</h1>
    <SimpleComponent controlledState={controlledState} handleOnClick={setControlledState}/>
    </div>
  );
}

export default App;
