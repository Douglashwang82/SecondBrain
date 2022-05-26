import React, { useState, useReducer, Reducer } from 'react';
import './App.css';

// const 
const MOCK_LIST = [
  {
    content: "content1"
  },
  {
    content: "content2"
  },
  {
    content: "content3"
  },
  {
    content: "content4"
  },
  {
    content: "content5"
  }
]

type ActionTypes = {
  toggle:string,
  reset:string,
  resetAtLeastOne: string,
}
const actionTypes:ActionTypes = {
  toggle: "Toggle",
  reset: "Reset",
  resetAtLeastOne: "ResetAtLeastOne",
}

type Action = {
  targetId: number,
  type: string,
}

type AccordState = {
  openedIds: number[],
}

type AccordBtnProp = {
  targetId: number,
  handleOnClick: any,
}

type AccordPanelProp = {
  children: JSX.Element,
}

type useAccordProp = {
  reducers:any,
}

//Reducer
function defaultReducer(state: AccordState, action: Action): AccordState {
  switch (action.type) {
    case actionTypes.toggle: {
      if (state.openedIds.includes(action.targetId)) {
        const newOpendIds = state.openedIds.filter((content) => {return content != action.targetId});
        return {...state, openedIds: newOpendIds,}
      } else {
        return {...state,openedIds: [...state.openedIds, action.targetId]}
      }
    }
    case actionTypes.reset: {
      return {...state, openedIds:[]}
    }
    case actionTypes.resetAtLeastOne: {
      return {...state, openedIds:[action.targetId]} 
    }
    default:{
      throw new Error("unexpected type");
    }
  }
}

function atLeastOneReducer(state: AccordState, action: Action): AccordState | null{
  if (action.type == actionTypes.toggle && state.openedIds.length == 1 && state.openedIds[0] == action.targetId) {
    return state; 
  }
  return null;
}

function onlyOneReducer(state: AccordState, action:Action):AccordState | null {
  if (action.type == actionTypes.toggle) {
    if (state.openedIds.length == 1 && state.openedIds.includes(action.targetId)) {
    return {...state, openedIds:[]};  
  }
  return {...state, openedIds:[action.targetId]};  
}
return null;
}

// custom hook
function useAccord({reducers}:useAccordProp){
  const customReducers = (state:AccordState, action:Action) => {
    for(const reducer of reducers){
      const result = reducer(state, action)
      if (result) return result;
    }
  }
  const [openState, dispatch] = useReducer(customReducers, { openedIds: [] });
  const togglePanelId = (panelId: number) => dispatch({type: actionTypes.toggle, targetId: panelId })
  const resetPanelId = () => dispatch({type:actionTypes.reset, targetId:0});
  const resetPanelIdAtLeastOne = () => dispatch({type:actionTypes.resetAtLeastOne,targetId:0});
  
  return {openState, togglePanelId, resetPanelId, resetPanelIdAtLeastOne};
}



// components
type AccordProp = {
}

const Accord = ({}: AccordProp) => {
  let reducers: {(state:AccordState, action:Action):AccordState | null}[] = [defaultReducer];
  const [onlyOnePanelOpen, setOnlyOnePanelOpen] = useState<boolean>(false);
  const [atLeastOnePanelOpen, setAtLeastonePanelOpen]  = useState<boolean>(false);
  if (onlyOnePanelOpen) reducers = [onlyOneReducer, ...reducers];
  if (atLeastOnePanelOpen) reducers = [atLeastOneReducer, ... reducers];
  const {openState, togglePanelId, resetPanelId, resetPanelIdAtLeastOne} = useAccord({reducers});

  const handleOnlyOne = () => {
    setOnlyOnePanelOpen(!onlyOnePanelOpen);
    if (atLeastOnePanelOpen){
      resetPanelIdAtLeastOne();
    } else {
      resetPanelId();
    }
  }

  const handleAtLeastOne = () => {
    const newValue = !atLeastOnePanelOpen;
    setAtLeastonePanelOpen(newValue);
    if (newValue){
      resetPanelIdAtLeastOne();
    } else {
      resetPanelId();
    }
    
  }

  return (
    <>
    <button onClick={handleOnlyOne}>Only One: <span>{`${onlyOnePanelOpen}`}</span></button>
    <br></br>
    <button onClick={handleAtLeastOne}>At Least One: <span>{`${atLeastOnePanelOpen}`}</span></button>
    <p></p>  
    {
      MOCK_LIST.map((content, key) => {
        return (
          <AccordItem key={key}>
            <AccordBtn targetId={key} handleOnClick={togglePanelId} />
            {openState.openedIds.includes(key) ?
              <AccordPanel>
                <span>{content.content}</span>
              </AccordPanel>
              : null
            }
          </AccordItem>
        );
      })}
  </>
  );
}


type AccordItemProp = {
  children: React.ReactNode | React.ReactNode[],
}

const AccordItem = ({ children }: AccordItemProp) => {
  return (
    <div>
      {children}
    </div>
  );
}

const AccordBtn = ({ targetId, handleOnClick }: AccordBtnProp) => {
  return (
    <>
      <button onClick={() => handleOnClick(targetId)}>Click</button>
    </>
  );
}

const AccordPanel = ({ children }: AccordPanelProp) => {
  return (
    <>
      {children}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Accord />
    </div>
  );
}

export default App;
