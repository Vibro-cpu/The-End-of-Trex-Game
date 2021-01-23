var PLAY = 1;
var END = 0;
var OVER, overImage;
var RESTART, restartImage;

var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var Background

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  overImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  desert = loadImage("Desert.jpg")
  
}

function setup() {
  createCanvas(600, 200);

  Background = createSprite(300,60);
  Background.addImage(desert);
  Background.scale = 0.8;
  
  trex = createSprite(100,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided);
  trex.scale = 0.5;

  ground = createSprite(0,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(trex.x,190,400,10);
  invisibleGround.visible = false;
  
  restart = createSprite(trex.x,115);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  OVER = createSprite(trex.x,75);
  OVER.addImage(overImage);
  OVER.scale = 0.5;
  OVER.visible = false;
  
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  trex.setCollider("circle",0,0,40);
  
  score = 0
}

function draw() {
  background(180);
  //displaying score
  text("Score: "+ score, trex.x + 400,50);

  restart.x = trex.x + 200;
  OVER.x = trex.x + 200;

  Background.x = trex.x + 200;
  
  console.log("this is ",gameState)

  camera.x = trex.x + 200;
  camera.y = 100;

  invisibleGround.x = trex.x

  if(trex.x >= ground.x){
    ground.x = ground.x + 1188.5;
  }
  
  if(gameState === PLAY){

    restart.visible = false;
    OVER.visible = false;

    trex.velocityX = 5;

    //scoring
    score = score + Math.round(frameCount/60);
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >=100) {
        trex.velocityY = -13;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     
     trex.changeAnimation("collided" , trex_collided);
     obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
     
     trex.velocityY = 0;
     trex.velocityX = 0;
     
     restart.visible = true;
     OVER.visible = true;

     if(mousePressedOver(restart)){
      gameState = PLAY;
      trex.x = 50;
      trex.y = 180;
      trex.changeAnimation("running" , trex_running);
      score = 0;
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
      ground.x = 100;
    }
   }
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(trex.x + 900,165,10,40);
   
    //generate random obstacles
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
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
     cloud = createSprite(trex.x + 400,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

