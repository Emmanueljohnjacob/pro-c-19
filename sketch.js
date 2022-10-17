var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghostimg",ghostImg)
  ghost.scale=0.3
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
}

function draw() {
  background(200);
  spookySound.play()
  if(gameState=="play"){
    if(keyDown("LEFT_ARROW")){
      ghost.x-=3
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x+=3
    }
    if(keyDown("SPACE")){
      ghost.velocityY =-10
    }
    ghost.velocityY+=0.8
    spawnDoors()
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState="End"
    }
    drawSprites()
  }else{
    drawSprites()
    fill ("white")
    textSize(30)
    text("Game over",230,250)
  }
  
  if(tower.y > 400){
      tower.y = 300
    }

    
}
function spawnDoors() {
  if (frameCount%300==0){
    var door=createSprite(200,-50)
    door.addImage(doorImg)
    var climber=createSprite(200,-10);
    climber.addImage(climberImg)
    var invisibleBlock=createSprite(200,10);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    door.x=Math.round(random(150,450));
    climber.x=door.x
    invisibleBlock.x=door.x
    door.velocityY=1
    climber.velocityY=1
    invisibleBlock.velocityY=1
    ghost.depth=door.depth
    ghost.depth+=1
    door.lifetime=800
    climber.lifetime=800
    invisibleBlock.lifetime=800
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
  }
}
