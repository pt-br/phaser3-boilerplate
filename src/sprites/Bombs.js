class Bombs extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    
    this.scene = config.scene;
    this.scene.physics.world.enable(this);

    this.create();
  }

  create() {
    this.group = this.scene.physics.add.group();
  }

  getGroup() {
    return this.group;
  }
}

export default Bombs;
