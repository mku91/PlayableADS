import * as PIXI from 'pixi.js';
import gsap, { Back, Sine } from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';
import { Stair } from './Stair';

export const App = new PIXI.Application({
    width: 1280,
    height: 640
});

export const SIZE = {
    width: App.view.width,
    height: App.view.height,
    center: {
        x: App.view.width * 0.5,
        y: App.view.height * 0.5
    }
}

// Initialize gsap lib
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

document.body.appendChild(App.view);
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';

// PLACE OBJECTS

// Background
const background = PIXI.Sprite.from('assets/background.png');
background.anchor.set(0.5);
background.position.set(SIZE.center.x, SIZE.center.y);
App.stage.addChild(background);

// Austin
const austin = PIXI.Sprite.from('assets/Austin.png');
austin.anchor.set(0.5, 1.0);
austin.position.set(SIZE.center.x + 80, SIZE.center.y + 100);
App.stage.addChild(austin);

// Stuff
const stuff = PIXI.Sprite.from('assets/stuff.png');
stuff.anchor.set(0.5);
stuff.position.set(260, 477);
App.stage.addChild(stuff);
gsap.fromTo(stuff,
    {
        pixi: {
            y: 427,
            alpha: 0.0
        }
    },
    {
        pixi: {
            y: 477,
            alpha: 1.0,
        },
        ease: Sine.easeOut,
        delay: 0.1,
        duration: 0.5
    },
);

// TopPlant
const topPlant = PIXI.Sprite.from('assets/plant.png');
topPlant.anchor.set(0.5);
topPlant.position.set(513, 33);
App.stage.addChild(topPlant);
gsap.fromTo(topPlant,
    {
        pixi: {
            y: 0,
            alpha: 0.0
        }
    },
    {
        pixi: {
            y: 33,
            alpha: 1.0,
        },
        ease: Sine.easeOut,
        delay: 0.5,
        duration: 0.25
    },
);

// Book
const book = PIXI.Sprite.from('assets/book_stand.png');
book.anchor.set(0.5);
book.position.set(800, 72);
App.stage.addChild(book);
gsap.fromTo(book,
    {
        pixi: {
            y: 16,
            alpha: 0.0
        }
    },
    {
        pixi: {
            y: 72,
            alpha: 1.0,
        },
        ease: Sine.easeOut,
        delay: 0.50,
        duration: 0.5
    },
);

// Globe
const globe = PIXI.Sprite.from('assets/globe.png');
globe.anchor.set(0.5, 0.5);
globe.position.set(160, 203);
App.stage.addChild(globe);
gsap.fromTo(globe,
    {
        pixi: {
            y: 153,
            alpha: 0.0
        }
    },
    {
        pixi: {
            y: 203,
            alpha: 1.0,
        },
        ease: Sine.easeOut,
        delay: 0.75,
        duration: 0.5
    },
);

// Plant
const plant = PIXI.Sprite.from('assets/plant.png');
plant.anchor.set(0.5, 0.5);
plant.position.set(1152, 239);
App.stage.addChild(plant);
gsap.fromTo(plant,
    {
        pixi: {
            y: 189,
            alpha: 0.0
        }
    },
    {
        pixi: {
            y: 239,
            alpha: 1.0,
        },
        ease: Sine.easeOut,
        delay: 1.0,
        duration: 0.5
    },
);

// Stair
const stair = new Stair(App);

// UI

// Obscure
const obscure = PIXI.Sprite.from('assets/obscure.png');
obscure.alpha = 0.0;
App.stage.addChild(obscure);

// Logo
const logo = PIXI.Sprite.from('assets/logo.png');
App.stage.addChild(logo);
gsap.fromTo(logo,
    {
        pixi: {
            y: -30,
            alpha: 0
        },
    },
    {
        pixi: {
            y: 0,
            alpha: 1.0,
        },
        ease: Back.easeOut,
        duration: 1
    },
);

// Button
const button = PIXI.Sprite.from('assets/btn.png');
button.anchor.set(0.5);
button.position.set(SIZE.center.x, SIZE.height);
button.interactive = true;
button.cursor = 'pointer';
button.on('pointerdown', () => {
    alert('On button click action...');
});
App.stage.addChild(button);

const pulseAnimation = function(){
    gsap.to(button,
        {
            pixi: {
                scale: 0.95
            },
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: -1,
            duration: 0.5
        }
    );
};

gsap.fromTo(button,
    {
        pixi: {
            y: SIZE.height + 50,
            alpha: 0
        },
    },
    {
        pixi: {
            y: SIZE.height - 100,
            alpha: 1.0,
        },
        ease: Back.easeOut,
        duration: 1,
        onComplete: () => pulseAnimation()
    },
);

// EndFrame
const endFrame = PIXI.Sprite.from('assets/final_frame.png');
endFrame.anchor.set(0.5);
endFrame.position.set(SIZE.center.x, 0);
endFrame.alpha = 0.0;
App.stage.addChild(endFrame);

export function endGame(){
    gsap.to(obscure,
        {
            pixi: {
                alpha: 1.0,
            },
            duration: 1.0
        }
    );
    gsap.to(endFrame,
        {
            pixi: {
                alpha: 1.0,
                y: SIZE.height * 0.35
            },
            ease: Sine.easeOut,
            duration: 0.5
        }
    );
}