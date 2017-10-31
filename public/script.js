var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');

var speed=1;
var x=canvas.width/2;
var y=canvas.height-30;
var dx=4;
var dy=-4;
var ballRadius=10;
var PaddleHeight=10;
var PaddleWidth=75;
var PaddleX=(canvas.width-PaddleWidth)/2;
var rightPressed=false;
var leftPressed=false;
var brickRowCount=7;
var brickColumnCount=7;
var brickPadding=10;
var brickWidth=75;
var brickHeight=20;
var brickOffsetTop=30;
var brickOffsetLeft=10;
var score=0;
var lives=3;
var pauseGame= false;

var bricks=[];
for(c=0;c<brickColumnCount;c++){
  bricks[c]=[];
  for(r=0;r<brickRowCount;r++){
    bricks[c][r]={x:0,y:0,status: 1};
  }
}

document.addEventListener("keydown",(e)=>{
  if(e.keyCode==39){
    rightPressed=true;
  }
  else if(e.keyCode==37){
    leftPressed=true;
  }
  else if(e.keyCode==80) {
	    	if (pauseGame==true)
	        	pauseGame=false;
	        else
	        	pauseGame=true;
	    }
});

document.addEventListener("keyup",(e)=>{
  if(e.keyCode==39){
    rightPressed=false;
  }
  else if(e.keyCode==37){
    leftPressed=false;
  }
});

document.addEventListener("mousemove",(e)=>{
  var relativeX=e.clientX-canvas.offsetLeft;
  if(relativeX>0+PaddleWidth/2 && relativeX<canvas.width-PaddleWidth/2){
    PaddleX=relativeX-PaddleWidth/2;
  }
});

function choose_level(rate){
  speed=rate;
  dx=rate*4;
  dy=-rate*4;
}

function drawBricks(){
  for(c=0;c<brickColumnCount;c++){
    for(r=0;r<brickRowCount;r++){
      if(bricks[c][r].status===1){
          var brickX=(c*(brickWidth+brickPadding)+brickOffsetLeft);
          var brickY=(r*(brickHeight+brickPadding)+brickOffsetTop);
          bricks[c][r].x=brickX;
          bricks[c][r].y=brickY;
          ctx.beginPath();
          ctx.rect(brickX,brickY,brickWidth,brickHeight);
          ctx.fillStyle="Green";
          ctx.fill();
          ctx.closePath();
        }
    }
  }
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(PaddleX,canvas.height-PaddleHeight,PaddleWidth,PaddleHeight);
  ctx.fillStyle="Blue";
  ctx.fill();
  ctx.closePath();
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x,y,ballRadius,0,Math.PI*2);
  ctx.fillStyle="Red";
  ctx.fill();
  ctx.closePath();
}

function collsionDetection(){
  for(c=0;c<brickColumnCount;c++){
    for(r=0;r<brickRowCount;r++){
      var b=bricks[c][r];
      if(b.status==1)
      {
        if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
          b.status=0;
          dy=-dy;
          score++;
          if(score==brickRowCount*brickColumnCount){
            alert("YOU WIN,Congratulations");
            document.location.href="https://thebreakout.herokuapp.com/"
          }
      }
    }
    }
  }
}

function drawScore(){
  ctx.font="16px Arial";
  ctx.fillStyle='rgba(0,15,64,.89)';
  ctx.fillText("Score: "+score,8,20);
}

function drawLives(){
  ctx.font="16px Arial";
  ctx.fillStyle='rgba(0,15,64,.89)';
  ctx.fillText("Lives: "+lives,canvas.width-65,20);
}

function pause(millis)
	{
	    var date = new Date();
	    var curDate = null;
	    do { curDate = new Date(); }
	    while(curDate-date < millis);
	}

function draw(){
  if (pauseGame == false) {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collsionDetection();
  drawScore();
  drawLives();
  if(y-ballRadius+dy<0){
    dy=-dy;
  }
  else if(y+ballRadius+dy>canvas.height){
    if(x>PaddleX && x<PaddleX+PaddleWidth){
      dy=-dy
    }
    else {
      lives--;
      if(!lives){
        alert("GAME OVER");
        document.location.href="http://localhost:3000"
      }
      else {
        x=canvas.width/2;
        y=canvas.height-30;
        choose_level(speed);
        PaddleX=(canvas.width-PaddleWidth)/2;
         pause(500);
      }
    }
  }

  if(x-ballRadius+dx<0 || x+ballRadius+dx>canvas.width){
    dx=-dx;
  }

  if(rightPressed && PaddleX<canvas.width-PaddleWidth){
    PaddleX+=7;
  }
  else if(leftPressed && PaddleX>0){
    PaddleX-=7;
  }
  x+=dx;
  y+=dy;
}
  requestAnimationFrame(draw);
}
draw();
