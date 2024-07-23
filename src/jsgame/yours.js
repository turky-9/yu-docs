yuConfig.canvas = 'game';
yuConfig.img.push(['aaa', 'aaa.png'])
var param = {
    x: 40,
    y: 40
}
yuConfig.main = function(game) {
    if(yuGame.key.down) param.y+=2;
    if(yuGame.key.up) param.y-=2;
    if(yuGame.key.left) param.x-=2;
    if(yuGame.key.right) param.x+=2;

    game.disp.push({
        name: 'aaa',
        x: param.x,
        y: param.y
    });
}
yuGame.init();