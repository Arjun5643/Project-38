var runner, runner_running, runner_collided;
var ground, invisibleGround, groundImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var GameOver, GameOverimage;
var Restart, RestartImage;


function preload(){
  runner_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  runner_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  GameOverimage = loadImage("gameOver.png");
  RestartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  runner = createSprite(50,180,20,50);
  runner.addAnimation("running", runner_running);
  runner.addAnimation("trex_collided", runner_collided);
  runner.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
  GameOver = createSprite(300,100);
  Restart = createSprite(300,140);
  GameOver.addImage("gameOver", GameOverimage);
  GameOver.scale = 0.5;
  Restart.addImage("restart", RestartImage);
  Restart.scale = 0.5;

  GameOver.visible = false;
  Restart.visible = false;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  if(gameState === PLAY) {
     score = score + Math.round(getFrameRate()/60);
     ground.velocityX  = -(6 + 3*score/100); 
     if(keyDown("space")&& runner.y>=150) {
       runner.velocityY = -12;
     }
  
     runner.velocityY = runner.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(obstaclesGroup.isTouching(runner)) {
      gameState = END;
    }  
    
    spawnObstacles();
  } 
  
  else if (gameState === END) {
     GameOver.visible = true;
    Restart.visible = true;
    
    ground.velocityX = 0;
    runner.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    runner.changeAnimation("trex_collided", runner_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(Restart)) {
      reset();
    }  
  }  
  runner.collide(invisibleGround);

  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX  = -(6 + 3*score/100);
 
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  GameOver.visible = false;
  Restart.visible = false;
  
  obstaclesGroup.destroyEach();
  runner.changeAnimation("running", runner_running);
  
  score = 0;
  
}