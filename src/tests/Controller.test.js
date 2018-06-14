import Controller from '../js/Controller';
import Model from '../js/Model';
import View from '../js/View';

jest.mock('../js/Controller');

test('Controller with model and view constructor', () => {
  let modelMock = Model;
  let viewMock = View;

  expect(modelMock).toEqual(Model);
  expect(viewMock).toEqual(View);
});

test('Controller with model and view basicLayout', () => {
  let modelMock = Model;
  let viewMock = View;

  expect(modelMock.basicLayout).toEqual(Model.basicLayout);
  expect(viewMock.basicLayout).toEqual(View.basicLayout);
});

test('Controller with model and view addRecipe', () => {
  let modelMock = Model;
  let viewMock = View;

  expect(modelMock.addRecipe).toEqual(Model.addRecipe);
  expect(viewMock.addRecipe).toEqual(View.addRecipe);
});

test('New controller works properly', () => {
    const controller = new Controller();
    expect(Controller).toHaveBeenCalledTimes(1);

    const userRecipeList = Model.recipeList;

    const mockControllerInstance = Controller.mock.instances[0];
    const mockBasicLayout = mockControllerInstance.basicLayout;
    expect(mockBasicLayout).not.toHaveBeenCalledWith(userRecipeList);
    expect(mockBasicLayout).toHaveBeenCalledTimes(0);
});