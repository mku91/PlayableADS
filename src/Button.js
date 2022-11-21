import * as PIXI from 'pixi.js';
import { Sprite } from 'pixi.js';
import gsap, { Back, Elastic, Sine } from 'gsap';

export class Button extends PIXI.Container {
    constructor(parent, x, y, gradeNum){
        super();

        this.inFocus = false;
        this.tween = undefined;

        this.defaultTexture = PIXI.Texture.from('assets/button_default.png');
        this.focusTexture = PIXI.Texture.from('assets/button_focus.png');

        this.position.set(x, y);
        this.addBackground();
        switch(gradeNum){
            case 0: this.addTexture('assets/stair_grade_0.png'); break;
            case 1: this.addTexture('assets/stair_grade_1.png'); break;
            default: this.addTexture('assets/stair_grade_2.png');
        }
        this.addOkButton();
        this.parent = parent;
        this.gradeNum = gradeNum;
        parent.addChild(this);
    }

    addBackground(){
        this.background = new Sprite(this.defaultTexture);
        this.background.anchor.set(0.5);
        this.background.interactive = true;
        this.background.cursor = 'pointer';
        this.background.on('pointerdown', () => {
            this.onButtonClick();
        });
        this.addChild(this.background);
    }

    addTexture(texture){
        this.icon = PIXI.Sprite.from(texture);
        this.icon.anchor.set(0.5);
        this.addChild(this.icon);
    }

    addOkButton(){
        this.okButton = PIXI.Sprite.from('assets/ok_button.png');
        this.okButton.anchor.set(0.5, 0.0);
        this.okButton.position.set(0, 40);
        this.okButton.alpha = 0.0;
        this.okButton.interactive = true;
        this.okButton.on('pointerdown', () => this.onOkButtonClick());
        this.addChild(this.okButton);
    }

    onButtonClick(){
        if(this.parent.gradeSelected) return;
        this.parent.changeGrade(this.gradeNum);
    }

    onOkButtonClick(){
        if(!this.inFocus) return;
        if(this.parent.gradeSelected) return;
        this.okButton.alpha = 0.0;
        gsap.fromTo(this,
            {
                pixi: {
                    scale: 1.5
                }
            },
            {
                pixi: {
                    scale: 1.0
                },
                ease: Elastic.easeOut,
                duration: 1.5,
                onComplete: () => {
                    this.parent.hideButtons();
                }
            }
        );
        this.parent.onGradeSelected();
    }

    removeFocus(){
        this.inFocus = false;
        this.background.texture = this.defaultTexture;
        if(this.tween){
            this.tween.kill();
            this.tween = undefined;
        }
        this.okButton.alpha = 0.0;
    }

    setFocus(){
        this.inFocus = true;
        this.background.texture = this.focusTexture;
        this.tween = gsap.fromTo(this.okButton,
            {
                pixi: {
                    y: 35,
                    alpha: 0.0
                }
            },
            {
                pixi: {
                    y: 40,
                    alpha: 1.0,
                },
                ease: Sine.easeOut,
                duration: 0.25
            }
        );
    }
}