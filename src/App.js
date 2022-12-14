import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Surface from './charts/3dSurface';
import ExponentFunction from './charts/Exponent';
import FlatSurface from './charts/FlatSurface';
import Binomial from './charts/Binomial';
import Parabola from './charts/Parabola';
import PowerFunction from './charts/PowerFunction';
import StraightLine from './charts/StraightLine';
import Poisson from './charts/Poisson';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Parabola />} />
      <Route path='line' element={<StraightLine />} />
      <Route path='parabola' element={<Parabola />} />
      <Route path='power' element={<PowerFunction />} />
      <Route path='exponenta' element={<ExponentFunction />} />
      <Route path='surface' element={<Surface />} />
      <Route path='flatsurface' element={<FlatSurface />} />
      <Route path='binomial' element={<Binomial />} />
      <Route path='poisson' element={<Poisson />} />
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
