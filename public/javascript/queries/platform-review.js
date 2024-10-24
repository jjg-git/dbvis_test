const platforms = document.querySelectorAll(".platform.reviews")
const windowsBox = document.querySelector(".platform.reviews.windows");
const macBox = document.querySelector(".platform.reviews.mac");
const linuxBox = document.querySelector(".platform.reviews.linux");

async function getData(url) {
  console.log("getData");
  const data = fetch(url)
    .then(result => result.json())
    .then(result => {
      console.log("getData::result", result);
      return result;
    })
    .catch(error => {
      console.log(error);
    });

  return data;
}

function getPlatforms() {
  let checkedPlatforms = "";

  for (const platform of platforms) {
    if (platform.checked)
      checkedPlatforms += platform.value + "-";
  }
  checkedPlatforms = checkedPlatforms.slice(0, -1);

  renderChart(checkedPlatforms);
}

windowsBox.onclick = getPlatforms;
macBox.onclick = getPlatforms;
linuxBox.onclick = getPlatforms;

async function renderChart(platforms) {
  console.log("renderChart::platforms =", platforms);

  const data = await getData("/query/platform-review/" + platforms);
  
}

const graphPlatform = document.querySelector("#games-per-platform");


/*
 * TODO: Make that graph
 * */
