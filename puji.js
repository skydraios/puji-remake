var PLAYER_SIZE_W = PLAYER_W / W,
    PLAYER_SIZE_H = PLAYER_H / H,
    PLAYER_SPEED = 0.003,
    FPS = 20,
    GAME_SPEED = 1,
    MAX_PLAYERS = 4,
    PLAYER_N,
    PUJI_N = 32,
    t = new Date() | 0,
    FIRE_DISTANCE = 0.05;
    
var pujis = [];

function startGame(players) {
    PLAYER_N = players;
    PUJI_N += MAX_PLAYERS - PLAYER_N;
    for(var i = 0; i < MAX_PLAYERS - PLAYER_N; ++i) {
        var position = new Vector(0, 0),
            face = new Vector(0, 0); // TODO: randomize face
        pujis.push(
            new Player(
                position,
                new Vector(0, 0),
                face,
                false,
                0,
                new Sprite('images/blank.png', new Vector(PLAYER_W, PLAYER_H))
            )
        );
    }
    for(var i = MAX_PLAYERS - PLAYER_N; i < MAX_PLAYERS; ++i) {
        scores.push(0);
        var position = new Vector(Math.random(), Math.random()),
            face = new Vector(0, 0); // TODO: randomize face
        pujis.push(
            new Player(
                position,
                new Vector(0, 0),
                face,
                true,
                i,
                new Sprite('images/puji.png', new Vector(PLAYER_W, PLAYER_H))
            )
        );
    }
    console.log(pujis);
    for(var i = MAX_PLAYERS; i < PUJI_N; ++i) {
        pujis.push(
            new Player(
                new Vector(Math.random(), Math.random()),
                new Vector(0, 0), // TODO: randomize starting velocity
                new Vector(0, 0),
                false,
                -1,
                new Sprite('images/puji.png', new Vector(PLAYER_W, PLAYER_H))
            )
        );
    }
}

startGame(4);

function integratePujis(dt) {
    var countDead = 0;
    for(var i = MAX_PLAYERS - PLAYER_N; i < PUJI_N; ++i) {
        if(pujis[i].isDead) {
            if(pujis[i].isPlayer) ++countDead;
            pujis[i] = new Player(
                pujis[i].location,
                new Vector(0, 0),
                new Vector(0, 0),
                pujis[i].isPlayer,
                pujis[i].playerIndex,
                new Sprite('images/dead.png', new Vector(PLAYER_W, PLAYER_H))
            );
        }
        pujis[i].integrate(dt);
    }
    if(countDead == PLAYER_N - 1) endGame();
}

function AIBots() {
    for(var i = MAX_PLAYERS; i < PUJI_N; ++i) {
        if(pujis[i].isDead) {
            if(pujis[i].deadTime < 0) {
                pujis[i].deadTime = Math.random() * 10000;
            }
            continue;
        }
        if(pujis[i].stopTime < t) {
            pujis[i].stopTime = t + Math.random() * 4000;
            pujis[i].velocity = new Vector(Math.round(1 - 2 * Math.random()), Math.round(1 - 2 * Math.random()));
            if(pujis[i].velocity.x * pujis[i].velocity.y != 0) {
                pujis[i].velocity = new Vector(0, 0);
            }
        }
    }
}

function tick(dt) {
    AIBots();
    integratePujis(dt);
    render();
}


function mainLoop() {
    var dt = (new Date() | 0) - t;
    tick(GAME_SPEED * dt / FPS);
    t = new Date() | 0;
}

var wi = window.setInterval(mainLoop, FPS);
