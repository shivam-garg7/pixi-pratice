import { Application, Loader, Sprite, Texture, TilingSprite } from "pixi.js";
import { gsap } from "gsap";
import { getResource, setResources } from "./Texture.utils";
import { Spine } from "pixi-spine";
export class Game extends Application {
  constructor(opts: any) {
    super(opts);
    this.preload(
      [
        { name: "goblin", url: "assets/goblins/goblins-pro.json" },
        { name: "boy", url: "assets/spineboy/spineboy-pro.json" },
        { name: "hero", url: "assets/hero/hero-pro.json" },
        { name: "entryimage", url: "assets/entryimage3.jpg" },
        { name: "background", url: "assets/running_back.jpg" },
        { name: "start", url: "assets/start-button.png" },
      ],
      this.onFront.bind(this)
    );
  }
  preload(list: any[], cb: () => {}): void {
    this.loader.onComplete.add((l: Loader) => {
      setResources(l.resources);
    });
    this.loader.add(list);
    this.loader.load(cb);
  }
  ///////------------------------------------------------------------------------------
  onFront(): void {
    const s = new Sprite(this.loader.resources['entryimage'].texture);
    // const bgfront =this.loader.resources['background'].texture;
    s.width = innerWidth;
    s.height = innerHeight
    this.stage.addChild(s);
    const hero = new Spine(getResource("boy").spineData);
    hero.x = this.screen.width / 2;
    hero.y = this.screen.height;
    hero.scale.set(0.5);
    hero.skeleton.setSlotsToSetupPose();
    hero.state.setAnimation(0, "idle", true);
    this.stage.addChild(hero);
    const button = new Sprite(this.loader.resources['start'].texture)
    button.buttonMode = true;
    button.interactive = true;
    button.visible = true
    button.width = innerWidth / 6;
    button.height = innerHeight / 3;
    button.x = innerWidth - 300
    button.y = innerHeight - 200
    this.stage.addChild(button);
    hero.stateData.setMix('run', 'jump', 0.2);
    button.on('pointerup', () => {
      hero.state.setAnimation(0, 'run', true);
      setTimeout(() => {

        hero.state.setAnimation(0, 'jump', true);

      }, 1000);
      setTimeout(() => {
        hero.state.setAnimation(0, 'portal', true);
      }, 2300);
      setTimeout(() => {
        hero.state.setAnimation(0, 'run', true);
      }, 4000);


      setTimeout(() => {
        button.interactive = false;
        button.visible = false;
        hero.visible = false;
        s.visible = false;
        this.onLoad();
      }, 4000);

    })

  }
  /////----------------------------------------------------------------------------------
  rever(): any {


    const spineboy = new Spine(getResource("hero").spineData);
    spineboy.x = this.screen.width / 2 + 300;
    spineboy.y = this.screen.height-130;

    spineboy.scale.set(0.9);
    spineboy.skeleton.setSlotsToSetupPose();
    spineboy.stateData.setMix('walk', 'jump', 0.2);
    spineboy.stateData.setMix('jump', 'walk', 0.4);
    spineboy.state.setAnimation(0, "walk", true);
    this.stage.addChild(spineboy);
    let previousAnim1: string = 'walk';
    let currentAnim1: string = 'walk';
    let revertToAnim1: string = 'walk';
    let direction1: number = 1;
    let defaultScale1 = spineboy.scale.x;
    this.ticker.add(() => {
      spineboy.scale.x = defaultScale1 * direction1;
      if (currentAnim1 != previousAnim1) {
        console.log(currentAnim1, previousAnim1);
        spineboy.state.setAnimation(0, currentAnim1, true);
        previousAnim1 = currentAnim1;

      }
    });

    function onKeyEvent(e: KeyboardEvent): void {
      console.log("keyboard event", e);
      switch (e.type) {
        case "keyup":
          switch (e.code) {
            default:
              currentAnim1 = revertToAnim1;
              direction1= 1;
              break;
          }
          break;
        case "keydown":
          switch (e.code) {
            case 'KeyW':
              currentAnim1 = 'jump';
              break;
            // case 'KeyS':
            //   currentAnim1 = 'walk';
            //   revertToAnim1 = 'walk';
            //   direction1 = 1;
            //   break;
            //  case 'KeyK':
            //    currentAnim1 = 'fall';
            //    revertToAnim1 = 'idle';
            //    // direction = 1;
            //    break;
            case 'KeyQ':
              currentAnim1 = 'crouch';
              // revertToAnim1 = 'walk';
              direction1 = -1;
              break;
            case 'KeyR':
              currentAnim1 = 'head-turn';
              revertToAnim1 = 'walk';
              // direction = 1;
              break;
              case 'KeyD':
                currentAnim1 = 'run';
                revertToAnim1 = 'walk';
                // direction = 1;
                break;
            case 'KeyS':
              currentAnim1 = 'attack';
              revertToAnim1 = 'walk';
              direction1 = 1;
              break;
            case 'KeyA':
              currentAnim1 = 'run';
              revertToAnim1 = 'walk';
              direction1 = -1;
              break;
            // case 'keyB':
            //   currentAnim1 = 'attack';
            //   revertToAnim1="walk";
            //   break;
            default:
              currentAnim1 = 'walk';
              revertToAnim1 = 'walk';
          }
          break;
        default:
          console.warn("Event has no listener", e.type);
      }
    }
    window.addEventListener("keydown", onKeyEvent);
    window.addEventListener("keyup", onKeyEvent);
  }
////////////////////////--------------------------------------------------------------------
onLoad(): void {
  const image=new Sprite(this.loader.resources['background'].texture);
  image.width=innerWidth;
  image.height=innerHeight;
  this.stage.addChild(image);

  this.stage.interactive = true;
  this.rever();
  ///-------------------------------------------------------------------------------
  const gob = new Spine(getResource("goblin").spineData);
  gob.skeleton.setSkinByName("goblin");
  gob.skeleton.setSlotsToSetupPose();
  gob.state.setAnimation(0, "walk", true);
  gob.x = this.screen.width / 8;
  gob.y = this.screen.height-130;
  this.stage.addChild(gob);
  this.stage.on("pointertap", () => {
    // change current skin
    const currentSkinName = gob.skeleton.skin.name;
    const newSkinName = currentSkinName === "goblin" ? "goblingirl" : "goblin";
    gob.skeleton.setSkinByName(newSkinName);
    gob.skeleton.setSlotsToSetupPose();
  });
  //-------------------------------------------------------------------------------------
 
  ///////------------------------------------------------------------------------------------------ 
  const hero = new Spine(getResource("boy").spineData);
  hero.x = this.screen.width / 2;
  hero.y = this.screen.height - 130;
  hero.scale.set(0.4);
  hero.skeleton.setSlotsToSetupPose();
  hero.stateData.setMix('walk', 'jump', 0.2);
  hero.stateData.setMix('jump', 'walk', 0.4);
  hero.state.setAnimation(0, "walk", true);
  this.stage.addChild(hero);
  let previousAnim: string = 'walk';
  let currentAnim: string = 'walk';
  let revertToAnim: string = 'walk';
  let direction: number = 1;
  let defaultScale = hero.scale.x;
  this.ticker.add(() => {
    hero.scale.x = defaultScale * direction;
    if (currentAnim != previousAnim) {
      console.log(currentAnim, previousAnim);
      hero.state.setAnimation(0, currentAnim, true);
      previousAnim = currentAnim;

    }
  });
  function onKeyEvent(e: KeyboardEvent): void {
    console.log("keyboard event", e);
    switch(e.type) {
        case "keyup":
  switch (e.code) {
    default:
      currentAnim = revertToAnim;
      direction = 1;
      break;
  }
  break;
        case "keydown":
  switch (e.code) {
    case 'KeyW':
      currentAnim = 'jump';
      break;
    case 'KeyD':
      currentAnim = 'run';
      revertToAnim = 'walk';
      direction = 1;
      break;
    case 'KeyQ':
      currentAnim = 'death';
      revertToAnim = 'walk';
      // direction = 1;
      break;
    // case 'KeyQ':
    //   currentAnim = 'hit';
    //   revertToAnim = 'walk';
    //   // direction = 1;
    //   break;
    case 'KeyR':
      currentAnim = 'hoverboard';
      revertToAnim = 'walk';
      // direction = 1;
      break;
    case 'KeyS':
      currentAnim = 'shoot';
      revertToAnim = 'walk';
      direction = 1;
      break;
    case 'KeyA':
      currentAnim = 'run';
      revertToAnim = 'walk';
      direction = -1;
      break;
    case 'Space':
      currentAnim = 'portal';
      break;
    default:
      currentAnim = 'walk';
      revertToAnim = 'walk';
  }
  break;
        default:
  console.warn("Event has no listener", e.type);
}
    }
window.addEventListener("keydown", onKeyEvent);
window.addEventListener("keyup", onKeyEvent); 
}
}