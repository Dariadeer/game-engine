class Camera {

    static defaultBG = '#112';

    /**
     * 
     * @param {Vector} pos 
     * @param {Vector} relativePos 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(pos, canvas) {
        this.fps = 0;
        this.pos = pos;
        this.zoom = 1;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { alpha: false });
        this.dpr = devicePixelRatio;
        this.on = false;
        this.previousTick;
        this.scene;
        this.relativePos;
        this.bindControls();
    }

    attachTo(object) {
        this.target = object;
    }

    updateFPS(t) {
        this.fps = 1 / t * 1000;
    }

    play() {
        this.on = true;
        this.tick();
    }

    stop() {
        this.on = false;
        this.previousTick = null;
    }

    tick(t) {

        // loop

        if(!this.on) {
            return;            
        }

        requestAnimationFrame((t) => this.tick(t));

        if(!this.previousTick) {
            this.previousTick = t;
            return;
        }

        // time

        const dt = t - this.previousTick;
        this.dt = dt;
        this.previousTick = t;
        this.updateFPS(dt);

        // logic

        if(this.target) this.pos = this.target.pos;

        this.ontick(dt);

        // render

        this.clear();

        this.scene.displayObjects(this);
    }

    ontick(dt) {
        this.scene.updateObjects(dt);
    }

    bindControls() {
        window.onresize = () => this.fullscreen();
        window.onresize();

        this.canvas.onwheel = (e) => this.onzoom(e);
    }

    fullscreen() {
        this.canvas.width = innerWidth * this.dpr;
        this.canvas.height = innerHeight * this.dpr;
        this.relativePos = new Vector(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.scale(this.dpr, this.dpr);
    }

    getMovement() {
        return new Vector(this.movements.d - this.movements.a, this.movements.s - this.movements.w).normalise();
    }

    tickMove(dt) {
        this.pos = this.pos.add(this.getMovement().scale(dt * this.speed / this.zoom));
    }

    onzoom(e) {
        let z = this.zoom;
        this.zoom /= 1 + e.deltaY / 2000;
        const dz = (- 1 / this.zoom + 1 / z);
        this.pos = this.pos.add(new Vector(dz * e.x, dz * e.y));
    }

    rect(v, d) {
        const _v = this.map(v), _d = d.scale(this.zoom);
        this.ctx.fillRect(_v.x, _v.y, _d.x, _d.y);
    }

    to(v) {
        this.ctx.moveTo(v.x, v.y);
    }

    link(v) {
        this.ctx.lineTo(v.x, v.y);
    }

    text(string, v) {
        this.ctx.fillText(string, v.x, v.y);
    }

    setColor(c) {
        this.ctx.fillStyle = c;
    }

    map(v) {
        return v.add(this.relativePos).sub(this.pos).scale(this.zoom);
    }

    unmap(v) {
        return v.div(this.zoom).sub(this.relativePos).add(this.pos);
    }

    clear() {
        this.setColor(Camera.defaultBG);
        this.ctx.fillRect(0, 0, innerWidth, innerHeight);
    }
}