import './css/styles.css';

let recipeList = JSON.parse(localStorage.getItem('recipeList')) || [{
  title: 'Smakota',
  category: 'salad',
  description: 'Put all you have and mix'
}];

const addRecipeBtn = document.querySelector('.add-recipe-btn');
const addRecipeInput = document.querySelector('.recipe-input-title');
const addRecipeTextarea = document.querySelector('.recipe-input-text');
const addRecipeSelect = document.querySelector('.recipe-input-category');
const container = document.querySelector('.recipe-container');

const filterRecipeCheckbox = document.querySelectorAll('input[name="category"]');

const source = document.querySelector('#recipe-list').innerHTML.trim();
const template = Handlebars.compile(source);

// -------------------------

function basicLayout(userRecipeList) {
  localStorage.setItem('recipeList', JSON.stringify(userRecipeList));
  console.log(JSON.parse(localStorage.getItem('recipeList')));

  const markup = userRecipeList.reduce((acc, item) => acc + template(item), '');
  container.innerHTML = markup;

  const deleteRecipeBtn = Array.from(document.querySelectorAll('.delete-recipe-btn'));
  deleteRecipeBtn.forEach(btn => {
    btn.addEventListener('click', deleteRecipe);
  });
}

basicLayout(recipeList);

function addRecipe(evt) {
  evt.preventDefault();
  const recipeTitle = addRecipeInput.value;
  const recipeText = addRecipeTextarea.value;
  const recipeCategory = addRecipeSelect.value;

  const recipe = {
    title: recipeTitle,
    category: recipeCategory,
    description: recipeText
  };

  console.log(recipe);

  if (
    (recipeTitle !== '') && 
    (recipeText !== '') && 
    (recipeCategory !== 'category')
  ) {
    recipeList = [...recipeList, recipe];
    basicLayout(recipeList);
    addRecipeInput.value = '';
    addRecipeTextarea.value = '';
    addRecipeSelect.value = 'category';
  } else {
    return alert('Your recipe isn\'t full!');
  }

}

addRecipeBtn.addEventListener('click', addRecipe);

function deleteRecipe(evt) {
  evt.preventDefault();
  console.log(evt.target);
  recipeList = recipeList.filter(singleRecipe => singleRecipe.title !== evt.target.name);

  basicLayout(recipeList);
}

// -------------------------

function createFilterObject() {
  const categoryCheckboxes = Array.from(document.querySelectorAll('input[name="category"]:checked'));

  const filter = categoryCheckboxes.map(item => item.value);

  console.log(filter);

  return filter;
}

const filterByParameter = (filteredObject, recipe, param) => {
  let correspondingParam = false;
  filteredObject.forEach(filterParam => {
    if (filterParam == recipe[param]) {
      correspondingParam = true;
    }
  });
  return correspondingParam;
}

function filterRecipes(event) {
  const filteredObject = createFilterObject();
  console.log(filteredObject);

  let filteredRecipes = recipeList
    .filter(recipe => filterByParameter(filteredObject, recipe, 'category'));

  basicLayout(filteredRecipes);
}

const filterRecipeCheckboxArray = Array.from(filterRecipeCheckbox);
filterRecipeCheckboxArray.forEach(checker => {
  checker.addEventListener('click', filterRecipes);
});
