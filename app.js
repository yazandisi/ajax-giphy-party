const $searchButton = $(".searchButton");
$searchButton.on("click", handleClick);
const $removeButton = $(".removeButton");
$removeButton.on("click", (e) => {
  e.preventDefault();
  $("img").remove();
});

function createImgandAppend(getUrl) {
  const myImg = document.createElement("img");
  myImg.src = getUrl;
  $("div").append(myImg);
}

// This function gets the URL after the click event is triggered
async function handleClick(event) {
  try {
    const $searchInput = $("input");
    event.preventDefault();
    const searchTerm = $searchInput.val();
    const getImage = await getFromApi(searchTerm);
    const randomGifGetter = Math.floor(Math.random() * 50);
    document.querySelector("input").value = "";
    const getUrl = getImage.data[randomGifGetter].images.original.url;
    createImgandAppend(getUrl);
  } catch {
    return;
  }
}

//This function uses the search term to get the data
async function getFromApi(searchTerm) {
  const response = await axios.get(
    `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`
  );
  return response.data;
}
