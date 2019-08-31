const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

ctx.fillStyle = "white";
ctx.fillRect(0,0,700,700);

let painting = false;
let filling = false;

function stopPainting(event){
    painting =false;
}

function startPainting(event){
    painting = true;
}

function handleColor(event){
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const thickness = event.target.value;
    ctx.lineWidth = thickness;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        if(filling){
            ctx.lineTo(x,y);
            
        }else{
            ctx.lineTo(x,y);
            ctx.stroke();
        }
    }
}

function onMouseDown(event){
    painting = true;
}


function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}
function handleClick(){
    if(filling){
    ctx.fillRect(0,0,700,700);
    }else{

    }
}

function handleContextMenu(event){
    event.preventDefault();
}

function handleSave(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJs[🎨]";
    link.click();
    

}

if (canvas){

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColor));

if(range){
    range.addEventListener("input", handleRangeChange );
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save){
    save.addEventListener("click", handleSave);
}