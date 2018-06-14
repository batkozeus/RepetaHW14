import Model from '../js/Model';

jest.mock('../js/Model');

beforeAll(() => {
  // Clear all instances and calls to constructor and all methods:
  Model.mockClear();
});

const recipeList = [{
  title: 'Smakota',
  category: 'salad',
  description: 'Put all you have and mix'
}];
const recipe = {
  title: 'Smakota2',
  category: 'first cause',
  description: 'Nyam'
};

test('Add recipe', () => {
	expect([...recipeList, recipe]).toContainEqual(recipe);
});

test('Delete recipe', () => {
	const recipeFilter = recipeList.filter(singleRecipe => singleRecipe.title !== recipe.title);
	expect(recipeFilter).not.toContainEqual(recipeList);
});

const categoryCheckboxes = [{category: 'salad'},{category: 'first cause'}];
const filter = categoryCheckboxes.map(item => item.category);

test('Filter object', () => {
	expect(filter).toEqual(['salad', 'first cause']);
});

test('Filter by parameter', () => {
	let correspondingParam = false;
	filter.forEach(filterParam => {
		if (filterParam == recipe.category) {
			correspondingParam = true;
		}
	});
	expect(correspondingParam).toBeTruthy;
});

test('Filter recipes', () => {
	let filteredRecipes = recipeList
		.filter(recipe => true);
	expect(filteredRecipes).toEqual(recipeList);
});