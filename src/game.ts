import * as utils from '@dcl/ecs-scene-utils'
import { getUserData } from '@decentraland/Identity'

const canvas = new UICanvas
const parent = new Entity
engine.addEntity(parent)
parent.addComponent(new Transform({
  position: new Vector3(30,0,30)
}))

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
pad1.addComponent(new GLTFShape("models/pad.glb"))
engine.addEntity(pad1)
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


const park1 = new Entity()
park1.addComponent(new GLTFShape("models/park1.glb"))
engine.addEntity(park1)
park1.setParent(parent)

