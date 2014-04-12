function Player(location, velocity, face, isPlayer, playerIndex, sprite) {
    this.location = location;
    this.velocity = velocity;
    this.face = face;
    this.isPlayer = isPlayer;
    this.playerIndex = playerIndex;
    this.stopTime = -1;
    this.isDead = false;
    this.deadTime = -1;
    this.waitingTime = 5;
    this.sprite = sprite;
}

Player.prototype = {
    constructor: 'Player',
    integrate: function(dt) {
        this.location.x += this.velocity.x * PLAYER_SPEED * dt;
        this.location.y += this.velocity.y * PLAYER_SPEED * dt;
        this.face = this.velocity;
        if(this.deadTime >= 0) this.deadTime += dt;
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
        for(var i = MAX_PLAYERS - PLAYER_N; i < PUJI_N; ++i) {
            if(pujis[i].isPlayer && this.playerIndex == pujis[i].playerIndex) continue;
            if(this.location.distance(pujis[i].location) < FIRE_DISTANCE) {
                if(pujis[i].isPlayer) ++scores[this.playerIndex];
                pujis[i].isDead = true;
            }
        }
    }
};
