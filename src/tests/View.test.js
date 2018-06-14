import View from '../js/View';

jest.mock('../js/View');


beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  View.mockClear();
});

it('We can check if the consumer called a method on the class instance', () => {
  // Show that mockClear() is working:
  expect(View).not.toHaveBeenCalled();
  // Constructor should have been called:
  expect(View).toHaveBeenCalledTimes(0);

  const recipeList = [{
    title: 'Smakota',
    category: 'salad',
    description: 'Put all you have and mix'
  }];

  const spy = jest.spyOn(View.prototype, "basicLayoutView");

  expect(spy).not.toHaveBeenCalledWith(recipeList);
  expect(spy).toHaveBeenCalledTimes(0);
});