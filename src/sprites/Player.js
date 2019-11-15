class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.create();
  }

  create() {
    this.setProperties();
    this.setAnimations();
  }

  update(keyboard) {
    this.setControllers(keyboard);
  }

  setControllers(keyboard) {
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

  setProperties() {
    this.body.setBounce(0.2);
    this.body.setCollideWorldBounds(true);
    this.body.setGravityY(300);
  }

  setAnimations() {
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}

export default Player;
