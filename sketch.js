var bg
var bgimg

var ghostImg
var ghost

var climberPrefab
var doorPrefab
var climber
var door

var prefabs = []
var doors = []
var floors = []

var alive = true

var all = []


//load images
function preload(){
  bgimg = loadImage('tower.png')
  ghostImg = loadImage('ghost-standing.png')
  climberPrefab = loadImage('climber.png')
  doorPrefab = loadImage('door.png')
}

//spawn Obstacles
function obstacles(){
  climber = createSprite(0, -10, 5, 5)
  climber.x = random(100, 500)
  climber.velocityY = 1
  climber.addImage(climberPrefab)
  climber.scale = 1.5
  ghost.collide(climber)
  prefabs.push(climber)

  door = createSprite(0, -120, 5, 5)
  door.x = climber.x
  door.velocityY = 1
  door.addImage(doorPrefab)
  door.scale = 1.5
  ghost.depth = door.depth + 1
  doors.push(door)

  floor = createSprite(0, -3, 130, 20)
  floor.x = climber.x
  floor.velocityY = 1
  floors.push(floor)
  floor.visible = false

  all.push(door)
  all.push(climber)
}


//sprite creation
function setup(){
  createCanvas(600, 600)
  
  bg = createSprite(300, 300)
  bg.addImage(bgimg)
  bg.velocityY = 1
  all.push(bg)

  ghost = createSprite(300, 300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3
  all.push(ghost)
  ghost.setCollider('rectangle', 0, 0, 150, 300)
  }

//drawnFunction
function draw(){

  background('black')


  if(bg.y > 600){
    bg.y = 0
  }
  if(alive == true){
    txt = ""
    ghost.velocityY += 1
    if(keyDown('space')){
      ghost.velocityY = -8
    }

    if(keyDown('a')){
      ghost.x += -2.5
    }
    if(keyDown('d')){
      ghost.x += 2.5
    }

    if(frameCount % 250 == 0){
      obstacles()
    }

    for(var coll of prefabs){
      ghost.collide(coll)
      if(coll.y >= 700){
        coll.destroy()
      }
    }
    for(var coll of floors){
      ghost.collide(coll)
      if(coll.y >= 700){
        coll.destroy()
      }
      if(round(ghost.y - coll.y) == 55){
        if(round(ghost.x - coll.x) >= -80 && round(ghost.x - coll.x) <= 80){
          alive = false
        }
      }
    }
    for(var coll of doors){
      if(coll.y >= 700){
        coll.destroy()
      } 
    }
    if(ghost.y >= 630){
      alive = false
    }
    for(var obj of all){
      obj.visible = true
    }

  }
  if(alive == false){
    fill('white')
    textFont('verdana')
    textSize(50)
    text('___________________________________________________________________________________________________________________________________________________', 0, 200)
    //just a big separator line
    text("Game Over", 150, 300)
    textStyle('italic')
    textSize(20)
    text("Press [R] to Restart", 180, 370)
    textSize(50)
    text('___________________________________________________________________________________________________________________________________________________', 0, 420)
    //another separator
    for(var coll of prefabs){
      coll.destroy()
    }
    for(var coll of floors){
        coll.destroy()
    }
    for(var coll of doors){
        coll.destroy()
    }

    for(var obj of all){
      obj.visible = false
    }

    if(keyDown('r')){
      prefabs = []
      doors = []
      floors = []

      ghost.y = 200
      for(var obj of all){
        obj.visible = true
      }
      alive = true
    }
  }

  drawSprites()

}