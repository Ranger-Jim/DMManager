import React, { useState } from 'react';
import axios from 'axios';

function Lookup() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search for monsters
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setSelectedMonster(null);

    try {
      const response = await axios.get(
        `https://www.dnd5eapi.co/api/monsters?name=${query}`
      );
      setResults(response.data.results);
    } catch (err) {
      console.error(err);
      setError('Error fetching monsters. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch monster details
  const handleMonsterClick = async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://www.dnd5eapi.co${url}`);
      setSelectedMonster(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching monster details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press inside the input field
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Monster Lookup</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown} // Add the keydown event handler
        placeholder="Enter monster name..."
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button onClick={handleSearch} style={{ padding: '5px' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!selectedMonster && results.length > 0 && (
        <ul style={{ marginTop: '20px' }}>
          {results.map((monster) => (
            <li
              key={monster.index}
              style={{ cursor: 'pointer' }}
              onClick={() => handleMonsterClick(monster.url)}
            >
              <strong>{monster.name}</strong>
            </li>
          ))}
        </ul>
      )}

      {selectedMonster && (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
          <h2>{selectedMonster.name}</h2>

          {selectedMonster.image && (
            <img
              src={`https://www.dnd5eapi.co${selectedMonster.image}`}
              alt={selectedMonster.name}
              style={{ maxWidth: '200px', marginTop: '10px' }}
            />
          )}

          <p><strong>Type:</strong> {selectedMonster.size} {selectedMonster.type} ({selectedMonster.subtype})</p>
          <p><strong>Alignment:</strong> {selectedMonster.alignment}</p>
          <p>
            <strong>Armor Class:</strong>{' '}
            {selectedMonster.armor_class.map(ac => `${ac.value} (${ac.type})`).join(', ')}
          </p>
          <p>
            <strong>Hit Points:</strong> {selectedMonster.hit_points} ({selectedMonster.hit_dice})
          </p>
          <p>
            <strong>Speed:</strong>{' '}
            {Object.entries(selectedMonster.speed).map(([type, value]) => `${type}: ${value}`).join(', ')}
          </p>

          <h3>Abilities</h3>
          <p>
            <strong>STR:</strong> {selectedMonster.strength} |{' '}
            <strong>DEX:</strong> {selectedMonster.dexterity} |{' '}
            <strong>CON:</strong> {selectedMonster.constitution} |{' '}
            <strong>INT:</strong> {selectedMonster.intelligence} |{' '}
            <strong>WIS:</strong> {selectedMonster.wisdom} |{' '}
            <strong>CHA:</strong> {selectedMonster.charisma}
          </p>

            {selectedMonster.proficiencies && selectedMonster.proficiencies.length > 0 && (
                <div>
                    <h3>Proficiencies</h3>
                    <ul>
                    {selectedMonster.proficiencies.map((prof, index) => (
                        <li key={index}>
                        <strong>{prof.proficiency.name}:</strong> +{prof.value}
                        </li>
                    ))}
                    </ul>
                </div>
            )}

          <h3>Senses</h3>
          <p>
            {Object.entries(selectedMonster.senses).map(([sense, value]) => (
              <span key={sense}>{sense}: {value} | </span>
            ))}
          </p>

          <h3>Languages</h3>
          <p>{selectedMonster.languages}</p>

          <h3>Challenge</h3>
          <p>
            <strong>CR:</strong> {selectedMonster.challenge_rating} |{' '}
            <strong>XP:</strong> {selectedMonster.xp}
          </p>

          {selectedMonster.special_abilities && selectedMonster.special_abilities.length > 0 && (
            <div>
              <h3>Special Abilities</h3>
              <ul>
                {selectedMonster.special_abilities.map((ability, index) => (
                  <li key={index}>
                    <strong>{ability.name}:</strong> {ability.desc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h3>Actions</h3>
          <ul>
            {selectedMonster.actions.map((action, index) => (
              <li key={index}>
                <strong>{action.name}:</strong> {action.desc}
              </li>
            ))}
          </ul>

          {selectedMonster.legendary_actions && selectedMonster.legendary_actions.length > 0 && (
            <div>
                <h3>Legendary Actions</h3>
                <ul>
                    {selectedMonster.legendary_actions.map((action, index) => (
                        <li key={index}>
                            <strong>{action.name}:</strong> {action.desc}
                        </li>
                    ))}
                </ul>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default Lookup;