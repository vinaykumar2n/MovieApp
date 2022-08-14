function display(realdata) {
  moviedisplay_div.innerHTML = null;
  realdata.forEach(function (el, i) {
    var box = document.createElement("div");
    box.setAttribute("id", "card");

    var imagediv = document.createElement("div");
    imagediv.setAttribute("id", "imgdiv");
    var img = document.createElement("img");
    img.src = imgurl + el.poster_path;
    imagediv.append(img);

    var otherthanimg = document.createElement("div");
    otherthanimg.setAttribute("id", "otherdiv");

    var name = document.createElement("h2");
    name.setAttribute("id", "namemovie");
    name.innerText = el.original_title;

    var released = document.createElement("h5");
    released.setAttribute("id", "released");
    released.innerText = el.release_date;

    var ratings = document.createElement("p");
    ratings.setAttribute("id", "ratings");
    ratings.innerText = `Imdb Rating: ${el.vote_average}`;
    var recdiv;
    var rec;
    if (Number(el.vote_average) > 8.5) {
      recdiv = document.createElement("div");
      recdiv.setAttribute("id", "recid");
      recdiv.innerText = "Recommended";
      otherthanimg.append(name, released, ratings, recdiv);
    } else {
      otherthanimg.append(name, released, ratings);
    }

    box.append(imagediv, otherthanimg);
    document.getElementById("moviedisplay").append(box);
  });
}

let moviedisplay_div = document.getElementById("moviedisplay");
let imgurl = "https://image.tmdb.org/t/p/w500";
const key = "ad90383510ca299b170423b671b9e506";
let id;

function debounce(fun, delay) {
  if (id) {
    clearTimeout(id);
  }
  id = setTimeout(function () {
    fun();
  }, delay);
}

async function main() {
  let search_div = document.getElementById("searchbox");
  let searchData = await searchfun(search_div.value);
  displaySearch(searchData);
  console.log("searchData:", searchData);
}

async function searchfun(val) {
  try {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=ad90383510ca299b170423b671b9e506&language=en-US&query=${val}&page=1&include_adult=false`;

    let res = await fetch(url);
    let data = await res.json();
    return data.results;
  } catch (err) {
    console.log("err:", err);
  }
}

function displaySearch(searchData) {
  let dropdown = document.getElementById("dropdown");
  dropdown.style.display = "block";
  dropdown.innerHTML = null;
  if (searchData == undefined) {
    dropdown.style.display = "none";
    return false;
  }

  searchData.forEach(function (el) {
    let listitem = document.createElement("ul");
    listitem.setAttribute("id", "droplist");

    let name = document.createElement("li");
    name.setAttribute("id", "nameli");
    name.addEventListener("click", function () {
      dropdown.style.display = "none";
      display(searchData);
    });

    name.innerText = el.original_title;

    listitem.append(name);
    dropdown.append(listitem);
  });
}
