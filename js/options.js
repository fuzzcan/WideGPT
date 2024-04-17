var slider = document.getElementById("widthSlider");
var output = document.getElementById("output");
var chatWindow = document.getElementById("chatWindow");

function saveOptions(e) {
  e.preventDefault();

  browser.storage.sync.set({
    width: document.querySelector("#widthSlider").value,
  });
}

function restoreOptions() {
  function setWidth(result) {
    var widthValue = result.width || 70;
    chatWindow.style.maxWidth = widthValue + "%";
    chatWindow.style.minWidth = widthValue + "%";
    output.innerHTML = widthValue + "%";
    console.log("changeD to " + widthValue);
    document.querySelector("#widthSlider").value = result.width;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  console.log("GETTING SHIT");
  let width = browser.storage.sync.get("width");
  width.then(setWidth, onError);
}

output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value + "%";
  chatWindow.style.maxWidth = this.value + "%";
  chatWindow.style.minWidth = this.value + "%";
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#widthSlider").addEventListener("change", saveOptions);
