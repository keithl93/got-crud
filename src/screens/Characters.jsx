import { useState, useEffect } from 'react';
import {
  getCharacters,
  updateCharacter,
  deleteCharacter,
} from '../services/characters';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState({});
  const [gifs, setGifs] = useState([]);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [toggle, setToggle] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const results = await getCharacters();
      setCharacters(results);
    };
    fetchData();
  }, [toggle]);

  // const handleUpdate = () => {
  //   setEditing(true);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCharacter(character._id, character);
    setShow(false);
    setEditing(false);
    setToggle((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleClick(char) {
    setCharacter(char);
    fetchGifs(char.name);
    setShow(true);
  }

  async function fetchGifs(name) {
    let results = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${name}&limit=20&offset=0&lang=en&bundle=messaging_non_clips`
    );
    setGifs(results.data.data);
  }

  async function handleDelete() {
    const confirmMessage = window.confirm('Are you sure???');

    if (confirmMessage) {
      await deleteCharacter(character._id);
      setShow(false);
      setToggle((prev) => !prev);
    }
  }

  return (
    <>
      <div className='background'>
        <ul className='character-list'>
          {characters.map((character) => (
            <li
              key={character._id}
              className='character-item'
              onClick={() => handleClick(character)}
            >
              <p className='name-font'>{character.name}</p>
            </li>
          ))}
        </ul>
      </div>

      {show && (
        <div className='modal-container'>
          <div className='modal'>
            {editing ? (
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
                <button className='save-button' type='submit'>
                  Save
                </button>
                <button
                  className='cancel-button'
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h1 className='modal-font modal-h1'>{character.name}</h1>
                <p className='modal-font'>House: {character.house}</p>
                <p className='modal-font'>Gender: {character.gender}</p>
                <p className='modal-font'>Hair Color: {character.hairColor}</p>
                <div className='gifs-container'>
                  {gifs.map((gif) => (
                    <img
                      src={gif.images.fixed_height.url}
                      alt={gif.title}
                      key={gif.id}
                    />
                  ))}
                </div>
                <button
                  className='edit-button'
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
                <button className='delete-button' onClick={handleDelete}>
                  Delete
                </button>
                <button className='close-button' onClick={() => setShow(false)}>
                  X
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
