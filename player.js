function Player(location, velocity, face, isDead, isPlayer, playerIndex, sprite) {
    this.location = location;
    this.velocity = velocity;
    this.face = face;
    this.isPlayer = isPlayer;
    this.playerIndex = playerIndex;
    this.stopTime = -1;
    this.isDead = isDead;
    this.resurrectTime = -1;
    this.sprite = sprite;
    this.noResurrect = 0;
}

Player.prototype = {
    constructor: 'Player',
    integrate: function(dt) {
        if(this.isDead) return;
        this.location.x += this.velocity.x * PLAYER_SPEED * dt;
        this.location.y += this.velocity.y * PLAYER_SPEED * dt;
        this.face = this.velocity;
        if(this.location.x < 0) {
            this.location.x = 0;
        }
        if(this.location.x > 1 - PLAYER_SIZE_W) {
            this.location.x = 1 - PLAYER_SIZE_W;
        }
        if(this.location.y < 0) {
            this.location.y = 0;
        }
        if(this.location.y > 1 - PLAYER_SIZE_H) {
            this.location.y = 1 - PLAYER_SIZE_H;
        }
    },
    fire: function() {
        if(this.isDead) return;
        for(var i = MAX_PLAYERS - PLAYER_N; i < PUJI_N; ++i) {
            if(pujis[i].isDead || (pujis[i].isPlayer && this.playerIndex == pujis[i].playerIndex)) continue;
            if(this.location.distance(pujis[i].location) < FIRE_DISTANCE) {
                if(pujis[i].isPlayer) addPoint(this.playerIndex);
                pujis[i].die();
            }
        }
    },
    die: function() {
        this.isDead = true;
        this.deadTime = 0;
        this.sprite = new Sprite('images/dead.png', new Vector(PLAYER_W, PLAYER_H));
    },
    resurrect: function() {
        this.isDead = false;
        this.deadTime = -1;
        this.resurrectTime = -1;
        this.sprite = new Sprite('images/puji.png', new Vector(PLAYER_W, PLAYER_H));
    }
};
