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

// Varieties
const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";
const genreList = document.querySelector(".genre-list");
const trendingList = document.querySelector(".trendingGame-list");

var requestOption = {
  method: "GET",
  redirect: "follow",
};

//Functions
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
    return [];
  }
};

const getAllGames = async (query) => {
  try {
    const url = BASE_URL + "/games?" + `${query}`;
    const response = await fetch(url, requestOption);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("error by getting data of all games", error);
    return [];
  }
};

//Function Render UI
const renderUIGenreList = (genreListData) => {
  genreListData.forEach((genre) => {
    const btnGenre = document.createElement("div");
    btnGenre.className = "btnGenre";
    btnGenre.innerHTML = genre.name;
    genreList.appendChild(btnGenre);
  });
};

const renderUIRecommendedGame = (recommendedGameData) => {
  recommendedGameData.forEach((game) => {
    const recommendedGame = document.createElement("div");
    recommendedGame.className = "bestGame-container";

    if (game.price === 0) {
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
                ${game.genres
                  .map((genre) => `<div class="genre-tag">${genre}</div>`)
                  .join("")}
                </div>
                <div class="bestGame-default">Now Available</div>
                <div class="bestGame-price" style="color:green">Free</div>
                <div class="bestGame-platform">
                ${game.platforms
                  .map(
                    (platform) => `<div class="platform-tag">${platform}</div>`
                  )
                  .join("")}
                </div>
              </div>
    `;
    } else {
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
        ${game.genres
          .map((genre) => `<div class="genre-tag">${genre}</div>`)
          .join("")}
        </div>
        <div class="bestGame-default">Now Available</div>
        <div class="bestGame-price">$ ${game.price}</div>
        <div class="bestGame-platform">
        ${game.platforms
          .map((platform) => `<div class="platform-tag">${platform}</div>`)
          .join("")}
        </div>
      </div>
`;
    }
    document.querySelector(".main-carousel").appendChild(recommendedGame);
  });
};

const renderUITrendingGame = (trendingGameData) => {
  trendingGameData.forEach((game) => {
    const trendingGame = document.createElement("div");
    trendingGame.className = "gameBox";
    if (game.price === 0) {
      trendingGame.innerHTML = `
                <div class="gameBox-img">
                  <img
                    src="${game["header_image"]}"
                    alt="${game.name}"
                  />
                </div>
                <div class="gameBox-info">
                  <div class="gameBox-title">${game.name}</div>
                  <div class="gameBox-platform">
                    ${game.platforms.map(
                      (platform) => `<span class="tag">${platform}</span>`
                    )}
                  </div>
                  <div class="gameBox-tags">
                    ${game.genres.map(
                      (genre) => `<span class="tag">${genre}</span>`
                    )}
                  </div>
                </div>
                <div class="gameBox-price" style = "color:green">Free To Play</div>
    `;
    } else {
      trendingGame.innerHTML = `
      <div class="gameBox-img">
        <img
          src="${game["header_image"]}"
          alt="${game.name}"
        />
      </div>
      <div class="gameBox-info">
        <div class="gameBox-title">${game.name}</div>
        <div class="gameBox-platform">
          ${game.platforms.map(
            (platform) => `<span class="tag">${platform}</span>`
          )}
        </div>
        <div class="gameBox-tags">
          ${game.genres.map((genre) => `<span class="tag">${genre}</span>`)}
        </div>
      </div>
      <div class="gameBox-price">$ ${game.price}</div>
`;
    }
    trendingList.appendChild(trendingGame);
  });
};

//Render
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

const renderRecommendedGame = async () => {
  try {
    const response = await getRecommendedGame();
    renderUIRecommendedGame(response.data);
  } catch (error) {
    console.log("error from render recommended game", error);
    return [];
  }
};

const renderActionGame = async () => {
  try {
    const response = await getAllGames("genres=action");
    renderUITrendingGame(response.data);
  } catch (error) {
    console.log("error from render action game", error);
    return [];
  }
};

//Actions
renderGenreList();
renderRecommendedGame();
renderActionGame();
