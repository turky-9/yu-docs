// *************************************************
//
// setTimeoutは精度(ms)が悪いので却下
//
// *************************************************
var yuGame = {};
yuGame.fps = 30;
yuGame.maxFrameInterval = 1000 / 30;
yuGame.last = -1;

yuGame.canvas = null;   // from yuConfig.canvas
yuGame.ctx = null;      // from canvas object
yuGame.last = null;     // from performance.now
yuGame.fpsLast = 0;
yuGame.fpsCnt = 0;
yuGame.canvasW = 9999;  // todo
yuGame.canvasH = 9999;  // todo
yuGame.rendered = 0;

// ユーザーに初期化してもらうオブジェクト
var yuConfig = {
    canvas: "your canvas id",
    dispFps: true
}

yuGame.init = function() {
    document.addEventListener('DOMContentLoaded', function() {
        yuGame.canvas = document.getElementById(yuConfig.canvas);
        if(!yuGame.canvas) {
            throw Error('[yu] canvas ' +  yuConfig.canvas + ' is not found.');
        }
        yuGame.ctx = yuGame.canvas.getContext('2d');
        yuGame.ctx.font = "20pt Arial";
        yuGame.last = performance.now()
        yuGame.fpsLast = yuGame.last;
        setTimeout(yuGame.main);
    }, false);
}

yuGame.main = function() {
    let now = performance.now();
    yuGame.ctx.clearRect(0, 0, 9999, 9999);;

    if(yuConfig.dispFps) {
        if((now - yuGame.fpsLast) > 1000) {
            yuGame.fpsCnt = 0;
            yuGame.fpsLast = now;
        }
        else {
            yuGame.fpsCnt++;
        }

        yuGame.ctx.fillText("fpt: " + yuGame.fpsCnt, 20, 20);

    }

    setTimeout(yuGame.main, yuGame.maxFrameInterval - (now - yuGame.last));
    console.log(now - yuGame.last);
    yuGame.last = now;
}