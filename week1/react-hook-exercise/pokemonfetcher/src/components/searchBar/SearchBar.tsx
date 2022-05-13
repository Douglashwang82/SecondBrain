import React, { useState } from 'react'
import { MyInput, Container, MyButton } from './SearchBarElements'

type Props = {
  handleOnClick: any,
  target :string,
}

const SearchBar = ({ handleOnClick, target }: Props) => {
  const [userInput, setUserInput] = useState<string>(target);
  return (
    <Container>
        <MyInput placeholder='Which pokemon?' onChange={(e) => setUserInput(e.target.value)}></MyInput>
        <MyButton onClick={() => handleOnClick(userInput)}>Fetch</MyButton>
    </Container>
  )
}

export default SearchBar