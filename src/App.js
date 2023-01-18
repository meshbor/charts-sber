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


// 1 Актуализируем мейн -  git pull origin main
// 2 отпочковываемся от мейна -  git checkout -b your_br_name
// --- ваша работа 
// 3 обновляем рабочую ветку -  либо через ui vscode либо  git add -A  затем git commit -m 'info'  затем git push origin имя_ветки

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Parabola />} />
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
      <Route path='distribution-convergence' element={<DistributionConvergence />} />
      <Route path='normal-distribution_4_1_2' element={<Teorver_4_1_2 />} />
      <Route path='exponential-distribution_4_1_2' element={<Teorver2_4_1_2 />} />
      <Route path='normal-distribution' element={<NormalDistribution />} />
      <Route path='epsilon-scutter' element={<EpsilonScutter />} />
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
