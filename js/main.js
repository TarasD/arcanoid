document.addEventListener("DOMContentLoaded", ready);

function ready() {
    "use strict";

    let current = getBallPostion();

    let computed = computeBallPosition(175, current);
    console.log(computed);

    setBallSpeedAndPosition(computed.speed, computed.target);




    setTimeout(() => {
        console.log(computeBallPosition(90 - 5, computed.target).target);

    }, computed.speed * 1000);
}



function getBallPostion() {
    "use strict";

    let DOMBall = document.querySelector('.ball');

    let top = window.getComputedStyle(DOMBall).getPropertyValue('top');
    let left = window.getComputedStyle(DOMBall).getPropertyValue('left');

    return {
        top: +top.substring(0, top.length - 2),
        left: +left.substring(0, left.length - 2)
    }
}

function computeBallPosition(deg, current) {
    "use strict";
    const BALL_SPEED = 400;

    let target = {
        top: 0,
        left: 0
    };
    let goBottom = false;

    if(deg > 90) {
        deg = 180 - deg;
        goBottom = true;
    }

    let left = Math.tan(deg * Math.PI / 180) * current.top;

    console.log(left, 'left');

    if (left <= 750) {
        target.left = left;

        if (goBottom) {
            target.top = 750;
        }
        else {
            target.top = 0;
        }
    }
    else {
        target.left = 750;
        target.top = Math.tan((90 - deg) * Math.PI / 180) * (left - 800);

        if(goBottom) target.top = 800 - target.top;
    }


    let distance = Math.pow(Math.pow(current.top - target.top, 2) + Math.pow(current.left - target.left, 2), 0.5);
    let speed = distance / BALL_SPEED;

    return {
        target,
        speed
    }
}

function setBallSpeedAndPosition(speed, target) {
    "use strict";

    let DOMBall = document.querySelector('.ball');
    DOMBall.style.transition = speed + 's linear';
    DOMBall.style.top = target.top + 'px';
    DOMBall.style.left = target.left + 'px';
}