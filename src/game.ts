import * as utils from '@dcl/ecs-scene-utils'



const canvas = new UICanvas
const parent = new Entity
engine.addEntity(parent)
parent.addComponent(new Transform({
  position: new Vector3(30,0,30)
}))
let miton : number = 0
let isplaying = false
const quest1s = new AudioClip('sounds/quest1.mp3')
const mit = new AudioClip('sounds/mit.mp3')
const quest1fs = new AudioClip('sounds/quest1f.mp3')
const build = new Entity()
build.addComponent(new GLTFShape("models/build.glb"))
engine.addEntity(build)
build.addComponent(new Animator())
const door1open = new AnimationState("door1open",{ layer: 0 })
const door2open = new AnimationState("door2open",{ layer: 1 })
build.getComponent(Animator).addClip(door1open)
build.getComponent(Animator).addClip(door2open)
door1open.looping = false
door2open.looping = false
build.setParent(parent)

const pad1 = new Entity()
engine.addEntity(pad1)
pad1.addComponent(new GLTFShape("models/pad.glb"))
pad1.getComponent(GLTFShape).visible = false
pad1.setParent(parent)
pad1.addComponent(
  new OnPointerDown(
    (e) => {

      fillInBox.visible = true

       
    },
    {
      button: ActionButton.POINTER,
      showFeedback: true,
      hoverText: "ENTER THE CODE",
      distance: 6

    }))
    



    function formatTimeString(seconds: number): string {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return (
        mins.toLocaleString(undefined, { minimumIntegerDigits: 2 }) +
        ":" +
        secs.toLocaleString(undefined, { minimumIntegerDigits: 2 })
      );
    }

    const counter = new UIText(canvas)
    counter.fontSize = 50
    counter.positionX = -20
    counter.positionY = 320
    counter.height = 35
    counter.width = 90
    counter.hAlign = "center"
    counter.vAlign = "center"
    counter.color = Color4.Red()
    counter.visible = false

    const startpoint = new Entity()
    startpoint.addComponent(new GLTFShape("models/start.glb"))
    engine.addEntity(startpoint)
    startpoint.setParent(parent)

const park1 = new Entity()
park1.setParent(parent)
engine.addEntity(park1)



const count1 = new Entity()
count1.addComponent(new BoxShape)
count1.getComponent(BoxShape).visible = false
engine.addEntity(count1)
count1.addComponent(new Transform({
  position : new Vector3(17.3,5,44),
  scale: new Vector3(3,3,3)
}))
count1.getComponent(BoxShape).withCollisions = false
let trigger = new utils.TriggerBoxShape()
count1.addComponent(
  new utils.TriggerComponent(
    trigger, //shape
    {
        onCameraEnter :() => {
          let time = 26
            
            park1.addComponent(new GLTFShape("models/park1.glb"))
            counter.visible = true
            count1.addComponent(new utils.Interval(1000, (): void => {
              time--
              counter.value = formatTimeString(time)
              if(time==0){
                count1.removeComponent(utils.Interval)
                park1.removeComponent(GLTFShape)
                counter.visible = false
              }
            }))
            
        },
      }
  )
)

