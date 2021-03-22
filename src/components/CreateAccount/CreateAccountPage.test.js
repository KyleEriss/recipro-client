import React from 'react';
import { shallow } from 'enzyme';

import CreateAccountPage from './CreateAccountPage';

// smoke test
test('it should render', () => {
  shallow(<CreateAccountPage />);
});