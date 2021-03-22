import React from 'react';
import { shallow } from 'enzyme';

import CreateAccountForm from './CreateAccountForm';

// smoke test
test('it should render', () => {
  shallow(<CreateAccountForm />);
});