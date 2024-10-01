const canvas = document.querySelector('#main');

const controller = new Controller();

const camera = new Camera(
    Vector.origin,
    canvas
)

controller.setCamera(camera);

const character = new Character(Vector.origin);

controller.scene.add(character);

for(let i = 0; i < 100; i++) {
    controller.scene.add(new Entity(new Vector(Math.random() * 2000 - 1000, Math.random() * 2000 - 1000)));
}


camera.attachTo(character);