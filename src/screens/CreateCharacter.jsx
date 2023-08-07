import { createCharacter } from '../services/characters';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixCanvas from '../components/MatrixCanvas';

export default function CreateCharacter() {
  const [character, setCharacter] = useState({
    name: '',
    house: '',
    gender: '',
    hairColor: '',
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCharacter(character);
    navigate('/characters');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCharacter((prevCharacters) => ({
      ...prevCharacters,
      [name]: value,
    }));
  };
  return (
    <>
      <canvas id='canvas' />
      <div className='create-character-container'>
        <form className='create-form' onSubmit={handleSubmit}>
          <input
            className='input'
            type='text'
            placeholder='Name'
            name='name'
            value={character.name}
            onChange={handleChange}
          />
          <input
            className='input'
            type='text'
            placeholder='House'
            name='house'
            value={character.house}
            onChange={handleChange}
          />
          <input
            className='input'
            type='text'
            placeholder='Gender'
            name='gender'
            value={character.gender}
            onChange={handleChange}
          />
          <input
            className='input'
            type='text'
            placeholder='Haircolor'
            name='hairColor'
            value={character.hairColor}
            onChange={handleChange}
          />

          <button type='submit'>Create Character</button>
        </form>
      </div>
      <MatrixCanvas />
    </>
  );
}
