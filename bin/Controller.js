class Controller {
    constructor() {
        this.scene = new Scene();
    }

    /**
     * 
     * @param {Camera} camera 
     */
    setCamera(camera) {
        this.camera = camera;
        this.camera.scene = this.scene;
        this.camera.play()
    }
}