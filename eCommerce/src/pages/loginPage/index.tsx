import { useState } from 'react';

export const LoginPage = () => {
  const [clicks, changeClicks] = useState(0);
  const pressBtn = () => {
    changeClicks(clicks + 1);
  }
  return (
    <div>
      <h1>login</h1>
      <button onClick={pressBtn}>click</button>
      <p>{clicks}</p>
    </div>
  );
};
