import React from 'react'
import { connect } from 'react-redux'
import { removeCharacterAction, addFavoritesAction } from '../../redux/charsDuck'
import Card from '../../components/card/Card'
import styles from './home.module.css'

const Home = ({ chars, removeCharacterAction, addFavoritesAction }) => {
  const nextCharacter = () => removeCharacterAction()
  const addFav = () => addFavoritesAction()

  const renderCharacter = () => {
    let char = chars[0]
    return (
      <Card 
        leftClick={nextCharacter} {...char} 
        rightClick={addFav}
      />
    )
  }

  return (
    <div className={styles.container}>
      <h2>Personajes de Rick y Morty</h2>
      <div>{renderCharacter()}</div>
    </div>
  )
}

const mapState = state => {
  return {
    chars: state.characters.charsArray
  }
}

export default connect(mapState, {
  removeCharacterAction, addFavoritesAction
})(Home)
