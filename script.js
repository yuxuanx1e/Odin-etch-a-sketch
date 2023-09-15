//================================= Function Declarations =====================================
function makeCanvas(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");

    // // Add an event listener to each grid item
    // cell.addEventListener('mouseover', 
    //   e => e.target.classList.add('my-color-class')
    // )

    // cell.addEventListener('mouseover', 
    //   e => e.target.style.backgroundColor = "#00FF00")

    cell.addEventListener('mouseover', () => paintCell(cell))
      

    container.appendChild(cell).className = "grid-item";
  };
};

const getRandomHslColor = () => {
  // Define an async function that returns a random number within a range
  const getRandomNumber = (min, max) =>
    Math.round(Math.random() * (max - min) + min);

  // Destructure an object that contains three random numbers for hue, saturation and lightness
  const { hue, saturation, lightness } = {
    hue: getRandomNumber(0, 360),
    saturation: getRandomNumber(0, 100),
    lightness: getRandomNumber(0, 100),
  };
  // Return the string with hsl prefix
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};


// define a reusable function
const getRandomRgbColor = () => {
  let r = Math.floor(Math.random() * 256); // Random between 0-255
  let g = Math.floor(Math.random() * 256); // Random between 0-255
  let b = Math.floor(Math.random() * 256); // Random between 0-255
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;

  hue = 60 * h < 0 ? 60 * h + 360 : 60 * h;
  saturation = 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0);
  lightness = (100 * (2 * l - s)) / 2; 

  // Return the string with hsl prefix
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

function paintCell(cell){

  // Paint a blank cell
  if(!cell.classList.contains('painted')){
    cell.classList.add('painted')
    if(!rainbowMode){
      cell.style.backgroundColor = "#00FFF0";
    }else{
      cell.style.backgroundColor = getRandomRgbColor();
    }

  // Shade a painted cell
  }else{

    return;
  }



}

function clearCanvas(){
  while (container.hasChildNodes())
  container.removeChild(container.firstChild)
}

function resetCanvas() {
  clearCanvas();
  makeCanvas(canvasSize, canvasSize);
  return;
}

function resizeButtonClick() {
  while(1){
    canvasSize = prompt("Please enter the desired canvas size (Min:1x1, Max:100x100):", 16);
    if (canvasSize >=1 && canvasSize<=100) {

      resetCanvas();
      return;

    }
  }
}





//====================================== Main =================================================
// Select existing elements in DOM
const container = document.getElementById("container");
const resizeButton = document.querySelector('#resizeButton');
const clearButton = document.querySelector('#clearButton');
const coloredCell = document.querySelectorAll('#my-color-class'); 

let canvasSize = 16; 
let rainbowMode = true; 

makeCanvas(canvasSize, canvasSize);

resizeButton.addEventListener('click',()=>resizeButtonClick());
clearButton.addEventListener('click',()=>resetCanvas());
