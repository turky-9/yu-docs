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

yuGame.key = {
    up: false,
    down: false,
    left: false,
    right: false,
    sp: false,
    z: false,
    x: false,
    c: false
}

// ユーザーに初期化してもらうオブジェクト
var yuConfig = {
    canvas: "your canvas id",
    dispFps: true,

    // push(['name', './path/to/img'])
    img: [],
}

// ユーザーに呼び出してもらう初期化処理
yuGame.init = function() {
    // DOM読み込み完了イベント登録
    document.addEventListener('DOMContentLoaded', async function() {
        // 初期化処理
        yuGame.canvas = document.getElementById(yuConfig.canvas);
        if(!yuGame.canvas) {
            throw Error('[yu] canvas ' +  yuConfig.canvas + ' is not found.');
        }
        yuGame.ctx = yuGame.canvas.getContext('2d');
        yuGame.ctx.font = "20pt Arial";
        yuGame.last = performance.now()
        yuGame.fpsLast = yuGame.last;

        for(let arg of yuConfig.img) {
            const loadImage = async (src) => {
                const image = new Image();
                image.src = src;
                await image.decode();
                return image;
            };

            const image = await loadImage(arg[1]);
            arg.push(image);
        }

        // ゲームループを登録する
        window.requestAnimationFrame(yuGame.main);
    }, false);

    // キーボードイベント登録
    document.addEventListener('keydown', function(event) {
        switch(event.key){
            case 'ArrowLeft':
                yuGame.key.left = true;
                break;
            case 'ArrowRight':
                yuGame.key.right = true;
                break;
            case 'ArrowDown':
                yuGame.key.down = true;
                break;
            case 'ArrowUp':
                yuGame.key.up = true;
                break;
            case ' ':
                yuGame.key.sp = true;
                break;
            case 'z':
            case 'Z':
                yuGame.key.z = true;
                break;
            case 'x':
            case 'X':
                yuGame.key.x = true;
                break;
            case 'c':
            case 'C':
                yuGame.key.c = true;
                break;
        }
    }, false);
    document.addEventListener('keyup', function(event) {
        switch(event.key){
            case 'ArrowLeft':
                yuGame.key.left = false;
                break;
            case 'ArrowRight':
                yuGame.key.right = false;
                break;
            case 'ArrowDown':
                yuGame.key.down = false;
                break;
            case 'ArrowUp':
                yuGame.key.up = false;
                break;
            case ' ':
                yuGame.key.sp = false;
                break;
            case 'z':
            case 'Z':
                yuGame.key.z = false;
                break;
            case 'x':
            case 'X':
                yuGame.key.x = false;
                break;
            case 'c':
            case 'C':
                yuGame.key.c = false;
                break;
        }
    }, false);
}

// ゲームループ(を表す関数)
yuGame.main = function(now) {
    // 次回の実行を登録
    window.requestAnimationFrame(yuGame.main);

    // 前回の呼び出しから指定時間経過した場合のみ中身を実行する
    // (fpsの制御)
    if(yuGame.maxFrameInterval < (now - yuGame.last)) {
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

        let game = {
            disp: []
        }
        yuConfig.main(game);

        for(let arg of game.disp) {
            for(let x of yuConfig.img) {
                if(arg.name === x[0]) {
                    yuGame.ctx.drawImage(x[2], arg.x, arg.y);
                }
            }
        }

        yuGame.last = now;
    }
}