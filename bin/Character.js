class Character extends Entity {

    static defaultSize = 10;
    static defaultColor = '#fff';

    /**
     * 
     * @param {Vector} pos 
     */
    constructor(pos) {
        super(pos);

        this.displayConfig();

        this.bindControls();
    }

    displayConfig() {
        this.trail = [...new Array(16)].map(() => new Vector(this.pos.x, this.pos.y));
        this.displayOffset = new Vector(Character.defaultSize, Character.defaultSize);
        this.displaySize = this.displayOffset.scale(2);
    }

    bindControls() {
        this.speed = 0.3;
        this.controls = {
            w: !1, a: !1, s: !1, d: !1
        }

        document.addEventListener('keydown', (e) => this.keydown(e));
        
        document.addEventListener('keyup', (e) => this.keyup(e));
    }

    keydown(e) {
        switch(e.key) {
            case 'w':
            case 'a':
            case 's':
            case 'd':
                this.controls[e.key] = true;
        }
    }

    keyup(e) {
        switch(e.key) {
            case 'w':
            case 'a':
            case 's':
            case 'd':
                this.controls[e.key] = false;
        }
    }

    getMovement(dt) {
        const {w, a, s, d} = character.controls;

        return new Vector(d - a, s - w).normalise().scale(this.speed * dt);
    }

    /**
     * 
     * @param {Camera} camera 
     */
    display(camera) {
        this.trail.shift();
        this.trail.push(new Vector(this.pos.x, this.pos.y));

        this.trail.forEach((e, i) => {
            camera.setColor(Character.defaultColor + i.toString(16));
            camera.rect(e.sub(this.displayOffset), this.displaySize);
        });
    }

    updateState(dt) {
        this.pos = this.pos.add(this.getMovement(dt));
    }
}