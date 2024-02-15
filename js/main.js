let showMeals = document.querySelector("#showMeals");

$(".loading-screen").ready(() => {
  getMealSearch("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});

function openBar() {
  $(".sideBar").animate({ left: 0 });
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".nav-links li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 200);
  }
}

function closeBar() {
  let boxTap = $(".sideBar .nav-tap ").innerWidth();

  $(".sideBar").animate({ left: -boxTap });
  $(".open-close-icon").removeClass("fa-x");
  $(".open-close-icon").addClass(" fa-align-justify");

  for (let i = 0; i < 5; i++) {
    $(".nav-links li")
      .eq(i)
      .animate({ top: 300 }, (i + 5) * 200);
  }
}
closeBar();
$(".nav-header .open-close-icon").click(() => {
  if ($(".sideBar").css("left") == "0px") {
    closeBar();
  } else {
    openBar();
  }
});

async function getMealSearch(nameMeal) {
  closeBar();

  let request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameMeal}`
  );
  let response = await request.json();
  displayMeals(response.meals);
}

function displayMeals(arr) {
  let cartona = ``;

  for (let i = 0; i < arr.length; i++) {
    cartona += `<div class="col-md-3">
    <div onclick = "getID(${arr[i].idMeal})" class="meal rounded-2 position-relative">
      <img class="w-100" src="${arr[i].strMealThumb}" alt="" />
      <div
        class="meal-layer position-absolute d-flex align-items-center"
      >
        <h3>${arr[i].strMeal}</h3>
      </div>
    </div>
  </div>`;
  }
  showMeals.innerHTML = cartona;
}

/* Category  */

$("#category").click(() => {
  getCategory();
});

async function getCategory() {
  closeBar();
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  response = await response.json();
  displayCategory(response.categories);
  $(".search").addClass("d-none");
}

function displayCategory(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `<div onclick="getMealsFromCategory('${
      arr[i].strCategory
    }')"  class="col-md-3">
    <div  class="meal rounded-2 position-relative">
      <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" />
      <div
        class="meal-layer position-absolute text-center"
      >
        <h3   class="pt-2">${arr[i].strCategory}</h3>
        <p>${arr[i].strCategoryDescription
          .split(" ")
          .slice(0, 25)
          .join(" ")}</p>
      </div>
    </div>
  </div>`;
  }
  showMeals.innerHTML = cartona;
}
/* filter category*/

async function getMealsFromCategory(categ) {
  closeBar();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
}

/* Area  */
$("#area").click(() => {
  $(".search").addClass("d-none");
  getArea();
});
async function getArea() {
  closeBar();

  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  response = await response.json();
  console.log(response.meals);
  displayArea(response.meals);
}
function displayArea(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3">
    <div onclick= "  getFilterArea('${
      arr[i].strArea
    }') " class="meal rounded-2 text-light text-center">
    <i class='fa-solid fa-house-laptop fa-4x'></i>

    <h3>${arr[i].strArea == "Unknown" ? "soon" : arr[i].strArea}</h3>
    </div>
  </div>`;
  }
  showMeals.innerHTML = cartona;
}
// filter area
async function getFilterArea(area) {
  closeBar();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  console.log(response.meals);
  displayMeals(response.meals);
}

/*Ingredients  */
$("#ingredients").click(() => {
  $(".search").addClass("d-none");
  getIntegred();
});

async function getIntegred() {
  closeBar();

  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  response = await response.json();

  displayIntegerds(response.meals.slice(0, 20));
}

function displayIntegerds(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `<div onclick="filterIngred('${
      arr[i].strIngredient
    }')" class="col-md-3">
    <div  class="meal rounded-2 text-light text-center">
    <i class='fa-solid fa-drumstick-bite fa-4x'></i>

    <h3>${arr[i].strIngredient}</h3>
    <p>${arr[i].strDescription.split(" ").slice(0, 30).join(" ")}</p>
    </div>
  </div>`;
  }
  showMeals.innerHTML = cartona;
}
// filter ingredient
async function filterIngred(ing) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
  );
  response = await response.json();
  // console.log(response.meals);
  displayMeals(response.meals);
}
/* function get ID */

async function getID(id) {
  closeBar();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  response = await response.json();

  displayDetailsMeal(response.meals[0]);
}
function displayDetailsMeal(meal) {
  let integrad = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      integrad += `<li class="alert alert-info p-1 m-2">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}<li>`;
    }
  }
  // ---------------------------------------------------------------

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tag = "";
  for (let i = 0; i < tags.length; i++) {
    tag += `<li class="alert alert-info p-1 m-2">${tags[i]}<li>`;
  }

  // ---------------------------------------------------------------
  let cartona = "";

  cartona += `          <div class="col-md-4 text-white">
    <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="" />
    <h2>${meal.strMeal}</h2>
  </div>
  <div class="col-md-8 text-white">
    <h3>Instructions</h3>
    <p>
      ${meal.strInstructions}
    </p>
    <h3><span class="fw-bold">Area :</span> ${meal.strArea}</h3>
    <h3><span class="fw-bold">Category :</span>${meal.strCategory}</h3>
    <h3><span class="fw-bold">Recipes :</span></h3>
    <ul class="list-unstyled d-flex flex-wrap">
    ${integrad}
    </ul>
    <h3><span class="fw-bold">Tags :</span></h3>
    <ul class="list-unstyled w-50 d-flex">
   ${tag}
    </ul>
    <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
  </div>`;

  showMeals.innerHTML = cartona;
}

