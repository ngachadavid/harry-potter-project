import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Character {
  id: string;
  name: string;
  house: string;
  dateOfBirth: string;
  wand: {
    wood: string;
    core: string;
    length: number;
  };
  patronus: string;
}

const Home: React.FC = () => {
  // State to store the list of characters
  const [characters, setCharacters] = useState<Character[]>([]);
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch characters from the API when the component mounts
    const fetchCharacters = async () => {
      try {
        // Fetch characters data from the API
        const response = await axios.get('https://hp-api.onrender.com/api/characters');
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };
    // Call the fetchCharacters function
    fetchCharacters();
  }, []);

  // Event handler for handling search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter characters based on the search query
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name"
        className="w-full p-2 mb-4 border rounded"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Render characters */}
        {filteredCharacters.map((character) => (
          <div key={character.id} className="p-4 bg-white rounded shadow">
            <div className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{character.name}</h2>
              <p>House: {character.house}</p>
              <p>Date of Birth: {character.dateOfBirth}</p>
              <p>
                Wand: {character.wand.wood} wood, {character.wand.core}, {character.wand.length}
              </p>
              <p>Patronus: {character.patronus}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
