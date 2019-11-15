class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.acceleration = 600;
    this.body.maxVelocity.x = 200;
    this.body.maxVelocity.y = 500;
    // this.anims.play('stand');
    this.type = 'player';
  }

  update(keys) {}
}

export default Player;
