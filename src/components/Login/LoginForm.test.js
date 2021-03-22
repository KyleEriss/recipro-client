import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm';

// smoke test
test('it should render', () => {
  shallow(<LoginForm />);
});