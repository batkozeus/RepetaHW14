export default class View {
  constructor() {
    this.addRecipeBtn = document.querySelector('.add-recipe-btn');
    this.addRecipeInput = document.querySelector('.recipe-input-title');
    this.addRecipeTextarea = document.querySelector('.recipe-input-text');
    this.addRecipeSelect = document.querySelector('.recipe-input-category');
    this.container = document.querySelector('.recipe-container');

    this.deleteRecipeBtn = Array.from(document.querySelectorAll('.delete-recipe-btn'));

    this.filterRecipeCheckbox = Array.from(document.querySelectorAll('input[name="category"]'));

    this.source = document.querySelector('#recipe-list').innerHTML.trim();
    this.template = Handlebars.compile(this.source);
  }

  basicLayoutView(userRecipeList) {
    const markup = userRecipeList.reduce((acc, item) => acc + this.template(item), '');
    this.container.innerHTML = markup;
    this.deleteRecipeBtn = Array.from(document.querySelectorAll('.delete-recipe-btn'));
  }

  addRecipeView(receiptsList) {
    const recipeTitle = this.addRecipeInput.value;
    const recipeText = this.addRecipeTextarea.value;
    const recipeCategory = this.addRecipeSelect.value;

    const recipe = {
      title: recipeTitle,
      category: recipeCategory,
      description: recipeText
    };

    const recipeChecker = receiptsList.every(recipe => recipe.title !== recipeTitle);

    if (
      recipeChecker &&
      (recipeTitle !== '') &&
      (recipeText !== '') &&
      (recipeCategory !== 'category')
    ) {
      this.addRecipeInput.value = '';
      this.addRecipeTextarea.value = '';
      this.addRecipeSelect.value = 'category';
      return recipe;
    } else {
      alert('Your recipe isn\'t full!');
      return false;
    }
  }
}