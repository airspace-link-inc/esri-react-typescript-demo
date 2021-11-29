import React from 'react';
import Map from '../Map';
import { render } from '@testing-library/react';

jest.mock('../../stores/RootStore');

describe('Map', () => {
  test('should render the component with a map selector', async () => {
    const { container } = render(<Map />);
    const element = container.querySelector('#map');
    // Ensures the map div is rendered
    expect(element).toBeTruthy();
  });
});
