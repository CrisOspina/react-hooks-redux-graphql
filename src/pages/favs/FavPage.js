import React from 'react'
import { connect } from 'react-redux'
import styles from './favs.module.css'
import Card from '../../components/card/Card'

function FavPage({ 
  favs = [0] 
}) {

  function renderCharacter(char, i) {
    return (
      <Card 
        {...char} 
        key={i} 
        hide
      />
    )
  }

  return (
    <div className={styles.container}>
      <h2>Favoritos</h2>
      {favs.map(renderCharacter)}
      {!favs.length && <h3>No hay personajes agregados</h3>}
    </div>
  )
}

function mapStateToProps({ characters }){
  return {
    favs: characters.favorites
  }
}

export default connect(mapStateToProps)(FavPage)