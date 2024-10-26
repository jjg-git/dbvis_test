function renderChart(data) {
    console.log("im rendering");
    const divChart = document.querySelector("div.genre.owners.playtime.chart");
  
    const options = {
      colors: ["#FF9800", "#4CAF50"],
      series: [
        {
          name: "Total Estimated Owners",
          data: data.map(genreData => genreData.total_estimated_owners), // Map total estimated owners
        },
        {
          name: "Average Playtime",
          data: data.map(genreData => genreData.avg_playtime), // Map average playtime
        },
      ],
      xaxis: {
        type: "categories",
        categories: data.map(genreData => genreData.game_genre), // Genres as categories
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
              filename: "genre-owners-playtime",
              columnDelimiter: ",",
              headerCategory: "Genre",
              headerValue: "Value",
            },
            svg: {
              filename: "genre-owners-playtime",
            },
            png: {
              filename: "genre-owners-playtime",
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
    return await fetch("/query/owner-reviews/", { // Updated route to match your new path
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Error " + response.status + ": " + response.statusText);
          throw new Error("Error " + response.status + ": " + response.statusText);
        }
        return response.json();
      })
      .then((json) => json.data) // Extract the data property
      .then((data) => {
        console.log(data);
        renderChart(data);
      })
      .catch((reason) => console.log(reason));
  }
  
  prepareData();
  