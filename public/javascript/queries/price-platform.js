function renderChart(data) {
    console.log("im rendering");
    const divChart = document.querySelector("chart3");
  
    // Assuming you want to visualize the count of games per genre or platform
    const totalGames = data.length;
  
    const seriesData = [
      {
        name: "Price Under $20",
        data: data.map(game => game.price), // Price of the games
      },
    ];
  
    const categories = data.map(game => game.name); // Game names as categories
  
    const options = {
      colors: ["#F44336"],
      series: seriesData,
      xaxis: {
        type: "categories",
        categories: categories,
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
              filename: "strategy-games-under-20",
              columnDelimiter: ",",
              headerCategory: "Game",
              headerValue: "Price",
            },
            svg: {
              filename: "strategy-games-under-20",
            },
            png: {
              filename: "strategy-games-under-20",
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
    return await fetch("/query/platform-review/", { // Updated route to match your new path
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
  