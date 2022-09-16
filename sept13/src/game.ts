import { Application, Sprite,Text } from 'pixi.js';
import { gsap } from 'gsap';
import { sound } from '@pixi/sound';
import * as particles from '@pixi/particle-emitter'
export class Game extends Application {
    private spin: boolean;
    private sliceAngle = 360 / 8;
    constructor(opts: any) {
        super(opts);
        this.preload([
            { name: 'wheel', url: 'assets/wheel2.png' },
            { name: 'pointer', url: 'assets/ptr4.png' },
            { name:'spin',url:"assets/spin.png"},
        ], this.onLoad.bind(this));
    }
    preload(list: any[], cb: () => {}): void {
        this.loader.add(list);
        this.loader.load(cb);
    }
    winnerpage(ran:number):void{
        let arr=[100,800,700,600,500,400,300,200];
        let result="";
        console.log(arr[ran]);
        if(ran==1||ran==2||ran==3||ran==4){
             result="you are lucky"
             sound.add('my-sound1', './assets/winprize.mp3');
             sound.play('my-sound1');

        }
        else{
            sound.add('my-sound2', './assets/lossing.wav');
             sound.play('my-sound2');
            result="Wish you luck,try again"
        }
        let text = new Text("Congrats you win the :"+arr[ran]+"$ coins\n"+result,{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'});
        text.x=300;
        text.y=300;
        // wheel.visible=false
        this.stage.addChild(text);
        //  text.visible=false;
        setTimeout(() => {
            text.visible=false
            this.onLoad();
        }, 3000);
         
        }  
    onLoad(): void {
        let random = 0;

        const wheel = new Sprite(this.loader.resources['wheel'].texture);
        wheel.anchor.set(0.5);
        wheel.x = this.screen.width / 2;
        wheel.y = this.screen.height / 2;
        this.stage.addChild(wheel);
       
       
        console.log(this.stage);
        const pointer = new Sprite(this.loader.resources['pointer'].texture);
        pointer.x=370
        pointer.y=90
        pointer.visible = true;
        this.stage.addChild(pointer);
        const spin = new Sprite(this.loader.resources['spin'].texture);
        // spin.anchor.set(0.5);
        spin.scale.set(.2)
        spin.x=380;
        spin.y=270;
        spin.interactive = true;
        spin.buttonMode = true;
        this.stage.addChild(spin);
        spin.on('pointerup', () => {
           
            let Randomly = require("weighted-randomly-select");
            let random = Randomly.select([{
                chance: 0.01, result: 0
              }, {
                chance: 0.02, result: 1
              }, {
                chance: 0.03, result: 2
              },{
                chance: 0.04, result: 3
              }, {
                chance: 0.7, result: 4
              }, {
                chance: 0.9, result: 5
              },{
                chance: 0.95, result: 6
              }, {
                chance: 0.95, result: 7
              },
              ]);
            let stopAngle = random * this.sliceAngle;
            sound.add('my-sound', './assets/spinning_sound.wav');
             sound.play('my-sound');
             setTimeout(() => {
              spin.visible=false
                gsap.fromTo(wheel, { angle: 0 }, { angle: 3600 + stopAngle, duration: 6, ease: 'expo.out' });
             }, 500);
           
            spin.interactive=false;
            setTimeout(() => {
                wheel.visible=false;
                pointer.visible=false;
                spin.visible=false;
                this.winnerpage(random);
               
            }, 7000);
           
        });
    
      

       
    }
       
            
    
}