class Entity {
    /**
     * 
     * @param {Vector} pos 
     */
    constructor(pos) {
        this.pos = pos;
        const n = Math.random() * 80 + 20;
        this.displayOffset = new Vector(n, n);
    }

    /**
     * 
     * @param {Camera} camera 
     */
    display(camera) {
        camera.setColor('#ff0');
        camera.rect(this.pos.sub(this.displayOffset), this.displayOffset.scale(2));
    }

    updateState(dt) {
        
    }
}