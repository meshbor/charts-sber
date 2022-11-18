import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ExponentFunction from './charts/Exponent';
import Parabola from './charts/Parabola';
import PowerFunction from './charts/PowerFunction';
import StraightLine from './charts/StraightLine';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Parabola />} />
      <Route path='line' element={<StraightLine />} />
      <Route path='parabola' element={<Parabola />} />
      <Route path='power' element={<PowerFunction />} />
      <Route path='exponenta' element={<ExponentFunction />} />

      
      <Route path='*' element={<NoMatch />} />
    </Routes>
  );
}
function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  );
}
