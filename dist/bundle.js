!function(t){var i={};function e(s){if(i[s])return i[s].exports;var a=i[s]={i:s,l:!1,exports:{}};return t[s].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var a in t)e.d(s,a,function(i){return t[i]}.bind(null,a));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i),e.d(i,"Game",(function(){return h}));class s extends Phaser.State{constructor(){super(),this.onBoard=!0,this.score=0,this.won=!1,this.index=0,this.totalBlocks=0,this.lives=3,this.rotateTimes=0,this.rotateSpeed=5,this.isMoving=!1}preload(){}create(){this.game.physics.startSystem(Phaser.Physics.ARCADE),this.background=this.game.add.tileSprite(0,0,800,600,"bg"),this.arrows=this.game.input.keyboard.createCursorKeys(),this.shoot=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),this._createBoard(),this._createBall(),this._createBlocks(),this.createText()}update(){if(this.background.tilePosition.y+=1,this._boardMovement(),this._ifLowerThanBoard(),this._ballOnBoard(),this.collisions(),this.scoreText.text="Score: "+this.score,this._checkScore(),this.ifLost(),this.ifWon(),this.restart.visible){let t=this;this.game.time.events.add(1500,(function(){t.rotateTimes<=360/t.rotateSpeed&&(t.restart.angle+=t.rotateSpeed,t.rotateTimes++)}))}if(this.rotateTimes===360/this.rotateSpeed){let t=this;this.game.time.events.add(1500,(function(){t.rotateTimes=0}))}}_createBoard(){this.board=this.game.add.sprite(this.game.world.centerX,this.game.world.bottom-50,"board"),this.board.anchor.set(.5),this.game.physics.enable(this.board,Phaser.Physics.ARCADE),this.board.body.collideWorldBounds=!0,this.board.body.immovable=!0}_boardMovement(){this.board.body.velocity.x=0,this.game.input.activePointer.isDown&&(this.game.input.activePointer.x>500?(this.board.body.velocity.x=250,this.isMoving=!0):this.game.input.activePointer.x<300&&(this.isMoving=!0,this.board.body.velocity.x=-250)),this.arrows.right.isDown?(this.isMoving=!0,this.board.body.velocity.x=250):this.arrows.left.isDown&&(this.isMoving=!0,this.board.body.velocity.x=-250)}_createBlocks(){this.blocks=this.game.add.group(),this.blocks.enableBody=!0,this.blocks.physicsBodyType=Phaser.Physics.ARCADE;for(let t=0;t<4;t++)for(let i=0;i<10;i++){this.blocks.create(60*i,40*t,"box"+t).body.immovable=!0,this.totalBlocks++}this.blocks.x=100,this.blocks.y=100}_createBall(){this.ball=this.game.add.sprite(this.board.x,this.board.y-12,"ball"),this.game.physics.enable(this.ball,Phaser.Physics.ARCADE),this.ball.body.collideWorldBounds=!0,this.ball.anchor.set(.5),this.ball.body.bounce.set(1)}_ifLowerThanBoard(){if(this.ball.y>this.board.y+10){this.ball.visible=!1,this.lives--,this.ball.x=this.board.x,this.ball.y=this.board.y-12,this.ball.body.velocity.y=0,this.ball.body.velocity.x=0;let t=this;this.game.time.events.add(1500,(function(){t.ball.visible=!0,t.onBoard=!0}))}}_ballOnBoard(){if(this.onBoard&&(this.ball.x=this.board.x,this.ball.y=this.board.y-12),this.onBoard&&(this.input.activePointer.isDown&&this.input.activePointer.x<500&&this.input.activePointer.x>300||this.shoot.isDown)){let t=200*Math.random()-100;this.ball.body.velocity.set(t,-250),this.onBoard=!1}}hitsBoard(){let t=10*(this.ball.x-this.board.x);this.ball.body.velocity.set(t,-250)}collisions(){this.hitBoard=this.game.physics.arcade.collide(this.ball,this.board,this.hitsBoard,null,this),this.game.physics.arcade.collide(this.ball,this.blocks,this.hitsBlock,null,this)}hitsBlock(t,i){const e=[t,i];e.find(t=>"ball"===t.key);e.find(t=>"ball"!==t.key).kill(),this.score+=10}createText(){this.scoreText=this.game.add.text(50,20,"Score: "+this.score),this.LivesText=this.game.add.text(650,20,"Lives: "+this.lives),this.winText=this.game.add.text(this.game.world.centerX,this.game.world.centerY-100,"YOU WON !!! \n tap to play again",{font:"64px"}),this.winText.anchor.set(.5),this.winText.visible=!1,this.loseText=this.game.add.text(this.game.world.centerX,this.game.world.centerY-100,"YOU LOST :( \n tap to restart ",{font:"64px"}),this.loseText.anchor.set(.5),this.loseText.visible=!1,this.restart=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY+50,"restart"),this.restart.anchor.set(.5),this.restart.inputEnabled=!0,this.restart.angle=0,this.restart.visible=!1}_checkScore(){this.score===10*this.totalBlocks&&(this.won=!0,this.ball.destroy())}ifLost(){if(!this.won&&0===this.lives){this.loseText.visible=!0,this.restart.visible=!0;this.restart.events.onInputDown.add(this.playAgain,this)}}ifWon(){if(this.won){this.restart.visible=!0,this.winText.visible=!0;this.restart.events.onInputDown.add(this.playAgain,this)}}playAgain(){this.won=!1,this.lives=3,this.loseText.visible=!1,this.blocks=null,this.score=0,this.state.restart(),this.onBoard=!0,this.totalBlocks=0,this.restart.visible=!1}}class a extends Phaser.State{constructor(){super(),this.playFingerAnimation=!1,this.shoot=!1}preload(){}create(){this.createImages(),this.createText(),this.game.time.events.add(1e3,this.leftSide,this)}update(){if(this.background.tilePosition.y+=1,this.playFingerAnimation){if(1===this.finger.scale.x){let t=this;this.game.time.events.add(500,(function(){t.finger.scale.set(1.2)}))}if(1.2===this.finger.scale.x){let t=this;this.game.time.events.add(500,(function(){t.finger.scale.set(1)}))}}if(this.ball.y<300&&(this.ball.y=this.board.y-12,this.ball.x=this.board.x,this.canShoot=!0),this.canShoot){let t=200*Math.random()-100;this.ball.body.velocity.set(t,-250),this.canShoot=!1}}createImages(){this.background=this.game.add.tileSprite(0,0,800,600,"bg"),this.big=this.game.add.image(0,0,"big"),this.big.visible=!1,this.small=this.game.add.image(300,0,"small"),this.small.visible=!1,this.finger=this.game.add.image(150,300,"finger"),this.finger.anchor.set(.5),this.finger.visible=!1,this.board=this.game.add.sprite(this.game.world.centerX,this.game.world.bottom-50,"board"),this.board.anchor.set(.5),this.game.physics.enable(this.board,Phaser.Physics.ARCADE),this.board.body.collideWorldBounds=!0,this.board.visible=!1,this.ball=this.game.add.sprite(this.board.x,this.board.y-12,"ball"),this.game.physics.enable(this.ball,Phaser.Physics.ARCADE),this.ball.anchor.set(.5),this.ball.visible=!1}createText(){this.leftText=this.game.add.text(20,30,"Tap here to move \n the board \n to the left"),this.leftText.visible=!1,this.rightText=this.game.add.text(520,30,"Tap here to move \n the board \n to the right"),this.rightText.visible=!1,this.middleText=this.game.add.text(320,30,"Tap here \n to shoot \n the ball"),this.middleText.visible=!1}leftSide(){this.board.visible=!0,this.big.visible=!0,this.finger.visible=!0,this.leftText.visible=!0,this.playFingerAnimation=!0,this.board.body.velocity.x=-100,this.game.time.events.add(4e3,this.rightSide,this)}rightSide(){this.board.x=this.game.world.centerX,this.big.x=500,this.finger.x=650,this.rightText.visible=!0,this.board.body.velocity.x=100,this.leftText.visible=!1,this.game.time.events.add(4e3,this.middle,this)}middle(){this.ball.visible=!0,this.board.x=this.game.world.centerX,this.board.body.velocity.x=0,this.canShoot=!0,this.big.visible=!1,this.small.visible=!0,this.rightText.visible=!1,this.middleText.visible=!0,this.finger.x=400;let t=this;this.game.time.events.add(4e3,(function(){t.game.state.start("game")}))}}class o extends Phaser.State{init(){}preload(){this.game.load.image("board","./assets/board1.png"),this.game.load.image("ball","./assets/ball.png"),this.game.load.image("bg","./assets/background.png"),this.game.load.image("box0","./assets/box0.png"),this.game.load.image("box1","./assets/box1.png"),this.game.load.image("box2","./assets/box2.png"),this.game.load.image("box3","./assets/box3.png"),this.game.load.image("restart","./assets/restart.png"),this.game.load.image("finger","./assets/finger.png"),this.game.load.image("big","./assets/bigSquare.png"),this.game.load.image("small","./assets/smallSquare.png")}create(){this.game.state.start("intro")}}class h extends Phaser.Game{constructor(){super({width:800,height:600,backgroundColor:"#000000",parent:"phaser-game"}),this.state.add("preload",o,!0),this.state.add("game",s,!1),this.state.add("intro",a,!1)}}new h}]);