import React from 'react';
import { EntropyBackground } from '@components';
import { useMouseEntropy } from '@hooks';
import { Generator } from '@views';

const App: React.FC = () => {
  const entropy = useMouseEntropy();

  return (
    <main className="app">
      <EntropyBackground entropy={entropy} />
      <Generator />
    </main>
  );
};

export default App;
