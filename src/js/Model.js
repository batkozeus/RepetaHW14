export default class Model {
	constructor() {
		this.recipeList = JSON.parse(localStorage.getItem('recipeList')) || [{
			title: 'Smakota',
			category: 'salad',
			description: 'Put all you have and mix'
		}];
	}
	
	basicLayoutModel (userRecipeList) {
	  localStorage.setItem('recipeList', JSON.stringify(userRecipeList));
	}

	addRecipeModel(recipe) {
		this.recipeList = [...this.recipeList, recipe];
	}

	deleteRecipeModel (evt) {
		this.recipeList = this.recipeList.filter(singleRecipe => singleRecipe.title !== evt.target.name);
	}
	
	createFilterObject () {
		const categoryCheckboxes = Array.from(document.querySelectorAll('input[name="category"]:checked'));
		const filter = categoryCheckboxes.map(item => item.value);
		return filter;
	}

	filterByParameter = (filteredObject, recipe, param) => {
		let correspondingParam = false;
		filteredObject.forEach(filterParam => {
			if (filterParam == recipe[param]) {
				correspondingParam = true;
			}
		});
		return correspondingParam;
	}

	filterRecipesModel () {
		const filteredObject = this.createFilterObject();

		let filteredRecipes = this.recipeList
			.filter(recipe => this.filterByParameter(filteredObject, recipe, 'category'));
		
		return filteredRecipes;
	}

}