import { Application, Loader, Sprite } from "pixi.js";
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
      ],
      this.onLoad.bind(this)
    );
  }
  preload(list: any[], cb: () => {}): void {
    this.loader.onComplete.add((l: Loader) => {
      setResources(l.resources);
    });
    this.loader.add(list);
    this.loader.load(cb);
  }
  /////----------------------------------------------------------------------------------
   rever():any{
   
   
    const spineboy = new Spine(getResource("hero").spineData);
     spineboy.x = this.screen.width/2+300;
     spineboy.y=this.screen.height;
    
     spineboy.scale.set(1);
     spineboy.skeleton.setSlotsToSetupPose();
     spineboy.stateData.setMix('walk', 'jump', 0.2);
     spineboy.stateData.setMix('jump', 'walk', 0.4);
     spineboy.state.setAnimation(0, "idle", true);
     this.stage.addChild(spineboy);
     let previousAnim1: string = 'idle';
     let currentAnim1: string = 'idle';
     let revertToAnim1: string = 'idle';
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
               // direction = 1;
               break;
           }
           break;
         case "keydown":
           switch (e.code) {
             case 'KeyW':
               currentAnim1 = 'jump';
               spineboy.y=300;
               break;
             case 'KeyS':
               currentAnim1 = 'walk';
               revertToAnim1 = 'walk';
               direction1 = 1;
               break;
               case 'KeyK':
                 currentAnim1 = 'fall';
                 revertToAnim1 = 'idle';
                 // direction = 1;
                 break;
               case 'KeyL':
                 currentAnim1 = 'crouch';
                 revertToAnim1 = 'walk';
                 // direction = 1;
                 break;
                 case 'KeyP':
                   currentAnim1 = 'run';
                   revertToAnim1 = 'walk';
                   // direction = 1;
                   break;
             case 'KeyM':
               currentAnim1 = 'attack';
               revertToAnim1 = 'idle';
               direction1 = 1;
               break;
             case 'KeyN':
               currentAnim1 = 'walk';
               revertToAnim1 = 'walk';
               direction1 = -1;
               break;
             case 'keyB':
               currentAnim1 = 'attack';
               break;
             default:
               currentAnim1 = 'idle';
               revertToAnim1 = 'idle';
           }
           break;
         default:
           console.warn("Event has no listener", e.type);
       }
     }
     window.addEventListener("keydown", onKeyEvent);
     window.addEventListener("keyup", onKeyEvent);
   }
  /////////////////-----------------------------------------------------------------------
  onLoad(): void {
    this.stage.interactive = true;
    this.rever();
///-------------------------------------------------------------------------------
      const gob = new Spine(getResource("goblin").spineData);
    gob.skeleton.setSkinByName("goblin");
    gob.skeleton.setSlotsToSetupPose();
    gob.state.setAnimation(0, "walk", true);
    gob.x = this.screen.width / 2;
    gob.y = this.screen.height;
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
    hero.x = this.screen.width/2;
    hero.y = this.screen.height;
    hero.scale.set(0.5);
    hero.skeleton.setSlotsToSetupPose();
    hero.stateData.setMix('walk', 'jump', 0.2);
    hero.stateData.setMix('jump', 'walk', 0.4);
    hero.state.setAnimation(0, "idle", true);
    this.stage.addChild(hero);
    let previousAnim: string = 'idle';
    let currentAnim: string = 'idle';
    let revertToAnim: string = 'idle';
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
      switch (e.type) {
        case "keyup":
          switch (e.code) {
            default:
              currentAnim = revertToAnim;
              // direction = 1;
              break;
          }
          break;
        case "keydown":
          switch (e.code) {
            case 'KeyW':
              currentAnim = 'jump';
              break;
            case 'KeyD':
              currentAnim = 'walk';
              revertToAnim = 'walk';
              direction = 1;
              break;
              case 'KeyG':
                currentAnim = 'death';
                revertToAnim = 'idle';
                // direction = 1;
                break;
              case 'KeyQ':
                currentAnim = 'hit';
                revertToAnim = 'walk';
                // direction = 1;
                break;
                case 'KeyR':
                  currentAnim = 'run';
                  revertToAnim = 'walk';
                  // direction = 1;
                  break;
            case 'KeyS':
              currentAnim = 'shoot';
              revertToAnim = 'idle';
              direction = 1;
              break;
            case 'KeyA':
              currentAnim = 'walk';
              revertToAnim = 'walk';
              direction = -1;
              break;
            case 'Space':
              currentAnim = 'portal';
              break;
            default:
              currentAnim = 'idle';
              revertToAnim = 'idle';
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