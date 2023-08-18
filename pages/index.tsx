import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Character {
  _id: string;
  name: string;
  dateOfBirth: string;
  // Add other properties as needed
}

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://hp-api.onrender.com/api/characters');
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };
    fetchCharacters();
  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Search by name"
        className="w-full p-2 border rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredCharacters.map((character) => (
        <div key={character._id} className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">{character.name}</h2>
          <p>Date of Birth: {character.dateOfBirth}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
