import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

import Card from '../../components/card/Card'

export default function GraphHome() {
  const [chars, setChars] = useState([])

  let query = gql`
    {
      characters {
        results {
          name
          image
        }
      }
    }
  `
  let {
    data, loading, error
  } = useQuery(query)

  useEffect(() => {
    if(data && !loading && !error){
      setChars([
        ...data.characters.results
      ])
    }
  }, [data])

  function nextCharacter() {
    chars.shift()
    setChars([...chars])
  }
  
  return (
    loading 
    ?
      <h2>Loading...</h2>
    :
      <Card
        leftClick={nextCharacter}
        {...chars[0]}
      />
  )
}