import React from 'react';
import { shallow } from 'enzyme';

import LandingForm from './LandingForm';

// smoke test
test('it should render', () => {
  shallow(<LandingForm />);
});