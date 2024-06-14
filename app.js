// Utilidades
function download(filename, text) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Inicio de código
const workspace = document.querySelector("#workspace");

const FONTS = ["Merriweather", "Kanit", "Kode Mono", "Quicksand"];

FONTS.forEach((font) => {
  document.querySelector(
    "#font"
  ).innerHTML += `<option value="${font}">${font}</option>`;
});

document.querySelector("#font").addEventListener("change", () => {
  refreshFont();
});
function refreshFont() {
  workspace.style.fontFamily = document.querySelector("#font").value;
}

document.querySelector("#save-file").addEventListener("click", () => {
  saveFile();
});
function saveFile() {
  const filenameContent = `${document.querySelector("#filename").value}.txt`;
  const workspaceContent = document.querySelector("#workspace").value;

  if (workspaceContent == "" || filenameContent == "") {
    return;
  }

  download(filenameContent, workspaceContent);
}

document.querySelector("#open-file").addEventListener("click", () => {
  document.querySelector("#hid-open-file").click();
});

document.querySelector("#hid-open-file").addEventListener("change", (file_) => {
  loadFile(file_);
});

function loadFile(event) {
  let filesObject = event.target.files;
  let file = filesObject[0];
  if (!file) {
    return;
  }

  let reader = new FileReader();

  reader.onload = function (e) {
    let contents = e.target.result;
    workspace.value = contents;
  };

  reader.readAsText(file);
}

// Inicialización del programa
refreshFont();
