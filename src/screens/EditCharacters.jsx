import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCharacter, getCharacter } from '../services/characters';

export default function EditCharacter() {
  const [character, setCharacter] = useState({
    name: '',
    house: '',
    gender: '',
    hairColor: '',
  });

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetchCharacter();
  }, []);

  async function fetchCharacter() {
    const oneCharacter = await getCharacter(id);
    setCharacter(oneCharacter);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCharacter(id, character);
    navigate(`/characters/${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <h1>Edit the character!</h1>
      <form className='create-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder="Edit your character's name"
          name='name'
          value={character.name}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Edit house'
          name='house'
          value={character.house}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Gender'
          name='gender'
          value={character.gender}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Edit haircolor'
          name='hairColor'
          value={character.hairColor}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
