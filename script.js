//================================= Function Declarations =====================================
function makeCanvas(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");

    // Add an event listener to each cell
    cell.addEventListener('mouseover', () => updateCell(cell))
      

    container.appendChild(cell).className = "grid-item";
  };
};

// Generate random color in HSL format
// *** NOT USED IN THIS CODE ***
// const getRandomHslColor = () => {
//   // Define an async function that returns a random number within a range
//   const getRandomNumber = (min, max) =>
//     Math.round(Math.random() * (max - min) + min);

//   // Destructure an object that contains three random numbers for hue, saturation and lightness
//   const { hue, saturation, lightness } = {
//     hue: getRandomNumber(0, 360),
//     saturation: getRandomNumber(0, 100),
//     lightness: getRandomNumber(0, 100),
//   };
//   // Return the string with hsl prefix
//   return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
// };


// Generate random color in RGB format
const getRandomRgbColor = () => {
  let r = Math.floor(Math.random() * 256); // Random between 0-255
  let g = Math.floor(Math.random() * 256); // Random between 0-255
  let b = Math.floor(Math.random() * 256); // Random between 0-255
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};

// Convert RGB format to HSL format
const RGBToHSL = (rgb) => {
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  rgb = rgb.substr(4).split(")")[0].split(sep);

  for (let R in rgb) {
    let r = rgb[R];
    if (r.indexOf("%") > -1) 
      rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
  }

  // Make r, g, and b fractions of 1
  let r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;


  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
  cmax = Math.max(r,g,b),
  delta = cmax - cmin,
  h = 0,
  s = 0,
  l = 0;

  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return [h,s,l];
  
};

// Paint a blank/white cell with new color
function paintCell(cell){
  cell.classList.add('painted')

  // Check the paint mode
  if(!rainbowMode){
    cell.style.backgroundColor = "#00FFF0";
  }else{
    cell.style.backgroundColor = getRandomRgbColor();
  }

}

// Shade an already painted/colored cell
function shadeCell(cell){

  // Fetch current color of the cell
  [h, s, l] = RGBToHSL(cell.style.backgroundColor);
  
  // Check if lightness factor is already zero (black color)
  if(l>0){
    l= l-5; 
    // Overflow
    if(l<0){
      l=0;
    }
  }

  // Update cell color
  cell.style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
}

// Update a cell with new color
function updateCell(cell){
  // Paint a blank cell
  if(!cell.classList.contains('painted')){
    paintCell(cell);

  // Shade a painted cell
  }else{
    shadeCell(cell);
  }

  return;
}

// Remove all cells in the canvas
function clearCanvas(){
  while (container.hasChildNodes())
  container.removeChild(container.firstChild)
}


// Remove and create new canvas
function resetCanvas() {
  clearCanvas();
  makeCanvas(canvasSize, canvasSize);
  return;
}

// Resize the canvas
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
//const coloredCell = document.querySelectorAll('#my-color-class'); 

let canvasSize = 16; 
let rainbowMode = true; 

makeCanvas(canvasSize, canvasSize);

resizeButton.addEventListener('click',()=>resizeButtonClick());
clearButton.addEventListener('click',()=>resetCanvas());
