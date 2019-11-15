class DefaultSprite extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    // this.body.allowGravity = false;

    this.create();
  }

  create() {}

  update() {}

  getGroup() {
    return this.group;
  }

  setProperties() {}

  setAnimations() {}
}

export default DefaultSprite;
