const platformRadios = document.querySelectorAll("input.platform.review.radio");
const platformBoxes = document.querySelectorAll("input.platform.review.include");
const platformForm = document.querySelector("form.platform.review");


function checkPlatform(classList, className) {
  return classList.indexOf(className) != -1;
}

function setDisableForm(disabled) {
  for (const input of document.querySelectorAll("input.platform.review")) {
    input.disabled = disabled;
  }
}

function isAllOff(platforms) {
  let isAllOff = true;
  
  for (const platform in platforms) {
    if (platforms[platform]["include"] == true) {
      isAllOff = false;
      break;
    }
  }

  return isAllOff;
}

function getOptions() {
  const form = platformForm.elements;
  const platforms = {
    windows: {
      available: form.windows.value == "on",
      include: form.windowsInclude.checked
    },
    mac: {
      available: form.mac.value == "on",
      include: form.macInclude.checked
    },
    linux: {
      available: form.linux.value == "on",
      include: form.linuxInclude.checked
    }
  }

  return platforms;
}


async function requestData(platforms) {
  fetch('/query/platform-review/', {
    method: "POST",
    body: JSON.stringify(platforms),
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(response => {
    if (!response.ok) {
      console.log(`Error ${response.status} ${response.statusText}`);
      throw new Error(`Error ${response.status} ${response.statusText}`);
    }
  })
  .catch(error => {
    console.log(error);
  })
}

async function takeData() {
  const data = await fetch('/query/platform-review/', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(request => {
      if (request.ok) {
        console.log("data =", data);
        return request.json();
      }

      throw new Error(`Error ${request.status}: ${request.statusText}`);
    })
    .catch(err => console.log(err));

  return data;
}

async function getData(platforms) {
  setDisableForm(true);
  await requestData(platforms);
  const data = await takeData();
  setDisableForm(false);

  return data;
} 

async function getDataAllPlatforms() {
  const data = fetch('/query/paltfor-review/all',{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    response.json();
  })
  .catch(error => {
    throw new Error(error);
  });

  return data;
}

/*
 * TODO: Make that graph
 * */

async function renderGraph(platforms)
{
  const data = await getData();

}

async function choosePlatform() {
  const platforms = getOptions();  
  if (isAllOff(platforms))
    return;

  renderGraph(platforms);
}


const windowsInclude = document.querySelector("input.platform.review.windows.include");
const macInclude = document.querySelector("input.platform.review.mac.include");
const linuxInclude = document.querySelector("input.platform.review.linux.include");


for (const radio of platformRadios) {
  radio.onclick = function(ev) {
    choosePlatform();
  }
}

const windowsDisabled = () => {
  document.querySelector("fieldset.platform.review.windows.radio").disabled = !windowsInclude.checked; 
  choosePlatform();
}
const macDisabled = () => {
  document.querySelector("fieldset.platform.review.mac.radio").disabled = !macInclude.checked; 
  choosePlatform();
}
const linuxDisabled = () => {
  document.querySelector("fieldset.platform.review.linux.radio").disabled = !linuxInclude.checked; 
  choosePlatform();
}

windowsInclude.onclick = windowsDisabled;
windowsInclude.onload = windowsDisabled;
macInclude.onclick = macDisabled;
macInclude.onload = macDisabled;
linuxInclude.onclick = linuxDisabled;
linuxInclude.onload = linuxDisabled;
