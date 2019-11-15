import spr_sky from '../assets/sky.png';
import spr_star from '../assets/star.png';
import spr_ground from '../assets/platform.png';
import spr_bomb from '../assets/bomb.png';
import spr_dude from '../assets/dude.png';

import Player from '../sprites/Player';
import Platforms from '../sprites/Platforms';

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene',
    });

    this.score = 0;
  }

  preload() {
    this.load.image('sky', spr_sky);
    this.load.image('star', spr_star);
    this.load.image('ground', spr_ground);
    this.load.image('bomb', spr_bomb);
    this.load.spritesheet('dude', spr_dude, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.initContruction();

    this.player = new Player({
      scene: this,
      key: 'dude',
      x: 100,
      y: 450,
    });

    // this.platforms = new Platforms({
    //   scene: this,
    //   key: 'ground',
    //   x: 100,
    //   y: 450,
    // });

    this.player.create();
    // this.platforms.create();

    this.setAnimations();

    // essas 2 ficam aqui :)
    this.setColliders();
    this.setOverlappers();

    // // Set bounds for current room
    // this.player.setRoomBounds(this.rooms);

    // // The camera should follow Mario
    // this.cameras.main.startFollow(this.player);

    // this.cameras.main.roundPixels = true;
  }

  update() {
    const { keyboard } = this.input;

    this.player.update(keyboard);
  }

  initContruction() {
    // Scenario bg
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.add.image(0, 0, 'star').setOrigin(0, 0);

    // Score
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    });

    this.platforms = this.physics.add.staticGroup();

    this.platforms
      .create(400, 568, 'ground')
      .setScale(2)
      .refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    // Stars
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    // Bombs group
    this.bombs = this.physics.add.group();
  }

  setAnimations() {
    // Stars animation
    this.stars.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  }

  setColliders() {
    // Colliders
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this,
    );
  }

  setOverlappers() {
    // Overlappers
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this,
    );
  }

  // Game fns
  collectStar(player, star) {
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function(child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      let bomb = this.bombs.create(x, 16, 'bomb');

      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  hitBomb(player, bomb) {
    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play('turn');

    gameOver = true;
  }
}

export default GameScene;
