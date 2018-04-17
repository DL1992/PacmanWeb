var canvas;
var context;
var pacman_shape=new Object();
var red_ghost_shape =new Object();
var blue_ghost_shape = new Object();
var green_ghost_shape = new Object();
var cherry_shape = new Object();
var pacman_remain;
var cherry_remain;
var board;
var food_board;
var score;
var pac_color;
var num_ghost;
var start_time;
var time_elapsed;    
var timeToPlaySetting; 
var food_setting; 
var interval;
var key_pressed=0;
var food_remain;
var draw_count=0;

function PageLoaded()
{
    ShowSection('welcome_div');
}

function ShowSection(id)
{
    //hide all sections
    var welcome_div = document.getElementById('welcome_div');
    welcome_div.style.display="none";
    var registertion_div = document.getElementById('registertion_div');
    registertion_div.style.display="none";
    var login_div = document.getElementById('login_div');
    login_div.style.display="none";
    var choose_div = document.getElementById('choose_div');
    choose_div.style.display="none";
    var canvas_div = document.getElementById('canvas_div');
    canvas_div.style.display="none";
    var lose_div = document.getElementById('lose_div');
    lose_div.style.display="none";
    var win_div = document.getElementById('win_div');
    win_div.style.display="none";
    var instructions_div = document.getElementById('instructions_div');
    instructions_div.style.display="none";
    var score_div = document.getElementById('score_div');
    score_div.style.display="none";
    var canvas_div = document.getElementById('canvas_div');
    canvas_div.hidden = true;
    var canvas_div1 = document.getElementById('canvas_div1');
    canvas_div1.style.visibility="hidden";

    //show only one section
    var selected = document.getElementById(id);
    if(id == 'canvas_div')
    {
        selected.hidden = false;
        var selected2 = document.getElementById(id + "1");
        selected2.style.visibility="visible";
    }
    selected.style.display="block";
    background_music.pause();
}



