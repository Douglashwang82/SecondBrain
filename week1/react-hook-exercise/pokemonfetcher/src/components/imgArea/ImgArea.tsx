import React from 'react'
import {
  ImgFrame,
  MyImg,
  NoPokemonFrame,

} from "./ImgAreaElements";
type Props = {
  imgSrc?: string,
  name:string,
  handleRest?:any,
}

const ImgArea = ({ imgSrc, name, handleRest }: Props) => {

  return (
    <>
      <ImgFrame>
        {imgSrc && imgSrc !== "error" ?
          <MyImg src={imgSrc}></MyImg> :
          imgSrc === "error" ?
            <NoPokemonFrame>
              <p>The pokemon "{name}" is not in the database.</p>
              <button onClick={handleRest}>Try Again</button>
              <p>This error was caught by the error boundary!</p>
              </NoPokemonFrame>
            :
            <NoPokemonFrame><p>Please Submit a Pokemon!</p></NoPokemonFrame>
        }
      </ImgFrame>

    </>
  )
}

export default ImgArea