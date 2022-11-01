import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from "./App";
import ImageCarousel from './ImageCarousel';
import ImageFrame from './ImageFrame';

const validateElementHasText = (element) => {
  const text = element.textContent;
  expect(text.length).toBeGreaterThan(0);
};
const clickButton = (testId) => {
  fireEvent(
    screen.queryByTestId(testId),
    new MouseEvent('click'),
  )
};
const waitForCarouselToRender = async () => {
  render(<ImageCarousel />);
  await waitForElementToBeRemoved(() => screen.queryByTestId('emptyCarousel'));
};
test('Validate able to click arrows', async() => {
  await waitForCarouselToRender();
  clickButton('arrowBack');
  clickButton('arrowForward');
});
test('Validate image renders', async() => {
  await waitForCarouselToRender();
  const image = await screen.findByTestId('image');
  expect(image).toBeDefined();
});
test('Empty carousel initial state - validate text renders', () => {
  render(<App />);
  const emptyCarouselElement = screen.queryByTestId('emptyCarousel');
  validateElementHasText(emptyCarouselElement);
});
test('Validate image loader renders text and spinner', () => {
  render(<ImageFrame imageIndex={0} />);
  const loaderDiv = screen.queryByTestId('imageLoader');
  validateElementHasText(loaderDiv);
  const spinner = screen.queryByTestId('spinner');
  expect(spinner).toBeDefined();
});