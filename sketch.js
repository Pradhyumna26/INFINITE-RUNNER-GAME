var monkey , monkey_running , monkey_collided ;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var restart, restartImage;
var invisibleGround;
var gameOver
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
}
function setup() {
  createCanvas(400,400);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
 monkey.addAnimation("collide", monkey_collided);
  monkey.scale = 0.1;
 
 
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2; 

  restart = createSprite(200,190);
  gameOver = createSprite(200,160);
  restart.visible=false;
 gameOver.visible=false;
 gameOver.scale = 0.5;
 restart.scale = 0.5;
  restart.addImage("restart",restartImage);
  gameOver.addImage("gameover",gameOverImage)

  score = 0;
  survialTime = 0;
}
function draw() {
  background (180);
  stroke("black");
    fill("black");
      textSize(20);
  text("Survial Time:"+  survialTime, 100, 50);
  stroke("black");
    fill("black");
      textSize(20);
  text("Score:"+  score, 300, 100);
 
  monkey.collide(ground);
  
  if(gameState === PLAY){
      monkey.changeAnimation("monkey", monkey_running);
  //  restart.visible = "false";
      survialTime = Math.ceil(frameCount/frameRate());
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
        monkey.scale = monkey.scale + 0.02;
    }
   
     monkey.velocityY = monkey.velocityY + 0.8;
  
  obstacleGroup.setLifetimeEach = -1;
  
  food();
  obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        monkey.velocityX = 0;
      ground.velocityX = 0;
      monkey.scale = 0.1;

        gameState = END
      
      
    }
  }
   if (gameState === END) {
    monkey.changeAnimation("monkey",monkey_running);
     monkey.velocityY = 0;
      monkey.velocityX = 0;
     obstacleGroup.setVelocityXEach(0);
     ground.velocityX = 0;
    FoodGroup.destroyEach();
     obstacleGroup.setLifetimeEach = -1;
     survialTime.visible = false;
     restart.visible=true;
     gameOver.visible=true;
     
     stroke("red");
    fill("black");
       textSize(30);
//text("Game Over", 110, 200); 
  
      stroke("black");
    fill("black");
       textSize(30);
    //ext("Monkey is dead", 100, 240);
       monkey.changeAnimation("collide",monkey_collided );
     }
   if(mousePressedOver(restart)) {
      reset();
    }

  drawSprites();
}
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}
function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }
}
function reset(){
   gameState = PLAY
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
   FoodGroup.destroyEach();
    score = 0;


monkey.changeAnimation("monkey",monkey_running);
 
}