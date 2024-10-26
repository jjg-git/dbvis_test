function renderChart(data) {
    console.log("im rendering");
    const divChart = document.querySelector("chart4");
  
    // Prepare data for the chart
    const seriesData = [];
    const categories = [];
    
    // Assuming you're grouping by year and month for visualization
    const gameCounts = {};
  
    data.forEach(game => {
      const monthYear = `${game.release_year}-${String(game.release_month).padStart(2, '0')}`;
      
      if (!gameCounts[monthYear]) {
        gameCounts[monthYear] = 0;
        categories.push(monthYear); // Push unique month-year combinations as categories
      }
      gameCounts[monthYear]++;
    });
  
    seriesData.push({
      name: "Games Released",
      data: categories.map(category => gameCounts[category] || 0), // Count of games per month-year
    });
  
    const options = {
      colors: ["#F44336"],
      series: seriesData,
      xaxis: {
        type: "categories",
        categories: categories,
        tickPlacement: "on",
      },
      chart: {
        type: "line", // or "bar" if you prefer a bar chart
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
              filename: "action-pvp-releases",
              columnDelimiter: ",",
              headerCategory: "Month-Year",
              headerValue: "Game Count",
            },
            svg: {
              filename: "action-pvp-releases",
            },
            png: {
              filename: "action-pvp-releases",
            },
          },
          autoSelected: "zoom",
        },
        zoom: {
          enabled: true,
          type: "x",
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
    return await fetch("/query/platform-review/", { // Update this route if necessary
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
  