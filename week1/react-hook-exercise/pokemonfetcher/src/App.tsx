import React, { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { GetPokemon } from './components/getPokemon/GetPokemon';
import { MyButton, MyInput } from './components/searchBar/SearchBarElements';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { MyFrame } from './components/getPokemon/GetPokemonElements';
import TitleArea from './components/titleArea/TitleArea';
import ImgArea from './components/imgArea/ImgArea';
import InfoArea from './components/infoArea/InfoArea';
import SearchBar from './components/searchBar/SearchBar';

// variables
const endpoint = "http://localhost:5000";

const GET_POKEMON_QUERY = `
    query Pokemon($name: String!){
        pokemon(name: $name) {
        id
        number
        name
        image
        attacks {
            special {
            name
            type
            damage
            }
        }
        }
    }`;

    
interface DataState {
  name: string;
  number: string;
  image: string;
  attacks: Attacks;
  handleRest?: any;
}

const initialSpecial: Attack = {
  name: "-",
  type: "-",
  damage: "-"
}
const initialAttacks: Attacks = {
  special: [initialSpecial]

}
const initialState: DataState = {
  name: "No Pokemon Yet!",
  number: "xxx",
  image: "",
  attacks: initialAttacks,
}
const ErrorState: DataState = {
  name: "Error! :(",
  number: "",
  image: "error",
  attacks: initialAttacks,
}
const LoadingState: DataState = {
  name: "Loading",
  number: "xxx",
  image: "",
  attacks: initialAttacks,
}


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

const handleTarget = () => {
    setTarget(userInput);
}

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary handleReset={handleDefault} handleTarget={handleTarget} handleOnChange={setUserInput}>
          <>
            <SearchBar handleOnClick={setTarget}></SearchBar>
            <GetPokemon target={target} handleReset={handleDefault} ></GetPokemon>
          </>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}

export default App;


function usePost<PokymonAxiosResponse, Error>(target: string) {
  return useQuery<PokymonAxiosResponse, Error>(
      ["Pokemon", target],
      async () => {
          const { data } = await axios.post(endpoint, {
              query: GET_POKEMON_QUERY,
              variables: { name: target },
          })
          return data;
      },
      {
          enabled: !!target,          // This stops initial calling api. 
      }
  );
}
