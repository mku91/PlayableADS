import * as PIXI from 'pixi.js';
import { endGame, SIZE } from '.';
import gsap, { Back, Sine } from 'gsap';
import {SimpleTimer} from './SimpleTimer';
import {App} from './index';
import { Button } from './Button';
import { Sprite } from 'pixi.js';

export class Stair extends PIXI.Container {
    constructor(){
        super();

        this.buttons = [];
        this.isShowGrades = false;
        this.gradeSelected = false;

        this.defaultTexture = PIXI.Texture.from('assets/stair_0.png');
        this.gradesTexture = [
            PIXI.Texture.from('assets/stair_3.png'),
            PIXI.Texture.from('assets/stair_2.png'),
            PIXI.Texture.from('assets/stair_1.png')
        ];

        this.createSprite();
        this.position.set(SIZE.width + 80, SIZE.height);
        App.stage.addChild(this);
        this.createHammer();
    }

    createSprite(){
        this.stairSprite = new Sprite(this.defaultTexture);
        this.stairSprite.anchor.set(1.0, 1.0);
        this.addChild(this.stairSprite);
    }

    async createHammer(){
        await SimpleTimer.start(2000);
        this.hammer = PIXI.Sprite.from('assets/icon_hammer.png');
        this.hammer.anchor.set(0.5, 1.0);
        this.hammer.position.set(-300, -350);
        this.hammer.interactive = true;
        this.hammer.on('pointerdown', () => {
            this.onHammerClick();
        });
        this.addChild(this.hammer);
        gsap.fromTo(this.hammer,
            {
                pixi: {
                    y: -300,
                    alpha: 0
                }
            },
            {
                pixi: {
                    y: -330,
                    alpha: 1.0,
                },
                ease: Back.easeOut,
                duration: 0.5
            },
        );
    }

    onHammerClick(){
        if(this.isShowGrades) return;
        this.isShowGrades = true;
        gsap.to(this.hammer,
            {
                pixi: {
                    alpha: 0.0,
                    y: -380
                },
                ease: Sine.easeIn,
                duration: 0.35,
                onComplete: () => this.createGrades()
            }
        );
    }

    createGrades(){
        this.buttons = [
            new Button(this, -450, -300, 0),
            new Button(this, -320, -400, 1),
            new Button(this, -150, -420, 2)
        ];
        this.buttons.forEach((e, i) => {
            gsap.fromTo(e,
                {
                    pixi: {
                        scale: 0.0,
                        alpha: 0.0
                    }
                },
                {
                    pixi: {
                        scale: 1.0,
                        alpha: 1.0,
                    },
                    ease: Back.easeOut,
                    delay: i * 0.1,
                    duration: 0.5
                }
            );
        });
    }

    changeGrade(gradeNum){
        // 0 is blue grade
        // 1 is golden grade
        // 2 is green grade
        this.buttons.forEach(e => {
            if(e.gradeNum === gradeNum){
                e.setFocus();
            } else {
                e.removeFocus();
            }
        });
        this.stairSprite.texture = this.gradesTexture[gradeNum];
        gsap.fromTo(this.stairSprite,
            {
                pixi: {
                    y: -20,
                    alpha: 0.0
                }
            },
            {
                pixi: {
                    y: 0,
                    alpha: 1.0,
                },
                ease: Sine.easeOut,
                duration: 0.5
            }
        );
    }

    onGradeSelected(){
        this.gradeSelected = true;
    }

    hideButtons(){
        this.buttons.forEach((e, i) => {
            gsap.to(e,
                {
                    pixi: {
                        alpha: 0.0,
                        y: e.y + 50
                    },
                    ease: Sine.easeIn,
                    duration: 0.5,
                    delay: i * 0.25,
                    onComplete: () => {
                        e.destroy();
                        if(i === 2){
                            endGame();
                        }
                    }
                }
            );
        });
    }
}