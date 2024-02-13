import { render } from '@testing-library/react';

import ApiQuery from './api-query';

describe('ApiQuery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApiQuery />);
    expect(baseElement).toBeTruthy();
  });
});
