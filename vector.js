function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype = {
    constructor: 'Vector',
    distance: function(other) {
        return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y));
    }
};
