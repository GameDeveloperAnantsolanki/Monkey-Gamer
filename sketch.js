
var monkey , monkey_running, monkey_stop,PLAY=1,END=0
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0,survivalTime = 0;
var ground,Stop,gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png")
   
  monkey_stop = loadAnimation("sprite_8.png"); 
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(500,500)
  
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1;
  
ground = createSprite(400,350,900,10); 
ground.velocityX = -4;
ground.x = ground.width/2;
console.log(ground.x);

FoodGroup = new Group();
obstacleGroup = new Group();

}


function draw() {
background("white");
if (ground.x < 0){
      ground.x = ground.width/2;
    }
   if (gameState===PLAY){ 
   
 
  
  

 survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
     if(monkey.isTouching(FoodGroup)){
       score = score +2
       FoodGroup.destroyEach();
     }
     
     if(obstacleGroup.isTouching(monkey)){
       gameState = END;
    }
          
     if(keyDown("space")&& monkey.y > 300){
  monkey.velocityY = -15
}
  
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount/frameRate())
text("Survival Time:"+survivalTime,100,50);
     
     food();  
    rock();
     magic();
     
   }else if(gameState === END){
     monkey.velocityY = 0;
  ground.x =0
  FoodGroup.setVelocityXEach(0)
  FoodGroup.setVelocityYEach  (0)
  obstacleGroup.setVelocityXEach (0)
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
   }
stroke("black")
textSize(10*2)
fill("black")
text("score:"+score,350,50);

  
monkey.setCollider("Circle",0,0,290);
monkey.debug = true;
  

  
 monkey.velocityY = monkey.velocityY + 0.8
  
monkey.collide(ground);
     drawSprites();
  



  

}

function food(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,200,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
  FoodGroup.add(banana);
  }
}

function rock(){
  if(frameCount %300 === 0){
    var obstacle = createSprite(400,320,20,100);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = 50;

  obstacleGroup.add(obstacle); 
  }
}

function magic(){
  switch(score){
      case 10: monkey.scale = 0.12
              break;
      case 20: monkey.scale = 0.14
              break;
      case 30: monkey.scale = 0.16
              break;
      case 40: monkey.scale = 0.18
              break;
      case 50: monkey.scale = 0.20
              break;
        default: break;
  }
}