class Scene {
    constructor() {
        this.objects = [];
    }

    add(object) {
        this.objects.push(object);
    }

    displayObjects(camera) {
        this.objects.forEach(obj => {
            obj.display(camera);
        })
    }

    updateObjects(dt) {
        this.objects.forEach(obj => {
            obj.updateState(dt);
        })
    }
}