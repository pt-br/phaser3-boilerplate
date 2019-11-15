class Platforms extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    // this.scene.add.existing(this);

    this.body.allowGravity = false;
  }

  create() {
    // this.body.create(400, 568, 'ground')
    //   .setScale(2)
    //   .refreshBody();
    // this.body.create(600, 400, 'ground');
    // this.body.create(50, 250, 'ground');
    // this.body.create(750, 220, 'ground');
  }

  update(keyboard) {
    const cursors = keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.body.setVelocityX(-160);
      this.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(160);
      this.anims.play('right', true);
    } else {
      this.body.setVelocityX(0);
      this.anims.play('turn');
    }

    if (cursors.up.isDown && this.body.touching.down) {
      this.body.setVelocityY(-530);
    }
  }
}

export default Platforms;
