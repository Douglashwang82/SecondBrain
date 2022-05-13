import React, { useEffect, useState } from 'react';
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { GetPokemon } from './components/getPokemon/GetPokemon';
import { MyButton, MyInput } from './components/searchBar/SearchBarElements';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

interface Attack {
  name: string;
  type: string;
  damage: string;
}

interface Attacks {
  special: Attack[]
}
interface DataState {
  name: string;
  number: string;
  image: string;
  attacks: Attacks;
}


// Create a client
const queryClient = new QueryClient()

function App() {
  const [target, setTarget] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [data, setData] = useState<DataState>({name:"",number:"",image:"",attacks:{special:[{name:"-",type:"-",damage:"-"}]}})

  /*
    Back to Default.
  */
  const handleDefault = () => {
    setTarget("");
    setUserInput("");
  }


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MyInput placeholder='Which pokemon?' onChange={(e) => setUserInput(e.target.value)} value={userInput}></MyInput>
        <MyButton onClick={() => setTarget(userInput)}>Fetch</MyButton>
        <ErrorBoundary handleReset={handleDefault}>
          <>
            <GetPokemon target={target} handleReset={handleDefault} ></GetPokemon>
          </>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}

export default App;
