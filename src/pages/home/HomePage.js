import React from 'react';
import { connect } from 'react-redux';
import { removeCharacterAction } from '../../redux/charsDuck';
import Card from '../../components/card/Card';
import styles from './home.module.css';

const Home = ({ chars, removeCharacterAction }) => {
  const renderCharacter = () => {
    let char = chars[0];
    return <Card leftClick={nextCharacter} {...char} />;
  };

  const nextCharacter = () => removeCharacterAction();

  return (
    <div className={styles.container}>
      <h2>Personajes de Rick y Morty</h2>
      <div>{renderCharacter()}</div>
    </div>
  );
};

const mapState = state => {
  return {
    chars: state.characters.charsArray
  };
};

export default connect(mapState, {
  removeCharacterAction
})(Home);