const fillInBox = new UIInputText(canvas)
    fillInBox.color = Color4.Black()
    fillInBox.width = 500
    fillInBox.height = 46
    fillInBox.positionX = 0
    fillInBox.positionY = 15
    fillInBox.placeholder = 'ENTER THE CODE HERE'
    fillInBox.hTextAlign = 'center'
    fillInBox.vTextAlign = 'center'
    fillInBox.fontSize = 22
    fillInBox.textWrapping = true
    fillInBox.visible=false


    fillInBox.onTextSubmit = new OnTextSubmit(x => {
      if(x.text == "HOPE"){
       door1open.play() 
       fillInBox.visible=false
       pad1.removeComponent(OnPointerDown)
    
    }})

    const notifmap = new Texture("images/notifmap.png")
    const notif1 = new UIImage(canvas,notifmap)
    notif1.sourceWidth = 1024
    notif1.sourceHeight = 56
    notif1.sourceLeft = 0
    notif1.sourceTop = 141
    notif1.width = 512
    notif1.height = 28
    notif1.positionX = -30
    notif1.positionY = -250
    notif1.hAlign = 'center'
    notif1.vAlign = 'center'
    notif1.visible = false

    const notif2 = new UIImage(canvas,notifmap)
    notif2.sourceWidth = 1024
    notif2.sourceHeight = 56
    notif2.sourceLeft = 0
    notif2.sourceTop = 272
    notif2.width = 512
    notif2.height = 28
    notif2.positionX = -30
    notif2.positionY = -250
    notif2.hAlign = 'center'
    notif2.vAlign = 'center'
    notif2.visible = false


    const appa1 = new Entity()
    appa1.addComponent(new GLTFShape("models/appa1.glb"))
    appa1.getComponent(GLTFShape).visible = false
    engine.addEntity(appa1)
    appa1.setParent(parent)
    appa1.addComponent(new Animator())
const appa1on = new AnimationState("appa1",{ layer: 0 })
appa1.getComponent(Animator).addClip(appa1on)
appa1on.looping = false

const partydroid = new Entity()
    partydroid.addComponent(new GLTFShape("models/partydroid.glb"))
    partydroid.addComponent(new Transform({
      position: new Vector3(-10,1,2.5),
      rotation: Quaternion.Euler(0,-85,0)
    }))
    engine.addEntity(partydroid)
    partydroid.setParent(parent)
    partydroid.addComponent(new Animator())
const idle1 = new AnimationState("Idle1",{ layer: 0 })
partydroid.getComponent(Animator).addClip(idle1)
idle1.looping = false
idle1.play()
partydroid.addComponent(
  new OnPointerDown(
    (e) => {
      switch(miton){
        case 0:    if(!isplaying){
          partydroid.addComponentOrReplace(
            new AudioSource(quest1s)
          ).playOnce()
          miton = 1
          isplaying = true
           partydroid.addComponent(
             new utils.Delay(10000, () => {
              notif1.visible=true
                 isplaying = false
             }))
         }
        
        break;
        case 1:  if(!isplaying){
          partydroid.addComponentOrReplace(
            new AudioSource(mit)
          ).playOnce()
          isplaying = true
           partydroid.addComponent(
             new utils.Delay(4000, () => {
                 isplaying = false
             }))
         }
        
        break;
        case 2: partydroid.addComponentOrReplace(
          new AudioSource(quest1fs)
        ).playOnce()
        notif2.visible = false
        partydroid.removeComponent(OnPointerDown)
        partydroid.addComponent(
          new utils.Delay(3000, () => {
            appa1.getComponent(GLTFShape).visible = true
            appa1on.play()
            utils.setTimeout(1000, ()=>{
              pad1.getComponent(GLTFShape).visible = true
              
                
              })
            
  
          }))
          break;
      }
     
        
      
    
       
    },
    {
      button: ActionButton.POINTER,
      showFeedback: true,
      hoverText: "TALK",
      distance: 6

    }))


    const lever1 = new Entity()
    lever1.addComponent(new GLTFShape("models/lever.glb"))
    engine.addEntity(lever1)
    lever1.setParent(parent)
    lever1.addComponent(new Animator())
const lever1on = new AnimationState("lever1",{ layer: 0 })
lever1.getComponent(Animator).addClip(lever1on)
lever1on.looping = false
lever1.addComponent(
  new OnPointerDown(
    (e) => {
     
      lever1on.play()
      miton = 2
      notif1.visible=false
      notif2.visible = true
       
    },
    {
      button: ActionButton.POINTER,
      showFeedback: true,
      hoverText: "TALK",
      distance: 6

    }))
/*
    if(!isplaying){
       isplaying = true
        partydroid.addComponent(
          new utils.Delay(4000, () => {
              isplaying = false
          }))
      }
      */