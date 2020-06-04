function init(){
    canvas = document.getElementById('mycanvas')
    W=canvas.width;
    H=canvas.height;
    pen=canvas.getContext('2d')
    game_over=false;
    cs=45;
    score=3;
    //Create a Image object for food
    food_img= new Image();
    food_img.src="Images/apple.png";

    trophy_img=new Image();
    trophy_img.src="Images/trophy.png"

    food = getRandomFood();

    snake ={
        init_len:3,
        color:"blue",
        cells:[],
        direction:"right",

        createSnake:function(){
            for(var i=this.init_len;i>0;i--){   // array is this{{4,0},{3,0},{2,0}}
                this.cells.push({x:i,y:0});     //Array of pairs
            }
        },
        drawSnake:function(){
            for(var i=0; i<this.cells.length;i++){
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },
        updateSnake: function(){

            var headX=this.cells[0].x;
            var headY=this.cells[0].y;
            //If snake eats food, increase length and new food
            if(headX==food.x && headY==food.y){
                food=getRandomFood();
                score++;
            }else{
                this.cells.pop();   // wont increase length
            }
            var nextX,nextY;

            if(this.direction=="right"){
                nextX=headX+1;
                nextY=headY;
            }else if(this.direction=="left"){
                nextX=headX-1;
                nextY=headY;
            }else if(this.direction=="down"){
                nextX=headX;
                nextY=headY+1;
            }else{
                nextX=headX;
                nextY=headY-1
            }
            this.cells.unshift({x:nextX,y:nextY});

            var last_x=Math.round(W/cs);
            var last_y=Math.round(H/cs);

            if(this.cells[0].y<0 || this.cells[0].y>last_y || this.cells[0].x<0||this.cells[0].x>last_x){
                game_over=true;
            }         }
    }

    snake.createSnake();

    //Add a event listner pn the Document Object
    function keyPressed(e){
        if(e.key=="ArrowRight") snake.direction="right";
        if(e.key=="ArrowLeft") snake.direction="left";
        if(e.key=="ArrowUp")    snake.direction="up";
        if(e.key=="ArrowDown") snake.direction="down";
    }

    document.addEventListener('keydown',keyPressed);
}

function draw(){
    // pen.clearRect(0,0,W,H);
    // pen.fillRect(rect.x,rect.y,rect.w,rect.h);

    //Erase old screen===
    pen.clearRect(0,0,W,H)

    pen.fillStyle="blue"
    snake.drawSnake();
    pen.fillStyle=food.color
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs-2,cs-2)

    pen.drawImage(trophy_img,28,15,cs,cs)
    pen.font="20px Roboto"
    pen.fillText(score,cs,cs-2)
}

function update(){
    snake.updateSnake();
}

function getRandomFood(){
    var foodX =Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);

    var food={
        x:foodX,
        y:foodY,
        color:"red"
    }
    return food;
}

function gameloop(){
    if(game_over==true){
        clearInterval(f);
        alert('Your score is '+score+ ' ! Game Over');
    }
    // console.log('In game loop')
    draw();
    update();
}

init();
var f=setInterval(gameloop,100);
