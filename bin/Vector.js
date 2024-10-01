class Vector {

    static MAX = 10e6; // for integer vectors

    static origin = new Vector(0, 0);
    static up = new Vector(0, 1);
    static right = new Vector(1, 0);

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    scale(n) {
        return new Vector(this.x * n, this.y * n);
    }

    div(n) {
        return new Vector(this.x / n, this.y / n);
    }

    normalise() {
        if(this.x === 0 && this.y === 0) return Vector.origin;
        return this.div(this.magnitude());
    }

    round() {
        return new Vector(Math.round(this.x), Math.round(this.y));
    }

    floor() {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    }

    magnitude() {
        return (this.x**2 + this.y**2)**0.5;
    }

    distance(v) {
        return this.sub(v).magnitude();
    }

    components() {
        return [this.x, this.y];
    }

    pack() {
        return (this.x + Vector.MAX) * (2 * Vector.MAX) + (this.y + Vector.MAX);
    }

    static unpack(value) {
        return new Vector(
            Math.floor(value / (2 * Vector.MAX)) - Vector.MAX,
            (value % (2 * Vector.MAX)) - Vector.MAX
        );
    }
}