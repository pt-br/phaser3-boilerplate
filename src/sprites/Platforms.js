class Platforms extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;

    this.create();
  }

  create() {
    this.group = this.scene.physics.add.staticGroup();

    this.group
      .create(400, 568, 'ground')
      .setScale(2)
      .refreshBody();

    this.group.create(600, 400, 'ground');
    this.group.create(50, 250, 'ground');
    this.group.create(750, 220, 'ground');
  }

  getGroup() {
    return this.group;
  }
}

export default Platforms;
