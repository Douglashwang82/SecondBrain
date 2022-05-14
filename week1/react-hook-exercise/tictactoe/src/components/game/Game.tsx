import React, { useEffect, useState } from 'react'
import Board from '../board/Board';
import cookie from 'react-cookies';
import { GameFrame, ButtonGroup } from './GameElements';
import { caculateWinner } from "./helper/CalculateWinner";

type Props = {}

interface GameState {
    history: string[][],
    currBoard: string[],
    currStep: number,
    isX: boolean,
}

const initialBoard: string[] = Array(9).fill("\xa0"); // to avoid bug with button position. \xa0 representing empty string.
const initialGameState: GameState = {
    history: [initialBoard],
    currBoard: initialBoard,
    currStep: 0,
    isX: true,
};
export default function Game({ }: Props) {
    const [gameState, SetGameState] = useState<GameState>(cookie.load("gamestate") ? cookie.load("gamestate") : initialGameState)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        let newHistory = gameState.history.slice(0, gameState.currStep + 1);
        let newBoard = gameState.currBoard.slice();
        let newIsX = gameState.isX;

        // Check if no need to update the board
        if (gameState.currBoard[index] !== "\xa0" || caculateWinner(gameState.currBoard)) {
            return;
        }

        newBoard[index] = gameState.isX ? "X" : "O";

        SetGameState(
            {
                history: newHistory.concat([newBoard]),
                currBoard: newBoard,
                currStep: newHistory.length + 1,
                isX: !newIsX,
            }
        )

    }


    const jumpTo = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        let newBoard = gameState.history[index];
        let newStep = index;

        SetGameState({
            ...gameState,
            currBoard: newBoard,
            currStep: newStep,
            isX: index % 2 == 1
        })
    }

    // generate steps button
    const moves = gameState.history.map((step, move) => {
        const text = move ? "Step #" + move : "Beginning";
        return (
            <button key={move} onClick={(event: React.MouseEvent<HTMLButtonElement>) => jumpTo(event, move)}>{text}</button>
        )
    })


    const clearBoard = () =>{
        SetGameState(initialGameState);
    }


    useEffect(()=>{
        cookie.save("gamestate", gameState,{});
    })

    return (
        <>
            <GameFrame>
                <h1>TicTacToe</h1>
                <h2>Winner is: {caculateWinner(gameState.currBoard)}</h2>
                <h2>Player: {gameState.isX ? "X" : "O"} turn to move.</h2>
                <button onClick={clearBoard}>Clear Board</button>
                <p></p>
                <Board currBoard={gameState.currBoard} handleClick={handleClick} />
            </GameFrame>
            <ButtonGroup>
                <h3>Steps:</h3>
                {moves}
            </ButtonGroup>
        </>
    )
}
