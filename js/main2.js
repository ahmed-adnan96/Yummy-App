// Global Variable
let mealsHome;
let id;
let mealDetails = document.querySelector(".meal-details");
$(document).ready(function () {
  $(".loading i ").fadeOut(500, function () {
    $(".loading  ").fadeOut(1000, function () {
      $("body").css("overflow", "auto");
      $(".loading").remove();
    });
  });

  let widthInnerSide = $(".inner-side").innerWidth();
  $("#sideBar").css({ left: -widthInnerSide });
  $(".btn-side").click(function () {
    if ($("#sideBar").css("left") == "0px") {
      openBar();
    } else {
      closeBar();
    }
  });

  function openBar() {
    $("#sideBar").animate({ left: -widthInnerSide }, 1000, function () {
      $(".btn-side").removeClass("fa-solid fa-x fa-2x");
      $(".btn-side").addClass(
        "fa-solid open-close-icon fa-2x fa-align-justify"
      );
      $(".link-bar").css(" transform", "translateY(0px)");
    });
  }
  function closeBar() {
    $("#sideBar").animate({ left: 0 }, 1000, function () {
      $(".btn-side").addClass("fa-solid fa-x fa-2x");
    });
  }

  /* ----------------------------------------Api for homepage --------------------------------------------------------- */
  (async function () {
    let homeApi = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s",
      {
        method: "GET",
      }
    );
    let requestHome = await homeApi.json();
    mealsHome = requestHome.meals;
    displayApiHome(mealsHome);
    console.log(mealsHome);
  })();

  function displayApiHome(arr) {
    let cartona = ``;

    arr.forEach((meal) => {
      cartona += `<div class="col-md-3">
      <div data-id=${meal.idMeal}  class="item position-relative">
        <img data-id=${meal.idMeal}  src="${meal.strMealThumb}" class="w-100 rounded-1" alt="food" />
        <div
        data-id=${meal.idMeal}   class=" hover-caption position-absolute d-flex align-items-center"
        >
          <h2  class="ps-2 fs-1">${meal.strMeal}</h2>
        </div>
      </div>
    </div>`;
    });

    document.querySelector(".display-item").innerHTML = cartona;
    $(".item").click(function (evenInfo) {
      // $(".display-item").fadeOut("500", function () {
      //   $(".meal-details").removeClass("d-none");
      // });
      $(".display-item").addClass("d-none");
      $(".meal-details").removeClass("d-none");
      id = $(evenInfo.target).attr("data-id");

      meatDetails(id);
    });
  }

  async function meatDetails(idMeal) {
    let mealById = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    let detail = await mealById.json();
    let meal = detail.meals;

    displayMeal(meal[0]);
  }
  function displayMeal(x) {
    let ingred = ``;
    for (let i = 1; i <= 20; i++) {
      if (x[`strIngredient${i}`] != "") {
        ingred += `
     
      <div class="col-md-2">
      <p class="alert alert-info px-0 py-1">${x[`strMeasure${i}`]} ${
          x[`strIngredient${i}`]
        }</p>
    </div>
      `;
      }
    }
    let tagsArr = x.strTags?.split(",");
    if (!tagsArr) tagsArr = [];
    let tags = ``;
    for (let i = 0; i < tagsArr.length; i++) {
      tags += `
    
    <p class="p-tags alert alert-danger px-3 py-1">${tagsArr[i]}</p>
    
    `;
    }
    mealDetails.innerHTML = `          <div class="col-md-4">
  <div class="img-meal mt-3">
    <img
      src="${x.strMealThumb}"
      class="w-100 shadow rounded-2"
      alt="fod"
    />
    <h2 class="text-white">${x.strMeal}</h2>
  </div>
</div>
<div class="col-md-8 text-white">
  <h2>Instructions</h2>
  <p>
${x.strInstructions}
  </p>
  <h3>Area : ${x.strArea}</h3>
  <h3>Category : ${x.strCategory}</h3>
  <h3>Recipes :</h3>
  <div class="row ">
  ${ingred}
  </div>
  <h3>Tags :</h3>
  ${tags}

  <a
    target="_blank"
    href="${x.strSource}"
    class="btn btn-success"
    >Source</a
  >
  <a
    target="_blank"
    href="${x.strYoutube}"
    class="btn btn-danger"
    >Youtube</a
  >
</div>`;
  }

  /* ----------------------------------------Navigate  side bar--------------------------------------------------------- */
  $(".search").click(function () {
    // $(".display-item").fadeOut("500", function () {
    //   $("#search").removeClass("d-none");
    // });
    $(".display-item").addClass("d-none");
    $("#search").removeClass("d-none");
  });

  /* ----------------------------------------Api for Categories --------------------------------------------------------- */
  let categ;
  async function getCategor() {
    let request = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    let response = await request.json();
    categ = response.categories;
    displayCateg(categ);
    console.log("categor", categ);
  }
  /* ----------------------------------------Navigate  Category--------------------------------------------------------- */
  $(".categories").click(function () {
    $(".meal-details").addClass("d-none");
    $("#search").addClass("d-none");
    $(".display-item").removeClass("d-none");
    getCategor();
  });

  function displayCateg(arrCatego) {
    let cartona = ``;
    arrCatego.forEach((category) => {
      cartona += `<div class="col-md-3">
    <div name-category=${category.strCategory}   class="item position-relative">
      <img name-category=${category.strCategory}   src="${category.strCategoryThumb}" class="w-100 rounded-1" alt="food" />
      <div 
      name-category=${category.strCategory}  class=" hover-caption position-absolute "
      >
        <h3 name-category=${category.strCategory}  class="ps-2 text-center ">${category.strCategory}</h3>
        <p name-category=${category.strCategory} class="small text-center"> ${category.strCategoryDescription}</p>
      </div>
    </div>
  </div>`;
    });
    document.querySelector(".display-item").innerHTML = cartona;
    $(".item").click(function (e) {
      let name = $(e.target).attr("name-category");

      console.log(name);
      getNameCatogary(name);
    });
  }
  /* ----------------------------------------Api for Categories by NAme --------------------------------------------------------- */

  async function getNameCatogary(name) {
    let request = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
    );
    let response = await request.json();
    let MealsCatogry = response.meals;
    console.log("meals", MealsCatogry);
    displayApiHome(MealsCatogry);
  }
});
