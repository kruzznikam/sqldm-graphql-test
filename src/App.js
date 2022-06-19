import Main from './components/Main';
import MainInfinite from './components/MainInfinite';
import './App.css';
import { useState } from 'react';

function App() {
  const [infiniteQuery, setInfiniteQuery] = useState(true);
  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked = {infiniteQuery} onChange={(event) => setInfiniteQuery(event.target.checked)}/>
        <span className="slider round"></span>
      </label>
      {infiniteQuery && <MainInfinite/>}
      {!infiniteQuery && <Main/>}
    </div>
  );
}

export default App;
