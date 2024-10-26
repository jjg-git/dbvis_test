function renderChart(data) {
  console.log("im rendering");
  const divChart = document.querySelector("div.genre.achievements.chart");

  const options = {
    colors: ["#F44336", "#3F51B5"],
    series: [
      {
        name: "Achievements",
        data: data.map(game => game.achievements), // Map achievements
      },
      {
        name: "Peak Concurrent Users",
        data: data.map(game => game.peak_ccu), // Map peak concurrent users
      },
    ],
    xaxis: {
      type: "categories",
      categories: data.map(game => game.name), // Game names as categories
      tickPlacement: "on",
    },
    chart: {
      type: "bar",
      redrawOnWindowResize: false,
      redrawOnParentResize: false,
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          csv: {
            filename: "genre-achievements",
            columnDelimiter: ",",
            headerCategory: "Game",
            headerValue: "Value",
          },
          svg: {
            filename: "genre-achievements",
          },
          png: {
            filename: "genre-achievements",
          },
        },
        autoSelected: "zoom",
      },
      zoom: {
        enabled: true,
        type: "y",
        autoScaleYaxis: true,
      },
    },
  };

  console.log(options);
  const graph = new ApexCharts(divChart, options);
  console.log(graph);
  graph.render();
}

async function prepareData() {
  console.log("im preparing");
  return await fetch("/query/achievement-reviews/", { // Updated route
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Error " + response.status + ": " + response.statusText);
        throw new Error("Error " + response.status + ": " + response.statusText);
      }
      const json = response.json();
      console.log("johnsons johnsons", json);
      return json;
    })
    .then((json) => json.data) // Extract data property from the response
    .then((data) => {
      console.log(data);
      renderChart(data);
    })
    .catch((reason) => console.log(reason));
}

prepareData();
