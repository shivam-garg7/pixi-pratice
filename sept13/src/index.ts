import {Application} from 'pixi.js';
import {Game} from './game';
import './css/main.css';
window.onload = ()=>{
    const gameDiv:HTMLDivElement = <HTMLDivElement>document.getElementById('game');
    const app:Application = new Game({
        resizeTo: gameDiv,
        backgroundColor:0x9f23f7,
        sharedLoader: true,
        sharedTicker: true
    });
    gameDiv.appendChild(app.view);
}
