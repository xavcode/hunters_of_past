const config = {
    type: Phaser.AUTO,
    width: 1024,  // Tamaño de la ventana de visualización
    height: 768, // Tamaño de la ventana de visualización
    // backgroundColor: '#09f',
    parent: 'game',
    scene: {
        preload,
        create,
        update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};

function preload() {
    this.load.image('map', 'assets/map/mapa2.png');

    this.load.spritesheet('player', 'assets/player/player.png', {
        frameWidth: 32,
    });
}

function create() {
    // Establecer los límites del mundo
    this.physics.world.setBounds(0, 0, 2048, 2048);

    // Agregar el mapa
    this.add.image(0, 0, 'map')
        .setOrigin(0, 0)
        .setDisplaySize(2048, 2048);

    // Agregar el jugador y posicionarlo dentro del mapa
    this.player = this.physics.add.sprite(600, 500, 'player')
        .setOrigin(0, 0)
        .setScale(1.5)
        .setCollideWorldBounds(true); // Colisionar con los límites del mundo

    this.anims.create({
        key: 'player-idle',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key: 'player-walk-sides',
        frames: this.anims.generateFrameNumbers('player', { start: 25, end: 29 }),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key: 'player-walk-up',
        frames: this.anims.generateFrameNumbers('player', { start: 30, end: 35 }),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key: 'player-walk-down',
        frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23 }),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key: 'player-atack',
        frames: this.anims.generateFrameNumbers('player', { start: 36, end: 37 }),
        frameRate: 8,
        repeat: -1
    })


    // Configurar la cámara para que siga al jugador
    this.cameras.main.startFollow(this.player);

    // Limitar la cámara a los límites del mundo
    this.cameras.main.setBounds(0, 0, 2048, 2048);

    this.keys = this.input.keyboard.createCursorKeys();
}

function update() {
    if (this.keys.right.isDown) {
        this.player.setVelocityX(200);  // Mover hacia la derecha
        this.player.anims.play('player-walk-sides', true);
        this.player.flipX = false;
    }
    else if (this.keys.left.isDown) {
        this.player.setVelocityX(-200);  // Mover hacia la izquierda
        this.player.flipX = true;
        this.player.anims.play('player-walk-sides', true);
    }
    else if (this.keys.up.isDown) {
        this.player.setVelocityY(-200);  // Mover hacia arriba
        this.player.anims.play('player-walk-up', true);
    }
    else if (this.keys.down.isDown) {
        this.player.setVelocityY(200);  // Mover hacia abajo
        this.player.anims.play('player-walk-down', true);
    }
    else if (this.keys.up.isDown) {
        this.player.setVelocityY(200);  // Detener el movimiento vertical
    }

    else if (this.keys.up.isDown && this.keys.down.isDown) {
        this.player.setVelocityY(0);  // Detener el movimiento vertical
    }

    else {
        // this.player.anims.stop();
        this.player.anims.play('player-idle', true);
        this.player.setVelocityY(0);
        this.player.setVelocityX(0);        
    }

    if (this.keys.space.isDown){
        this.player.anims.play('player-atack', true);

    }
}

const game = new Phaser.Game(config);
