import { render } from '@testing-library/react';
import App from "./App";

test("Testing works!", () => {
  const { getByText } = render(<App />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
});

