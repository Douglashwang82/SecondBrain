import React, { ReactElement } from 'react'
import Square from '../square/Square';
import {
    BoardFrame,
    Row
} from "./BoardElements";

type Props = {
    currBoard: string[],
    handleClick(event: React.MouseEvent<HTMLButtonElement>, index: number): void,
}

export default function Board({ currBoard, handleClick }: Props) {
    const renderSquare = (generateIndex: number): ReactElement => {
        return (
            <Square
                content={currBoard[generateIndex]}
                handleClick={(event: any, index: number) => handleClick(event, generateIndex)}
            />
        )
    };

    return (
        <>
            <BoardFrame>
                <Row>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </Row>
                <Row>
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </Row>
                <Row>
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </Row>
            </BoardFrame>
        </>
    )
}