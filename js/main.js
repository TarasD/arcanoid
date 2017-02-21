document.addEventListener("DOMContentLoaded", ready);

function ready() {
    "use strict";



    let current = getBallPostion();

    let computed = computeBallPosition(30, current);
    console.log(computeBallPosition(30, current));



    // let deg = 30;
    //
    // let target = {
    //     top: 0,
    //     left: Math.tan(deg * Math.PI/180) * current.top
    // };
    //
    // let distance = Math.pow(Math.pow(current.top - target.top, 2) + Math.pow(current.left - target.left, 2), 0.5);
    //
    // let speed = distance / BALL_SPEED;




    setBallSpeedAndPosition(computed.speed, computed.target);




    setTimeout(() => {
        computeBallPosition(90 - 30, computed.target);

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
        top: 0,  ////
        left: Math.tan(deg * Math.PI/180) * current.top
    };

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