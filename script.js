//Flickity
var elem = document.querySelector(".main-carousel");
var flkty = new Flickity(elem, {
  // options
  cellAlign: "left",
  contain: true,
});

// element argument can be a selector string
//   for an individual element
var flkty = new Flickity(".main-carousel", {
  // options
});

const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";
const genreList = document.querySelector(".genre-list");

var requestOption = {
  method: "GET",
  redirect: "follow",
};

const getGenreList1 = async () => {
  try {
    const url = BASE_URL + "/genres?page=1";
    const response = await fetch(url, requestOption);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("error by getting data of genre list 1", error);
    return [];
  }
};
const getGenreList2 = async () => {
  try {
    const url = BASE_URL + "/genres?page=2";
    const response = await fetch(url, requestOption);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("error by getting data of genre list 2", error);
    return [];
  }
};
const getGenreList3 = async () => {
  try {
    const url = BASE_URL + "/genres?page=3";
    const response = await fetch(url, requestOption);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("error by getting data of genre list 3", error);
    return [];
  }
};

const renderUIGenreList = (genreListData) => {
  genreListData.forEach((genre) => {
    const btnGenre = document.createElement("div");
    btnGenre.className = "btnGenre";
    btnGenre.innerHTML = genre.name;
    genreList.appendChild(btnGenre);
  });
};

const renderGenreList1 = async () => {
  try {
    const response = await getGenreList1();
    renderUIGenreList(response.data);
  } catch (error) {
    console.log("error from render Genre 1", error);
    return [];
  }
};
const renderGenreList2 = async () => {
  try {
    const response = await getGenreList2();
    renderUIGenreList(response.data);
  } catch (error) {
    console.log("error from render Genre 2", error);
    return [];
  }
};
const renderGenreList3 = async () => {
  try {
    const response = await getGenreList3();
    renderUIGenreList(response.data);
  } catch (error) {
    console.log("error from render Genre 3", error);
    return [];
  }
};

const renderGenreList = () => {
  renderGenreList1();
  renderGenreList2();
  renderGenreList3();
};

renderGenreList();

const getRecommendedGame = async () => {
  try {
    const url = BASE_URL + "/features";
    const response = await fetch(url, requestOption);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("error by getting data of recommended game", error);
  }
};

const renderRecommendedGame = async () => {
  try {
    const response = await getRecommendedGame();
    response.data.forEach((game) => {
      const recommendedGame = document.createElement("div");
      recommendedGame.className = "bestGame-container";
      recommendedGame.innerHTML = `
                <div class="bestGame-img">
                  <img
                    src="${game["header_image"]}"
                    alt="${game.name}"
                  />
                </div>
                <div class="bestGame-info">
                  <div class="bestGame-title">${game.name}</div>
                  <div class="bestGame-genre">
                  ${game.genres.map(
                    (genre) => `<div class="genre-tag">${genre}</div>`
                  )}
                  </div>
                  <div class="bestGame-default">Now Available</div>
                  <div class="bestGame-price">${game.price}</div>
                  <div class="bestGame-platform">
                  ${game.platforms.map(
                    (platform) => `<div class="platform-tag">${platform}</div>`
                  )}
                  </div>
                </div>
      `;
      document.querySelector(".main-carousel").appendChild(recommendedGame);
    });
  } catch (error) {
    console.log("error from render recommended game", error);
    return [];
  }
};

renderRecommendedGame();
