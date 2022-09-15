import { Application, Sprite,Text } from 'pixi.js';
import { gsap } from 'gsap';
import { sound } from '@pixi/sound';
export class Game extends Application {
    private spin: boolean;
    private sliceAngle = 360 / 10;
    constructor(opts: any) {
        super(opts);
        this.preload([
            { name:"wheel",url:"assets/i.jpg"},
        ], this.onLoad.bind(this));
    }
    preload(list: any[], cb: () => {}): void {
        this.loader.add(list);
        this.loader.load(cb);
    }
    winnerpage(ran:number):void{
        let arr=[900,800,700,600,500,400,300,200,100,1000];
        let result="";
        console.log(arr[ran]);
        if(ran==0||ran==1||ran==2||ran==3||ran==4||ran==9){
             result="you are lucky"
             sound.add('my-sound1', './assets/winprize.mp3');
             sound.play('my-sound1');

        }
        else{
            sound.add('my-sound2', './assets/lossing.wav');
             sound.play('my-sound2');
            result="Wish you luck,try again"
        }
        let text = new Text("Congrats you win the :"+arr[ran]+"coins\n"+result,{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'});
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
        wheel.interactive = true;
        wheel.buttonMode = true;
        console.log(this.stage);
        wheel.on('pointerup', () => {
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
              }, {
                chance: 0.96, result: 8
              },{
                chance: 0.001, result: 9
              }]);
            let stopAngle = random * this.sliceAngle;
            sound.add('my-sound', './assets/spinning_sound.wav');
             sound.play('my-sound');
             setTimeout(() => {
                gsap.fromTo(wheel, { angle: 0 }, { angle: 3600 + stopAngle, duration: 6, ease: 'expo.out' });
             }, 1300);
           
            wheel.interactive=false;
            setTimeout(() => {
                wheel.visible=false;
                
                this.winnerpage(random);
               
            }, 7000);
           
        });
    
      

       
    }
       
            
    
}