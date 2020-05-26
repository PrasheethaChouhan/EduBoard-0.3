var database;
var canvas;
var drawing = [];
var db_drawing = [];
var clearAll;

function setup(){
    canvas = createCanvas(1200,800);
    context = canvas.getContext('2d');
    database = firebase.database();
    clearAll = createButton("ClearAll");
}

function draw()
{
    background("black");
    readData();
    stroke(255) 
    strokeWeight(5); 
    fill("black");
    for(var i=0; i<db_drawing.length-1; i++)
    { 
        
        //point(db_drawing[i].x,db_drawing[i].y);
        //line(db_drawing[i].x,db_drawing[i].y,db_drawing[i+1].x,db_drawing[i+1].y);
    }
    clearAll.position(displayWidth-150, 100);
    clearAll.mousePressed(()=>{
        alert("please refresh the screen");
        drawing = [];
        db_drawing = [];
        var dbRef = database.ref("drawing")
        dbRef.remove();
        location.reload();
    }) 
}

function mouseDragged()
{
    var point = 
    {
        x : mouseX,
        y : mouseY
    }
    drawing.push(point);
    var drawRef = database.ref("drawing")
    drawRef.set({
        "d" : drawing
    })
}
function readData() 
{ 
    database.ref('drawing/').on('value', (data) => { 
        db_drawing = data.val().d }) 
}