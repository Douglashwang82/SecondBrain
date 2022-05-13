import React from 'react'
import axios, { AxiosResponse } from 'axios';
import {
    useQuery,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "react-query";

import ImgArea from '../imgArea/ImgArea';
import TitleArea from '../titleArea/TitleArea';
import InfoArea from '../infoArea/InfoArea';
import {
    MyFrame,
} from './GetPokemonElements';

type Props = {
    target: string,
    handleReset: any,
}

// interfaces
interface PokemonVars {
    name: string;
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
    handleRest?: any;
}

interface PokemonData {
    pokemon: DataState
}

interface PokymonAxiosResponse extends AxiosResponse {
    data: PokemonData;
    errors: Error;
}


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

export const GetPokemon = ({ target, handleReset }: Props) => {
    const { isLoading, status, data, error, isFetching } = usePost<PokymonAxiosResponse, Error>(target);
    if (error) { throw new Error(error.message) };
    if (status === "success" && data.data.pokemon === null){ throw new Error(target)};
    return (
        <>
            {status === "loading" ?
                <GenerateCard {...LoadingState} />
                :
                status === "success" && data.data.pokemon ?
                    <GenerateCard {...data.data.pokemon} />
                    :
                    status === "success" ?
                        <GenerateCard {...ErrorState} name={target} handleRest={handleReset} />
                        :
                        status === "idle" ?
                            <GenerateCard {...initialState} />
                            :
                            <h1>something wrong</h1>
            }
        </>
    )
};


export const GenerateCard = ({ name, number, image, attacks, handleRest, }: DataState) => {
    return (
        <>
            <MyFrame>
                <TitleArea name={name} number={number}></TitleArea>
                <ImgArea imgSrc={image} name={name} handleRest={handleRest}></ImgArea>
                <InfoArea special={attacks.special}></InfoArea>
            </MyFrame>
        </>
    )
}
