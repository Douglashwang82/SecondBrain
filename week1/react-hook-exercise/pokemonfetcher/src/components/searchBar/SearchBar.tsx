import React, { useState } from 'react'
import { MyInput, Container, MyButton } from './SearchBarElements'

type Props = {
  handleOnClick: any,
}

const SearchBar = ({ handleOnClick}: Props) => {
  const [userInput, setUserInput] = useState<string>("");
  return (
    <Container>
        <MyInput placeholder='Which pokemon?' onChange={(e) => setUserInput(e.target.value)}></MyInput>
        <MyButton onClick={() => handleOnClick(userInput)}>Fetch</MyButton>
    </Container>
  )
}

export default SearchBar