import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

const CharacterDetail: React.FC = () => {
  // Get the route parameters using useRouter
  const router = useRouter();
  const { id } = router.query;

  // State to store character data
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    // Fetch character data when the component mounts
    const fetchCharacter = async () => {
      try {
        if (id) {
          console.log('Fetching character details for ID:', id);

          // Fetch character data from the API
          const response = await axios.get(`https://hp-api.onrender.com/api/character/${id}`);
          console.log('API Response:', response.data);

          // Update character state with fetched data
          setCharacter(response.data);
        }
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    // Check if the id is available and fetch the character
    if (id) {
      console.log('Component mounted with ID:', id);
      fetchCharacter();
    }
  }, [id]);

  return (
    <div className="p-4">
      {character ? (
        // Display character details
        <div className="border p-4 rounded-lg shadow-md bg-blue-100">
          <h2 className="text-2xl font-semibold mb-2">{character.name}</h2>
          <p className="text-gray-600 mb-1">House: {character.house}</p>
          <p className="text-gray-600 mb-1">Date of Birth: {character.dateOfBirth}</p>
          <p className="text-gray-600 mb-1">
            Wand: {character.wand.wood} wood {character.wand.core}, {character.wand.length}
          </p>
          <p className="text-gray-600 mb-4">Patronus: {character.patronus}</p>
        </div>
      ) : (
        // Display loading message if character data is not available yet
        <p className="text-center">Loading character details...</p>
      )}
    </div>
  );
};

export default CharacterDetail;
