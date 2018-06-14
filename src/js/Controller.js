export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.basicLayout(this.model.recipeList);

        this.view.addRecipeBtn.addEventListener('click', this.addRecipe.bind(this));

        this.view.filterRecipeCheckbox.forEach(checker => {
            checker.addEventListener('click', this.filterRecipes.bind(this));
        });
    }

    basicLayout (userRecipeList) {
        this.model.basicLayoutModel(userRecipeList);
        this.view.basicLayoutView(userRecipeList);
        this.view.deleteRecipeBtn.forEach(btn => {
			btn.addEventListener('click', this.deleteRecipe.bind(this));
		});
    }

    addRecipe(evt) {
        evt.preventDefault();
        const recipeView = this.view.addRecipeView(this.model.recipeList);

        if (recipeView) {
            this.model.addRecipeModel(recipeView);
            // this.basicLayout(this.model.recipeList);
            this.filterRecipes()
        }
    }
    
    deleteRecipe (evt) {
        this.model.deleteRecipeModel(evt);

		this.basicLayout(this.model.recipeList);
    }
    
    filterRecipes() {
		const recipeFiltered = this.model.filterRecipesModel();

		this.basicLayout(recipeFiltered);
	}

}