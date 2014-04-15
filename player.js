function Player(index, location, velocity, face, isDead, isPlayer, sprite) {
    this.index = index;
    this.location = location;
    this.velocity = velocity;
    this.face = face;
    this.isPlayer = isPlayer;
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
            if(pujis[i].isDead || (pujis[i].isPlayer && this.index == pujis[i].index)) continue;
            if(this.location.distance(pujis[i].location) < FIRE_DISTANCE) {
                if(pujis[i].isPlayer) addPoint(this.index);
                pujis[i].die();
            }
        }
    },
    die: function() {
        if(this.isPlayer) {
            ++COUNT_DEAD;
        }
        this.isDead = true;
        this.deadTime = 0;
        changeImageToDead(this);
    },
    resurrect: function() {
        this.isDead = false;
        this.deadTime = -1;
        this.resurrectTime = -1;
        changeImageToAlive(this);
    }
};
