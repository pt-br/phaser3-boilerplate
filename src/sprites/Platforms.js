class Platforms extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene);
    this.scene.physics.world.enable(this);
    this.body.setSize(8, 8);
    this.body.offset.set(12, 12);
  }

  update(keys) {}
}

export default Platforms;