function Start(ballsCounter, timeToPlay, enemyCounter) {
    background_music.play();
    food_setting = parseInt(ballsCounter);
    timeToPlaySetting = parseInt(timeToPlay);
    num_ghost = parseInt(enemyCounter);
    timeToPlaySetting = (isNaN(timeToPlaySetting) ? 60 : timeToPlaySetting);
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    board = new Array();
    food_board = new Array();
    pac_color="yellow";
    pacman_remain = 3;
    cherry_remain = 1
    food_remain = food_setting;
    score = 0;
    var red_food = food_remain*0.6;
    var green_food = food_remain*0.3;
    var blue_food = food_remain*0.1;
    start_time= new Date();
    setBoards();
    setFood(board,food_board,food_remain,red_food,blue_food,green_food);
    keysDown = {};
    addEventListener("keydown", function (e) {
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    interval=setInterval(UpdatePosition, 125);
}

function setBoards(){
    for (var i = 0; i < 13; i++) {
        board[i] = new Array();
        food_board[i] = new Array();
    }
    for (var i = 0; i < 13; i++) {
        for (var j = 0; j < 13; j++) {
            board[i][j]=0;
            food_board[i][j] = 0;
        }
    }
    setWalls();
    setPacmen();
    setGhosts();
}

function setWalls(){
    var walls = /*2;*/ Math.floor((Math.random() * 4) + 1);
    switch (walls){
        case 1:
            buildWalls1();
            break;
        case 2:
            buildWalls2();
            break;
        case 3:
            buildWalls3();
            break;
        case 4:
            buildWalls4();
            break;
    }
}

function buildWalls1(){
    board[0][4] = 4; board[0][5] =4;
    board[9][4] = 4; board[9][5] =4; 
    board[1][1] =4; board[1][2] =4; board[1][7] =4; board[1][8] =4;
    board[2][1] =4; board[2][2] =4; board[2][7] =4; board[2][8] =4;
    board[7][1] =4; board[7][2] =4; board[7][7] =4; board[7][8] =4;
    board[8][1] =4; board[8][2] =4; board[8][7] =4; board[8][8] =4;
    board[4][0] =4; board[4][4] =4; board[4][5] =4; board[4][9] =4;
    board[5][0] =4; board[5][4] =4; board[5][5] =4; board[5][9] =4;
}
function buildWalls2(){
    board[1][4] = 4; board[1][5] =4;
    board[2][3] = 4; board[2][6] =4;
    board[3][2] = 4; board[3][7] =4;
    //board[4][0] = 4; 
    board[4][9] =4;
    board[5][0] = 4; board[5][9] =4;
    board[6][2] = 4; board[6][7] =4;
    board[7][3] = 4; board[7][6] =4;
}

function buildWalls3(){
    board[0][1] = 4; board[0][8] =4;
    board[1][1] = 4; board[1][8] =4;
    board[2][4] = 4; board[2][5] =4;
    board[7][4] = 4; board[7][5] =4;
    board[8][1] = 4; board[9][1] =4;
    board[8][8] = 4; board[9][9] =4;
    board[3][1] = 4; board[3][2] =4;board[3][3] = 4; board[3][4] =4;
    board[3][5] = 4; board[3][6] =4;board[3][7] = 4; board[3][8] =4;
    board[6][1] = 4; board[6][2] =4;board[6][3] = 4; board[6][4] =4;
    board[6][5] = 4; board[6][6] =4;board[6][7] = 4; board[6][8] =4;
}

function buildWalls4(){
    board[1][1] = 4; board[1][2] =4;board[1][3] = 4; board[5][4] =4;
    board[5][5] = 4; board[5][6] =4;board[7][7] = 4; board[7][8] =4;
    board[1][8] = 4; board[1][9] =4;
    
}

function setPacmen(){
    var emptyCell = findRandomEmptyCell(board);
    pacman_shape.i=emptyCell[0];
    pacman_shape.j=emptyCell[1];
    board[pacman_shape.i][pacman_shape.j] = 2;  //2 in the 2d array is pacman
}

function setGhosts(){
    switch (num_ghost){
        case 1:
            red_ghost_shape.i = 0;
            red_ghost_shape.j = 0;
            board[0][0] = 5;
            break;
        case 2:
            red_ghost_shape.i = 0;
            red_ghost_shape.j = 0;
            blue_ghost_shape.i = 0;
            blue_ghost_shape.j = 12;
            board[0][0] = 5;
            board[0][12] = 6;
            break;
        case 3:
            red_ghost_shape.i = 0;
            red_ghost_shape.j = 0;
            blue_ghost_shape.i = 0;
            blue_ghost_shape.j = 12;
            green_ghost_shape.i = 12;
            green_ghost_shape.j = 12;
            board[0][0] = 5;
            board[0][12] = 6;
            board[12][12] = 7;
            break;
    }
}

function setFood(board,food_board,food_remain,red_food,blue_food,green_food){
    cherry_shape.i = 12;
    cherry_shape.j = 0;
    board[12][0] = 10 // 10 is cherry;
    while(food_remain>0){
        var emptyCell = findRandomEmptyCell(board);
        if(red_food>0){
            board[emptyCell[0]][emptyCell[1]] = 1; //1 is red_food
            food_board[emptyCell[0]][emptyCell[1]] = 1;
            red_food--;
        }
        else if(blue_food>0){
            board[emptyCell[0]][emptyCell[1]] = 8; //8 is blue_food
            food_board[emptyCell[0]][emptyCell[1]] = 8;
            blue_food--;
        }
        else if(green_food>0){
            board[emptyCell[0]][emptyCell[1]] = 9; //9 is green_food
            food_board[emptyCell[0]][emptyCell[1]] = 9;
            green_food--;
        }
        food_remain--;
    }
    food_remain = food_setting;
}



 function findRandomEmptyCell(board){
     var i = Math.floor((Math.random() * 12) + 1);
     var j = Math.floor((Math.random() * 12) + 1);
    while(board[i][j]!=0 || (i==0 && j==0) || (i==12 && j==12) || (i==0 && j==12) || (i==12 && j==0))
    {
         i = Math.floor((Math.random() * 12) + 1);
         j = Math.floor((Math.random() * 12) + 1);
    }
    return [i,j];             
 }

function GetKeyPressed() {
    if (keysDown[38]) { //up
        key_pressed=1;
        return 1;
    }
    if (keysDown[40]) {  //down
        key_pressed=2;
        return 2;
    }
    if (keysDown[37]) { //left
        key_pressed=3;
        return 3;
    }
    if (keysDown[39]) { //right
        key_pressed=4;
        return 4;
    }
}

function drawPacman(center){
    if(key_pressed==3){
        context.beginPath();
        context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color 
        context.fill();
        context.beginPath();
        context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color 
        context.fill();
    }else if(key_pressed==4){
        context.beginPath();
        context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color 
        context.fill();
        context.beginPath();
        context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color 
        context.fill();
    }else if(key_pressed==2){
        context.beginPath();
        context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color 
        context.fill();
        context.beginPath();
        context.arc(center.x -15 , center.y - 5, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color 
        context.fill();
    }else if(key_pressed==1){
        context.beginPath();
        context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color 
        context.fill();
        context.beginPath();
        context.arc(center.x -15, center.y - 5, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color 
        context.fill();
    }
    
}

function Draw() {
    canvas.width=canvas.width; //clean board
    lblLives.value = pacman_remain;
    lblScore.value = score;
    lblTime.value = (timeToPlaySetting-time_elapsed).toFixed(2);
    for (var i = 0; i < 13; i++) {
        for (var j = 0; j < 13; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] == 2) {
                if(key_pressed==0){ //2 in the 2d array is pacman
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color 
                    context.fill();
                } else{
                    drawPacman(center);
                }
                
               
            } else if (board[i][j] == 1 || board[i][j] == 8 || board[i][j] == 9) { //1 in the 2d array is food
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                if (board[i][j] == 1){
                    context.fillStyle = "red"; //color 
                } else if (board[i][j] == 8){
                    context.fillStyle = "blue"; //color 
                } else if (board[i][j] == 9){
                    context.fillStyle = "green"; //color 
                }
                context.fill();
            } else if (board[i][j] == 4) { //4 in the 2d array is wall
                context.beginPath();
                context.rect(center.x-30, center.y-30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            } else if (board[i][j] == 5 || board[i][j] == 6 || board[i][j] == 7) { //5.6.7 in the 2d array are ghosts
                img = new Image();
                if(board[i][j] == 5){
                    img.src = 'redGhost.png';
                } else if ( board[i][j] == 6 ){
                    img.src = 'blueGhost.png';
                } else if( board[i][j] == 7 ){
                    img.src = 'greenGhost.png';
                }
                context.drawImage(img,center.x-30,center.y-30,60,60);
            } else if (board[i][j] ==10) { // 10 is cherry
                cherry_img = new Image();
                cherry_img.src = 'Cherry.png';
                context.drawImage(cherry_img,center.x-30,center.y-30,45,45);
            } else if (board[i][j] ==11) { // 11 is cherry
                clock_img = new Image();
                clock_img.src = 'clock.png';
                context.drawImage(clock_img,center.x-30,center.y-30,45,45);
            }
        }
    }  
}


function UpdatePosition() {
    board[pacman_shape.i][pacman_shape.j]=0;
    if(draw_count % 3 == 0){
        updateGhostsPosition();
    }
    if (draw_count== timeToPlaySetting*0.35*2 || draw_count == timeToPlaySetting*0.75*2.5){
        var clock = findRandomEmptyCell(board);
        board[clock[0]][clock[1]] = 11;
    }
    draw_count++;
    if (cherry_remain==1 && (draw_count % 2==0)){
        updateCherryPosition();
        board[cherry_shape.i][cherry_shape.j] = 10;
    }
    var x = GetKeyPressed()
    if(x==1)
    {
        if(pacman_shape.j>0 && board[pacman_shape.i][pacman_shape.j-1]!=4)
        {
            pacman_shape.j--;
        }
    }
    if(x==2)
    {
        if(pacman_shape.j<12 && board[pacman_shape.i][pacman_shape.j+1]!=4)
        {
            pacman_shape.j++;
        }
    }
    if(x==3)
    {
        if(pacman_shape.i>0 && board[pacman_shape.i-1][pacman_shape.j]!=4)
        {
            pacman_shape.i--;
        }
    }
    if(x==4)
    {
        if(pacman_shape.i<12 && board[pacman_shape.i+1][pacman_shape.j]!=4)
        {
            pacman_shape.i++;
        }
    }
    if(board[pacman_shape.i][pacman_shape.j]==1){
        var audio = new Audio('pacman_bip.mp3');
        audio.play();
        food_board[pacman_shape.i][pacman_shape.j]=0;
        food_remain--;
        score+=5;
    } else if(board[pacman_shape.i][pacman_shape.j]==8){
        var audio = new Audio('pacman_bip.mp3');
        audio.play();
        food_board[pacman_shape.i][pacman_shape.j]=0;
        food_remain--;
        score +=25;
    } else if(board[pacman_shape.i][pacman_shape.j]==9){
        var audio = new Audio('pacman_bip.mp3');
        audio.play();
        food_board[pacman_shape.i][pacman_shape.j]=0;
        food_remain--;
        score +=15;
    }
    else if(board[pacman_shape.i][pacman_shape.j]==10){
        var audio = new Audio('pacman_eatfruit.wav');
        audio.play();
        cherry_remain--;
        // alert('cherry');
        score +=50;
        
    }else if(board[pacman_shape.i][pacman_shape.j]==11){
        board[pacman_shape.i][pacman_shape.j]=0;
        timeToPlaySetting+=5;
    }
    for(var i= 0; i < 13 ; i++){
        for(var j=0; j < 13; j++){
            if(food_board[i][j]!=0){
                board[i][j] = food_board[i][j];
            }
        }
    }
    board[pacman_shape.i][pacman_shape.j]=2;
    if(num_ghost == 1){
        board[red_ghost_shape.i][red_ghost_shape.j] = 5;
    }else if(num_ghost == 2){
        board[red_ghost_shape.i][red_ghost_shape.j] = 5;
        board[blue_ghost_shape.i][blue_ghost_shape.j] = 6;
    }else if(num_ghost == 3){
        board[red_ghost_shape.i][red_ghost_shape.j] = 5;
        board[blue_ghost_shape.i][blue_ghost_shape.j] = 6;
        board[green_ghost_shape.i][green_ghost_shape.j] = 7;
    }

    if(cherry_remain==1){
        board[cherry_shape.i][cherry_shape.j] = 10;
    }
    
    if(board[pacman_shape.i][pacman_shape.j]==5 || board[pacman_shape.i][pacman_shape.j]==6 || board[pacman_shape.i][pacman_shape.j]==7){
        ghoseCollision(board);
    }
    var currentTime=new Date();
    time_elapsed=(currentTime-start_time)/1000;
    if(score>=20&&time_elapsed<=10)
    {
        pac_color="green";
    }
    if(timeToPlaySetting-time_elapsed <= 0){
        background_music.pause();
        window.clearInterval(interval);
        if(score < 150 ){
            h3score.innerText  = "You can do better scrub\n\n your score was just: " + score + " points";
        }
        else{
            h3score.innerText  = "We have a winner!\n\n your score was: " + score + " points";
        }
        ShowSection('score_div');
    }
    if(pacman_remain==0 )
    {
        background_music.pause();
        window.clearInterval(interval);
        ShowSection('lose_div');
    }else if(food_remain==0){
        background_music.pause();
        window.clearInterval(interval);
        ShowSection("win_div");
    }
    else
    {
        Draw();
    }
}

function updateCherryPosition(){
    board[cherry_shape.i][cherry_shape.j]=0;
    var move = Math.floor((Math.random() * 4) + 1);
    if(move==1)
    {
        if(cherry_shape.j>0 && board[cherry_shape.i][cherry_shape.j-1]!=4)
        {
            cherry_shape.j--;
        }
    }
    if(move==2)
    {
        if(cherry_shape.j<12 && board[cherry_shape.i][cherry_shape.j+1]!=4)
        {
            cherry_shape.j++;
        }
    }
    if(move==3)
    {
        if(cherry_shape.i>0 && board[cherry_shape.i-1][cherry_shape.j]!=4)
        {
            cherry_shape.i--;
        }
    }
    if(move==4)
    {
        if(cherry_shape.i<12 && board[cherry_shape.i+1][cherry_shape.j]!=4)
        {
            cherry_shape.i++;
        }
    }

}

function ghoseCollision(board){
    var audio = new Audio('pacman_death.wav');
    audio.play();
    if(num_ghost == 1)
    {
        board[red_ghost_shape.i][red_ghost_shape.j]=0;
    }
    if(num_ghost == 2)
    {
        board[red_ghost_shape.i][red_ghost_shape.j]=0;
        board[blue_ghost_shape.i][blue_ghost_shape.j]=0;
    }
    if(num_ghost == 3)
    {
        board[red_ghost_shape.i][red_ghost_shape.j]=0;
        board[blue_ghost_shape.i][blue_ghost_shape.j]=0;
        board[green_ghost_shape.i][green_ghost_shape.j]=0;
    }
    pacman_remain--;
    setPacmen();
    setGhosts();
    
}

function updateGhostsPosition(){
    if(num_ghost == 1){
        updateGhostPosition(red_ghost_shape);
    }else if(num_ghost == 2){
        updateGhostPosition(red_ghost_shape);
        updateGhostPosition(blue_ghost_shape);
    }else if(num_ghost == 3){
        updateGhostPosition(red_ghost_shape);
        updateGhostPosition(blue_ghost_shape);
        updateGhostPosition(green_ghost_shape);
    }  
}

function updateGhostPosition(ghost_shape){
    board[ghost_shape.i][ghost_shape.j]=0;
    switch (direction(ghost_shape)){
        case 1:
            if(!tryMoveUp(ghost_shape)){
                if(!tryMoveLeft(ghost_shape)){
                    if(!tryMoveRight(ghost_shape)){
                        tryMoveDown(ghost_shape);
                    }
                }
            }
            break;
        case 2:
            if(!tryMoveDown(ghost_shape)){
                if(!tryMoveLeft(ghost_shape)){
                    if(!tryMoveUp(ghost_shape)){
                        tryMoveRight(ghost_shape)
                    }
                }
            }
            break;
        case 3:
           if (!tryMoveLeft(ghost_shape)){
               if(!tryMoveUp(ghost_shape)){
                   if(!tryMoveDown(ghost_shape)){
                       tryMoveRight(ghost_shape);
                   }
               }
           }
            break;
        case 4:
            if(!tryMoveUp(ghost_shape)){
               if(!tryMoveRight(ghost_shape)){
                   if(!tryMoveDown(ghost_shape)){
                       tryMoveRight(ghost_shape);
                   }
               }
            }
            break;
        case 5:
            if(!tryMoveDown(ghost_shape)){
                if(!tryMoveRight(ghost_shape)){
                    if(!tryMoveUp(ghost_shape)){
                        tryMoveLeft(ghost_shape);
                    }
                }
            }
            break;
        case 6:
            if(!tryMoveRight(ghost_shape)){
                if(!tryMoveDown(ghost_shape)){
                    if(!tryMoveUp(ghost_shape)){
                        tryMoveLeft(ghost_shape);
                    }
                }
            }
            break;
        case 7:
            if(!tryMoveUp(ghost_shape)){
                if(!tryMoveRight(ghost_shape)){
                    if(!tryMoveDown(ghost_shape)){
                        tryMoveLeft(ghost_shape);
                    }
                }
            }
            break;
        case 8:
            if(!tryMoveDown(ghost_shape)){
                if(!tryMoveRight(ghost_shape)){
                    if(!tryMoveUp(ghost_shape)){
                        tryMoveLeft(ghost_shape);
                    }
                }
            }
            break;
    }
}

function tryMoveUp(ghost_shape){
    if(0<ghost_shape.j && board[ghost_shape.i][ghost_shape.j-1]!=4){
        ghost_shape.j--;
        return true;
    }
    return false;
}

function tryMoveDown(ghost_shape){
    if(12>ghost_shape.j && board[ghost_shape.i][ghost_shape.j+1]!=4){
        ghost_shape.j++;
        return true;
    }
    return false;
}

function tryMoveLeft(ghost_shape){
    if( 0<ghost_shape.i && board[ghost_shape.i-1][ghost_shape.j]!=4){
        ghost_shape.i--;
        return true;
    }
    return false;
}

function tryMoveRight(ghost_shape){
    if(12>ghost_shape.i && board[ghost_shape.i+1][ghost_shape.j]!=4){
        ghost_shape.i++;
        return true;
    }
    return false;
}

function direction(ghost_shape){
    var il;
    if (ghost_shape.i > pacman_shape.i){
        if (ghost_shape.j > pacman_shape.j){
            il = 1;
        } else if(ghost_shape.j < pacman_shape.j){
            il = 2;
        } else{
            il=  3;
        }
    }else if(ghost_shape.i < pacman_shape.i){
        if (ghost_shape.j > pacman_shape.j){
            il = 4;
        } else if(ghost_shape.j < pacman_shape.j){
            il = 5;
        } else{
            il = 6;
        }
    }else if (ghost_shape.j > pacman_shape.j){
        il = 7;
    } else if(ghost_shape.j < pacman_shape.j){
        il = 8;
    }
    // window.alert(il);
    return il;
}

function showAbout(){
    var modal = document.getElementById('about_divm');

    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}