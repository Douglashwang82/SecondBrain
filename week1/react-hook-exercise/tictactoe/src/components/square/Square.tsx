import React from 'react'
import {
    MyBtn
} from './SquareElements';

type Props = {
    content: string,
    handleClick:any
}

export default function Square({content, handleClick}: Props) {
  return (
    <>
        <MyBtn onClick={handleClick} disabled={content !== "\xa0" ? true: false}>{content}</MyBtn>
    </>
  )
}