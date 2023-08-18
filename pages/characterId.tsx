import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const CharacterDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState<any>({}); // Use 'any' for flexibility

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        if (id) {
          const response = await axios.get(`https://hp-api.onrender.com/api/character/${id}`);
          setCharacter(response.data);
        }
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };
    fetchCharacter();
  }, [id]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold">{character.name || 'Character Name'}</h2>
      {/* Display other character details */}
    </div>
  );
};

export default CharacterDetail;
