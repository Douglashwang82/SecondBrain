import React from 'react'
import PropTypes from 'prop-types'

type Props = {
    name?: string | null,
    number?: string | null,
}

const TitleArea = ({name, number}: Props) => {
  return (
    <>
    {number==="" && name === "" ?
      <h1>Loading Pokemon....</h1>
      :
      number==="" ?
      <h1>Error :( <span style={{"fontSize":"25px"}}>(xxx)</span></h1>
      :
      <h1>{name} <span style={{"fontSize":"25px"}}>({number})</span></h1>
  }
  </>
  )
}



export default TitleArea