import spr_sky from '../assets/sky.png';
import spr_star from '../assets/star.png';
import spr_ground from '../assets/platform.png';
import spr_bomb from '../assets/bomb.png';
import spr_dude from '../assets/dude.png';

import Player from '../sprites/Player';
import Platforms from '../sprites/Platforms';
import Stars from '../sprites/Stars';
import Bombs from '../sprites/Bombs';

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

    // Score
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    });

    // Sprites
    this.player = new Player({
      scene: this,
      key: 'dude',
      x: 100,
      y: 450,
    });

    this.platforms = new Platforms({
      scene: this,
      key: 'ground',
    });

    this.stars = new Stars({
      scene: this,
      key: 'star',
    });

    this.bombs = new Bombs({
      scene: this,
      key: 'bomb',
    });

    this.platformsGroup = this.platforms.getGroup();
    this.starsGroup = this.stars.getGroup();
    this.bombsGroup = this.bombs.getGroup();
  }

  setColliders() {
    this.physics.add.collider(this.player, this.platformsGroup);
    this.physics.add.collider(this.starsGroup, this.platformsGroup);
    this.physics.add.collider(this.bombsGroup, this.platformsGroup);
    this.physics.add.collider(
      this.player,
      this.bombsGroup,
      this.hitBomb,
      null,
      this,
    );
  }

  setOverlappers() {
    this.physics.add.overlap(
      this.player,
      this.starsGroup,
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

    if (this.starsGroup.countActive(true) === 0) {
      this.starsGroup.children.iterate(function(child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      let bomb = this.bombsGroup.create(x, 16, 'bomb');

      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  hitBomb(player, bomb) {
    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play('turn');

    this.scene.restart();
  }
}

export default GameScene;
