var col,row;
var w=20;
var grid=[];
var nvis=[];
var current;
// Created a setup for the displayed of grid.
function setup() {
  
  createCanvas(1000,1000);
  
  col= floor(width/w);
  row = floor(height/w);
  frameRate(20);
  for(var i=0;i<row;i++){
    for(var j=0;j<col;j++){ 
        var cell = new Cell(i,j);
        grid.push(cell);
        }
  }
  var x1=col/2,y1=row/2;
  var c1= new Cell(x1,y1);
  current=c1;
}

// Created a new function for the grid manipulation and also for current cell
function draw() {
  background(255,255,255);
  for(var i=0;i<grid.length;i++){
     grid[i].show();
  }
  var next=current.nkb();
  current.visited=1;
  current.pos();
  if(next )
  {
    //removewall(current,next);
    current=next;
  }
}
// created a function for removsl of the walls of cells if selected 
function removewall(a,b)
{
  var x= b.i-a.i;
  var y = b.j-a.j;
  if(x==1) {
    a.wall[1]=0;b.wall[3]=0;
  }
  if(x==-1) {
    a.wall[3]=0;b.wall[1]=0;
  }
  if(y==1) {
    a.wall[2]=0;b.wall[0]=0;
  }
  if(y==-1) {
    a.wall[0]=0;b.wall[2]=0;
  }
}

function ind(i,j)
{
  if(i<0 || j<0 || i > col-1 || j > row-1){ return -1;}
  return j + (i) * col;
}
// Created a cell function for selecting the next from all four cells from the given cells
function Cell(i,j)
{
  this.i=i;
  this.j=j;
  this.visited=false;
  this.wall=[1,1,1,1];
  this.pushed=false;
  this.pos= function()
  {
    var x= (this.i) * w;
    var y= (this.j) * w;  
    fill(255, 255, 102);
    rect(x,y,w,w);
  }
//   Select any one of the unexplored neighbour from all 4 and save the other to the stack to revisit again them
  this.nkb= function()
  {
    
    var top= grid[ind(i,j-1)];
    var right= grid[ind(i+1,j)];
    var bot= grid[ind(i,j+1)];
    var left= grid[ind(i-1,j)];
//     If the cell is not visited and unexplored
    if(bot && !bot.visited && !bot.pushed)
    { nvis.push(bot);bot.pushed=1;}
    if(left && !left.visited && !left.pushed)
    { nvis.push(left);left.pushed=1;}
    if(top && !top.visited && !top.pushed)
    { nvis.push(top);top.pushed=1;}
    if(right && !right.visited && !right.pushed) 
    { nvis.push(right);right.pushed=1;}
    if(nvis.length > 0){
      var nc= nvis[0];
      nvis.splice(0,1);
      return nc;
    }
    else
    {
//       if all the cells are visited and are empty return null
        return undefined;
    }
  }
  
  this.show = function()
  {
    var x= (this.i) * w;
    var y= (this.j) * w;   
    stroke(128, 229, 255);
    if(this.wall[0] ) {line(x,y,x+w,y);}
    if(this.wall[1]) {line(x+w,y,x+w,y+w);}
    if(this.wall[2]) {line(x+w,y+w,x,y+w);}
    if(this.wall[3]) {line(x,y+w,x,y);}
    if(this.visited)
    {
      
      noStroke();
      fill(0, 204, 204);
      rect(x,y,w,w);
    }
  }
}
