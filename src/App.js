import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Parabola from './charts/Parabola';
import StraightLine from './charts/StraightLine';

export default function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname === '/line' ? <StraightLine /> : <Parabola />}
    </div>
  );
}
