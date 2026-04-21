import React, { useState, useRef } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce';
import { Button } from './components/Button';
import { BackendTester } from './components/BackendTester';

function App() {
  // Demo useLocalStorage
  const [name, setName] = useLocalStorage<string>('user-name', 'Guest');

  // Demo useDebounce
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Demo Button and Ref
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Action completed!');
    }, 2000);
  };

  return (
    <div className="app-container">
      <h1>Gozen TypeScript Full-Stack Task</h1>
      
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>1. useLocalStorage</h2>
        <p>Current name (persisted in localStorage): <strong>{name}</strong></p>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <p><small>Try refreshing the page to see the value persist!</small></p>
      </section>

      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>2. useDebounce</h2>
        <p>Type something to see it update after 500ms:</p>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Search..."
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <p>Debounced value: <strong>{debouncedSearch}</strong></p>
      </section>

      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>3. Polymorphic Button</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button 
            ref={buttonRef}
            variant="primary" 
            isLoading={isLoading} 
            onClick={handleButtonClick}
          >
            Primary Action
          </Button>

          <Button variant="secondary" onClick={() => console.log(buttonRef.current)}>
            Log Ref to Console
          </Button>

          <Button variant="danger" size="sm">
            Small Danger
          </Button>

          <Button variant="ghost" size="lg">
            Large Ghost
          </Button>
        </div>
      </section>

      <section style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9', marginTop: '2rem' }}>
        <BackendTester />
      </section>
    </div>
  );
}

export default App;
