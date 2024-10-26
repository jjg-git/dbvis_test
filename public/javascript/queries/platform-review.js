function renderChart(data) {
  console.log("im rendering")
  const divChart = document.querySelector("div.platform.review.chart");
  const options = {
    colors: ["#F44336", "#E91E63", "#9C27B0"],
    series: [
      {
        name: "Games",
        data: [data.basic.windows, data.basic.mac, data.basic.linux],
      },
      {
        name: "Exclusives",
        data: [
          data.exclusive.windows,
          data.exclusive.mac,
          data.exclusive.linux,
        ],
      },
    ],
    xaxis: {
      type: "categories",
      categories: ["Windows", "Mac", "Linux"],
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
            filename: "platform-review",
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
          },
          svg: {
            filename: "platform-review",
          },
          png: {
            filename: "platform-review",
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
  console.log("im preparing")
  return await fetch("/query/platform-review/", {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if (!response.ok) {
      console.log("Error " + response.status + ": " + response.statusText);
      throw new Error(
        "Error " + response.status + ": " + response.statusText
      );
    }
    const json = response.json();
    console.log("johnsons johnsons", json);
    return json;
  })
  .then((json) => json.data)
  .then((data) => {
    console.log(data);
    renderChart(data);
  })
  .catch((reason) => console.log(reason));
}

const data = prepareData();
renderChart(data);


