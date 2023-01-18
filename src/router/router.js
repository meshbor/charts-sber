import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Router() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>parabola</Link>
        </li>
        <li>
          <Link to='/line'>line</Link>
        </li>
        <li>
          <Link to='/parabola'>parabola</Link>
        </li>
        <li>
          <Link to='/power'>power</Link>
        </li>
        <li>
          <Link to='/exponenta'>exponenta</Link>
        </li>
        <li>
          <Link to='/surface'>surface</Link>
        </li>
        <li>
          <Link to='/flatsurface'>flatsurface</Link>
        </li>
        <li>
          <Link to='/binomial'>binomial</Link>
        </li>
        <li>
          <Link to='/poisson'>poisson</Link>
        </li>
        <li>
          <Link to='/big-number-law'>big-number-law</Link>
        </li>
        <li>
          <Link to='/distribution-convergence'>distribution-convergence</Link>
        </li>
        <li>
          <Link to='/normal-distribution_4_1_2'>normal-distribution 4_1_2</Link>
        </li>
        <li>
          <Link to='/exponential-distribution_4_1_2'>Exponential-distribution _4_1_2</Link>
        </li>
        <li>
          <Link to='/normal-distribution'>Стандартное распределение</Link>
        </li>
        <li>
          <Link to='/epsilon-scutter'>epsilon-scutter</Link>
        </li>
        <li>
          <Link to='/router'>router</Link>
        </li>
      </ul>
    </nav>
  );
}
