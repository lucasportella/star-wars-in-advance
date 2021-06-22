import { useState } from 'react';

const useProviderHooks = () => {
  const [filterLayer, setFilterLayer] = useState([]);

  return [filterLayer, setFilterLayer];
};

export default useProviderHooks;
