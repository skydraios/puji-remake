var PLAYER_SIZE_W = PLAYER_W / W,
    PLAYER_SIZE_H = PLAYER_H / H,
    PLAYER_SPEED = 0.003,
    FPS = 20,
    GAME_SPEED = 1,
    MAX_PLAYERS = 4,
    PLAYER_N,
    PUJI_N = 32,
    FIRE_DISTANCE = 0.06,
    SUDDEN_DEATH_AFTER = 05, // in seconds
    COUNT_DEAD = 0,
    SUDDEN_DEATH = false,
    GAME_ENDED = false,
    t = new Date() | 0,
    t_begin = new Date() | 0;

var pujis = [];

var nextDeathTime = -1;

function suddenDeath() {
    var killMe;
    if(nextDeathTime < t) {
        if(nextDeathTime >= 0) {
            killMe = MAX_PLAYERS + Math.round(Math.random() * (PUJI_N - MAX_PLAYERS - 1));
            pujis[killMe].die();
            pujis[killMe].noResurrect = 1;
        }
        nextDeathTime = t + Math.random() * 5000 + 3000;
    }
}

function checkForSuddenDeath() {
    if(t > t_begin + SUDDEN_DEATH_AFTER * 1000) {
        suddenDeath();
    }
}

function checkGameEnded() {
    if(COUNT_DEAD >= PLAYER_N - 1) {
        endGame();
    }
}

function startGame(players) {
    t_begin = new Date() | 0;
    COUNT_DEAD = 0;
    SUDDEN_DEATH = false;
    PLAYER_N = players;
    PUJI_N += MAX_PLAYERS - PLAYER_N;
    pujis = [];
/*

EXPLANATION:
    pujis: array with PUJI_N elements
    pujis[0 .. MAX_PLAYERS - PLAYER_N]: dead and invisible players to fill array
    pujis[MAX_PLAYERS - PLAYER_N .. MAX_PLAYERS]: PLAYER_N entries for each player
    pujis[MAX_PLAYERS .. PUJI_N]: AI pujis

*/
    for(var i = 0; i < MAX_PLAYERS - PLAYER_N; ++i) {
        var position = new Vector(0, 0),
            face = new Vector(0, 0);
        pujis.push(
            new Player(
                0,
                position,
                new Vector(0, 0),
                face,
                true,
                false,
                new Sprite('images/blank.png', new Vector(PLAYER_W, PLAYER_H))
            )
        );
    }
    for(var i = MAX_PLAYERS - PLAYER_N; i < MAX_PLAYERS; ++i) {
        scores.push(0);
        updateScores();
        var position = new Vector(Math.random(), Math.random()),
            face = new Vector(0, 0); // TODO: randomize face
        pujis.push(
            new Player(
                i,
                position,
                new Vector(0, 0),
                face,
                false,
                true,
                new Sprite('images/puji.png', new Vector(PLAYER_W, PLAYER_H))
            )
        );
    }
//    console.log(pujis);
    for(var i = MAX_PLAYERS; i < PUJI_N; ++i) {
        pujis.push(
            new Player(
                i,
                new Vector(Math.random(), Math.random()),
                new Vector(0, 0), // TODO: randomize starting velocity
                new Vector(0, 0),
                false,
                false,
                new Sprite('images/puji.png', new Vector(PLAYER_W, PLAYER_H))
            )
        );
    }
}

function addPoint(i) {
    ++scores[i];
    updateScores();
}

startGame(4);

function integratePujis(dt) {
    for(var i = MAX_PLAYERS - PLAYER_N; i < PUJI_N; ++i) {
        pujis[i].integrate(dt);
    }
}

function AIBots() {
    for(var i = MAX_PLAYERS; i < PUJI_N; ++i) {
        if(pujis[i].isDead && !pujis[i].noResurrect) {
            if(!pujis[i].isPlayer && pujis[i].resurrectTime < 0) {
                pujis[i].resurrectTime = t + Math.random() * 5000 + 3000;
            } else if(t > pujis[i].resurrectTime) {
                pujis[i].resurrect();
            }
            continue;
        }
        if(pujis[i].stopTime < t) {
            pujis[i].stopTime = t + Math.random() * 4000;
            pujis[i].velocity = new Vector(Math.round(1 - 2 * Math.random()), Math.round(1 - 2 * Math.random()));
            if(pujis[i].velocity.x * pujis[i].velocity.y != 0) { // disallow diagonal movements
                pujis[i].velocity = new Vector(0, 0);
            }
        }
    }
}

function tick(dt) {
    AIBots();
    integratePujis(dt);
    checkForSuddenDeath();
    checkGameEnded();
    render();
}


function mainLoop() {
    var dt = (new Date() | 0) - t;
    tick(GAME_SPEED * dt / FPS);
    t = new Date() | 0;
}

var wi = window.setInterval(mainLoop, FPS);

function endGame() {
    GAME_ENDED = true;
    showEndGame();
    clearInterval(wi);
}

function newGame() {
    GAME_ENDED = false;
    showNewGame();
    wi = window.setInterval(mainLoop, FPS);
}

function restart() {
    if(!GAME_ENDED) return;
    newGame();
    startGame(PLAYER_N);
}
