var PLAYER_W = 24, PLAYER_H = 24;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var W = 640, H = 480 ;
var scores = [];

// var george = new Sprite( 'images/george_0.png', new Vector( 44, 44 ) );
var background = new Image();
background.src = 'images/puji_room.jpg';

canvas.width = W;
canvas.height = H;

function changeImageToDead(el) {
    el.sprite = new Sprite('images/dead.png', new Vector(PLAYER_W, PLAYER_H));
}

function changeImageToAlive(el) {
    el.sprite = new Sprite('images/puji.png', new Vector(PLAYER_W, PLAYER_H));
}

function updateScores() {
    for(var i = 0; i < PLAYER_N; ++i) {
        var el = document.getElementById("player" + i);
        el = el.getElementsByClassName("score")[0];
        el.innerHTML = scores[i];
    }
}

function popup() {
    var el = document.getElementById("popup");
    el.className = 'show';
}

function removePopup() {
    var el = document.getElementById("popup");
    el.className = '';
}

function showNewGame() {
    removePopup();
}

function showEndGame() {
    updateScores();
    popup();
}

function drawPujis() {
    ctx.fillStyle = 'blue';
    for(var i = MAX_PLAYERS - PLAYER_N; i < PUJI_N; ++i) {
        pujis[i].sprite.draw(
            ctx,
            new Vector(pujis[i].location.x * W, pujis[i].location.y * H),
            new Vector(0, 0)
        );
    }
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.clearRect(-PLAYER_W / 2, -PLAYER_H / 2, W + PLAYER_W / 2, H + PLAYER_H / 2);
//    ctx.drawImage(background, -PLAYER_W / 2, -PLAYER_H / 2);
}

function updateTimer() {
    if(SUDDEN_DEATH) return;
    var el = document.getElementById("timer");
    var mins, secs, millis;
    millis = t_begin + SUDDEN_DEATH_AFTER * 1000 - t;
    if(millis <= 0) {
        el.innerHTML = '<span class="red">SUDDEN DEATH!</span>';
        SUDDEN_DEATH = true;
        return;
    }
    mins = Math.floor(millis / 60000);
    millis -= mins * 60000;
    secs = Math.floor(millis / 1000);
    millis -= secs * 1000;
    if(secs < 10) secs = '0' + secs;
    el.innerHTML = mins + ':' + secs;
}

function render() {
    clearCanvas();
    drawPujis();
    updateTimer();
}

function rect(start, size) {
    ctx.fillRect(start.x, start.y, size.x, size.y);
}
