document.addEventListener("DOMContentLoaded", ready);

function ready() {
    "use strict";

    const BALL_SPEED = 400;
    const RAD = Math.PI / 180;
    const DOMBall = document.querySelector('.ball');


    let current = getBallPosition();

    start(20, 2, current);




    function start(deg, sector, current) {
        let target = computeBallPosition(deg, sector, current);
        setBallSpeedAndPosition(target);

        setTimeout(() => {
            start(deg, target.sector, target);
        }, target.speed * 1000);
    }


    function computeBallPosition(deg, sector, current) {
        let target = {
            top: 0,
            left: 0
        };

        let a = Math.tan(deg * RAD);

        switch(sector) {
            case 1:
                if(current.top == 800) {
                    target.left = 0;
                    target.top = Math.round(800 - (a * current.left));
                    target.sector = 2;
                }
                else {
                    target.left = Math.round(800 - (a * current.top));
                    target.top = 0;
                    target.sector = 4;
                }
                break;
            case 2:
                if(current.top == 800) {
                    target.left = 800;
                    target.top = Math.round(800 - (a * (800 -current.left)));
                    target.sector = 1;
                }
                else {
                    target.left = Math.round(a * current.top);
                    target.top = 0;
                    target.sector = 3;
                }
                break;
            case 3:
                if(current.top == 0) {
                    target.left = 800;
                    target.top = Math.round(a * (800 - current.left));
                    target.sector = 4;
                }
                else {
                    target.left = Math.round(a * (800 - current.top));
                    target.top = 800;
                    target.sector = 2;
                }
                break;
            case 4:
                if(current.top == 0) {
                    target.left = 0;
                    target.top = Math.round(a * (current.left));
                    target.sector = 3;
                }
                else {
                    target.left = Math.round(800 - (a * (800 - current.top)));
                    target.top = 800;
                    target.sector = 1;
                }
                break;
            default:
                break;
        }

        let distance = Math.pow(Math.pow(current.top - target.top, 2) + Math.pow(current.left - target.left, 2), 0.5);
        target.speed = distance / BALL_SPEED;

        return target;
    }

    function getBallPosition() {
        let top = window.getComputedStyle(DOMBall).getPropertyValue('top');
        let left = window.getComputedStyle(DOMBall).getPropertyValue('left');

        return {
            top: +top.substring(0, top.length - 2),
            left: +left.substring(0, left.length - 2)
        }
    }

    function setBallSpeedAndPosition(target) {
        DOMBall.style.transition = target.speed + 's linear';
        DOMBall.style.top = target.top + 'px';
        DOMBall.style.left = target.left + 'px';
    }
}



