class Stars extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    
    this.scene = config.scene;
    this.scene.physics.world.enable(this);

    this.create();
  }

  create() {
    this.group = this.scene.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.setAnimations();
  }

  getGroup() {
    return this.group;
  }

  setAnimations() {
    this.group.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  }
}

export default Stars;
