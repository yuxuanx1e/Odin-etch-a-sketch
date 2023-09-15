//================================= Function Declarations =====================================
function makeSketchBoard(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    //cell.innerText = (c + 1);

    // Add an event listener to each grid item
    cell.addEventListener('mouseover', 
      e => e.target.classList.add('my-color-class')
    )
    container.appendChild(cell).className = "grid-item";
  };
};

function handleButtonClick() {
  while(1){
    let size = prompt("Please enter the desired board size (Min:1x1, Max100x100):", 16);
    if (size >=1 && size<=100) {

      while (container.hasChildNodes())
        container.removeChild(container.firstChild)

      makeSketchBoard(size, size);
      return;

    }
  }
}

//====================================== Main =================================================
// Select existing elements in DOM
const container = document.getElementById("container");
const button = document.querySelector('#myButton');

let defaultSize = 16; 
makeSketchBoard(defaultSize, defaultSize);

button.addEventListener('click',()=>handleButtonClick());

