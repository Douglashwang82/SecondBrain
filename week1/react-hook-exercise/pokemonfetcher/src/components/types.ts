import axios, { AxiosResponse } from 'axios';
export {};
declare global {
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
    handleReset?: any,
}

interface PokemonData {
    pokemon: DataState
}

interface PokymonAxiosResponse extends AxiosResponse {
    data: PokemonData;
    errors: Error;
}

}