// --------------------------------------------------------------- Search inside bar
$("#search").click(() => {
  $(".search").removeClass("d-none");
  $(".contact").addClass("d-none");

  showMeals.innerHTML = "";
});
$("input[placeholder='Search By Name ....']").keyup((e) => {
  e.target.value ? getMealSearch(e.target.value) : [];
});
async function getMealSearch(nameMeal) {
  closeBar();

  let request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameMeal}`
  );
  let response = await request.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
}
//  ------------------------------------------------------------------search first letter
$("input[placeholder='Search By first letter....']").keyup((e) => {
  // e.target.value ? getMealSearch(e.target.value) : [];
  getMealLetterSearch(e.target.value);
});
async function getMealLetterSearch(fletter) {
  closeBar();

  let first = fletter.split("").slice(0, 1).join("");
  first == "" ? (first = "a") : "";
  let request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${first}`
  );
  let response = await request.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
}

//-----------------------------------------------------------------------------------contact;
$("#contact").click(() => {
  closeBar();

  $(".search").addClass("d-none");
  showMeals.innerHTML = ``;
  $(".contact").removeClass("d-none");
  document.querySelector("#inputName").addEventListener("focus", () => {
    nameTouch = true;
  });
  document.querySelector("#inputEmail").addEventListener("focus", () => {
    emailTouch = true;
  });
  document.querySelector("#inputPhone").addEventListener("focus", () => {
    phoneTouch = true;
  });
  document.querySelector("#inputAge").addEventListener("focus", () => {
    ageTouch = true;
  });
  document.querySelector("#inputPassword").addEventListener("focus", () => {
    passTouch = true;
  });
  document.querySelector("#inputRePassword").addEventListener("focus", () => {
    rePassTouch = true;
  });
});
//---------------------------------------------------------------------------------------------
let nameTouch = false;
let emailTouch = false;
let phoneTouch = false;
let ageTouch = false;
let passTouch = false;
let rePassTouch = false;

/* Validation  */
function getValidation() {
  checkAlertInputs();
  if (
    validName() &&
    validEmail() &&
    validPhone() &&
    validAge() &&
    validPassword() &&
    validRePassword()
  ) {
    document.querySelector("#sub").removeAttribute("disabled");
  } else {
    document.querySelector("#sub").setAttribute("disabled", true);
  }
}

//-----------------------------------------------------------------------
document.querySelectorAll(".contact input").forEach((input) => {
  input.addEventListener("keyup", function () {
    getValidation();
  });
});
//-------------------------------------------------------------------------
function validName() {
  return /^[a-zA-Z ]+$/.test(document.querySelector("#inputName").value);
}
function validEmail() {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    document.querySelector("#inputEmail").value
  );
}
function validPhone() {
  return /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,}$/.test(
    document.querySelector("#inputPhone").value
  );
}
function validAge() {
  return /^(1[89]|[2-9]\d)$/gm.test(document.querySelector("#inputAge").value);
}
function validPassword() {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
    document.querySelector("#inputPassword").value
  );
}
function validRePassword() {
  return (
    document.querySelector("#inputRePassword").value ==
    document.querySelector("#inputPassword").value
  );
}
//-----------------------------------------------------------------checked inputs alert

function checkAlertInputs() {
  if (nameTouch) {
    if (validName()) {
      document
        .querySelector("#alertName")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .querySelector("#alertName")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailTouch) {
    if (validEmail()) {
      document
        .querySelector("#alertEmail")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .querySelector("#alertEmail")
        .classList.replace("d-none", "d-block");
    }
  }
  if (phoneTouch) {
    if (validPhone()) {
      document
        .querySelector("#alertPhone")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .querySelector("#alertPhone")
        .classList.replace("d-none", "d-block");
    }
  }
  if (ageTouch) {
    if (validAge()) {
      document
        .querySelector("#alertAge")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .querySelector("#alertAge")
        .classList.replace("d-none", "d-block");
    }
  }
  if (passTouch) {
    if (validPassword()) {
      document
        .querySelector("#alertPassword")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .querySelector("#alertPassword")
        .classList.replace("d-none", "d-block");
    }
  }
  if (rePassTouch) {
    if (validRePassword()) {
      document
        .querySelector("#alertRePassword")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .querySelector("#alertRePassword")
        .classList.replace("d-none", "d-block");
    }
  }
}
