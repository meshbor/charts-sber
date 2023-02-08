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
import BigNumberLaw from './charts/BigNumberLaw';
import Router from './router/router';
import DistributionConvergence from './charts/DistributionConvergence';
import Teorver_4_1_2 from './charts/Teorver_4_1_2';
import NormalDistribution from './charts/NormalDistribution';
import Teorver2_4_1_2 from './charts/Teorver2_4_1_2';
import EpsilonScutter from './charts/EpsilonScutter';
import Matan_4_2 from './charts/Matan_4_2';
import Matan_Integral from './charts/Matan_Integral';
import Matan_6_5 from './charts/Matan/Matan_6_5';
import Matan_10_1 from './charts/Matan/Matan_10_1';
import TeorverStrings from './charts/Teorver/TeorverStrings';
import Teorver631 from './charts/Teorver/Teorver631';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Router />} />
        <Route path='router' element={<Router />} />
        <Route path='line' element={<StraightLine />} />
        <Route path='parabola' element={<Parabola />} />
        <Route path='power' element={<PowerFunction />} />
        <Route path='exponenta' element={<ExponentFunction />} />
        <Route path='surface' element={<Surface />} />
        <Route path='flatsurface' element={<FlatSurface />} />
        <Route path='binomial' element={<Binomial />} />
        <Route path='poisson' element={<Poisson />} />
        <Route path='big-number-law' element={<BigNumberLaw />} />
        <Route
          path='distribution-convergence'
          element={<DistributionConvergence />}
        />
        <Route path='normal-distribution_4_1_2' element={<Teorver_4_1_2 />} />
        <Route
          path='exponential-distribution_4_1_2'
          element={<Teorver2_4_1_2 />}
        />
        <Route path='normal-distribution' element={<NormalDistribution />} />
        <Route path='epsilon-scutter' element={<EpsilonScutter />} />
        <Route path='matan-4-2' element={<Matan_4_2 />} />
        <Route path='matan_integral-10-4' element={<Matan_Integral />} />
        <Route path='matan-6-5' element={<Matan_6_5 />} />
        <Route path='matan-10-1' element={<Matan_10_1 />} />
        <Route path='teorver-strings' element={<TeorverStrings />} />
        <Route path='teorver-6-3-1' element={<Teorver631 />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
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
