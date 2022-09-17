import { Application,Sprite,TilingSprite } from 'pixi.js';
import { Game } from './Game';
import './css/main.css';

/***
 * the following used to be a hack to register the spine plugin not sure if it is still needed.
 */
//  import {SpineParser} from '@pixi-spine/loader-3.8';
//  export {SpineParser};
//  export * from '@pixi-spine/runtime-3.8';
//  export * from '@pixi-spine/base';
//  SpineParser.registerLoaderPlugin();
 ///;
window.onload = ()=>{
    const gameDiv:HTMLDivElement = <HTMLDivElement>document.getElementById('game');
    const app:Application = new Game({
         width:innerWidth,
         height:innerHeight,
        // resizeTo: gameDiv,
        backgroundColor: 0x996633,
        sharedLoader: true,
        sharedTicker: true
    });
    gameDiv.appendChild(app.view);
}
//  onimage(){
//     // const runner=new Sprite(this.loader.resources['background'].texture)
//     console.log('hi')
//   let bgx = 0;
// let bgSpeed = 1;
// let bgfront: any;
// initlevel();
//  function imagePlay(delta:any){
//   this.updateBg();
// }
// function updateBg() {
//   bgx = bgx + bgSpeed;
//   bgfront.tilePosition.x = bgx;
// }
// function createbg(texture: any){
//   let tilling = new TilingSprite(texture, innerWidth, innerHeight);
//   tilling.position.set(0, 0);
//   this.stage.addChild(tilling);
//   return tilling;
// }
// function initlevel(){
//   bgfront = createbg(this.loader.resources['background'].texture);
//   this.ticker.add(imagePlay);
// }}