import React from 'react';
import { shallow } from 'enzyme';

import LoginPage from './LoginPage';

// smoke test
test('it should render', () => {
  shallow(<LoginPage />);
});