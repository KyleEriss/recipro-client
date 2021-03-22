import React from 'react';
import { shallow } from 'enzyme';

import LandingPage from './LandingPage';

// smoke test
test('it should render', () => {
  shallow(<LandingPage />);
});