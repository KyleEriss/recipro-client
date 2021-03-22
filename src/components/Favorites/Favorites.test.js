import React from 'react';
import { shallow } from 'enzyme';

import Favorites from './Favorites';

// smoke test
test('it should render', () => {
  shallow(<Favorites />);
});