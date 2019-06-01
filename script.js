var NSJam = NSJam || {}; //namespace
/*GAME */
 window.addEventListener('load', function(){
   var GAME_WIDTH = 400;
   var GAME_HEIGHT = 200;
   var canvas = document.getElementById("mycanvas");
   var startbtn = document.getElementById("p-btn");
   var ctx = canvas.getContext("2d");
   ctx.font = "25px Arial";

   var enemies = [
         {
          x: GAME_WIDTH, //x coordinate
          y: randInt(0,160), //y coordinate
          speedX: -randInt(5,10), //speed in X
          w: randInt(20,40), //width
          h: randInt(20,40), //heght
          ready: true
         }
       ];
   var player = function() {
     this.x = 50;
     this.y = 30;
     this.speedX = 2;
     this.speedY = 0;
     this.maxSpeedY = 5;
     this.jumpSpeed = 7;
     this.gravity = 0.5;
     this.w = 20;
     this.h = 20;
     this.isMoving = false;
   };
   var gameStart = false;
   var gameOver = false;
   var sprites = {};
   var score = 0;



   var boxo = new player();
   canvas.addEventListener("mousedown", boxoJump);
   canvas.addEventListener("touchstart", boxoJump);
   startbtn.addEventListener("mousedown", startGame);
   startbtn.addEventListener("touchstart", startGame);
   ctx.fillStyle = "green";
   ctx.fillText("Floppy-Box", 125, 100);

   enemies[0].ready = true;
  var updatePositions = function(){
    updatePlayer();
    for(var i = 0; i < enemies.length; i++){
      if(enemies[i].ready){
        enemies[i].x += enemies[i].speedX;
      }
    }
  };
   /*Functions*/
   function startGame(){
     gameStart = !gameStart;
   }
   function load(){
     sprites.player = new Image();
     sprites.player.src = 'images/hero.png';
     sprites.bg = new Image();
     sprites.bg.src = 'images/floor.png';
     sprites.en = new Image();
     sprites.en.src = 'images/enemy.png';
     sprites.g = new Image();
     sprites.g.src = 'images/chest.png';
   };
   function boxoJump(){
    boxo.speedY = -boxo.jumpSpeed;
   }
   function updatePlayer(){
     if(boxo.speedY < boxo.maxSpeedY){
       boxo.speedY += boxo.gravity;
      }
      else{
        boxo.speedY = boxo.maxSpeedY;
      }
     if(boxo.y >= GAME_HEIGHT - boxo.h){
       boxo.y = GAME_HEIGHT - boxo.h;
       boxo.y += boxo.speedY;
     }
     else{
       boxo.y += boxo.speedY;
     }
     if(boxo.y <= 0){
       boxo.y = 0;
       boxo.speedY = 0;
       boxo.y += boxo.speedY;
     }
   }
   function checkCollision(obj1, obj2){
   var w = Math.abs(obj1.x - obj2.x) <= Math.max(obj1.w, obj2.w);
   var h = Math.abs(obj1.y - obj2.y) <= Math.max(obj1.h, obj2.h);
   return w && h;
   }
   function checkHit(){
     for(var i = 0; i < enemies.length; i++){
       checkPass(enemies[i]);
       if(checkCollision(boxo, enemies[i]) || boxo.y + boxo.h >= GAME_HEIGHT - 2){
         gameOver = true;
         restartGame();
       }
     }
   }
   function restartGame(){
     score = 0;
     boxo.y = 30;
     enemies[0].x = 600; //x coordinate
     enemies[0].y = randInt(0,260); //y coordinate
     enemies[0].speedX = -randInt(5,10); //speed in X
     enemies[0].w = randInt(20,40); //width
     enemies[0].h = randInt(20,40); //heght
     enemies[0].ready = true;
     gameOver = false;
   }
   function checkPass(obj){
     if((obj.x + obj.w) <= 0){
       score++;
       obj.speedX = -randInt(5,10) - (0.5*score);
       obj.w = randInt(20,40); //width
       obj.h = randInt(20,40); //heght
       obj.x = GAME_WIDTH;
       obj.y = randInt(0,GAME_HEIGHT - obj.h);
       obj.ready = true;

     }
   }
   function randInt(min, max){
     min = Math.ceil(min);
     max = Math.floor(max);
     var pos = (Math.floor(Math.random() * (max - min)) + min)
     return pos;
   };

   var draw = function(){
     ctx.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);

     ctx.fillStyle = "#884422";
     ctx.fillRect(boxo.x, boxo.y, boxo.w, boxo.h);
     /*enemy movement*/
     for(var i = 0; i < enemies.length; i++){
       ctx.fillStyle = "red";
       ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].w, enemies[i].h);
     }
     ctx.fillRect(0, GAME_HEIGHT-2, GAME_WIDTH,2);
     /*Draw score label*/
     ctx.fillStyle = "white";
     ctx.fillText("Score: "+ score, 5, 20);
   };
   var step = function(){
     if(!gameOver){
       if(gameStart){
         updatePositions();
         draw();
         checkHit();
       }
      window.requestAnimationFrame(step);
      }
   };
   //load();
   step();
 });
 /*
 //Arrays
 var shoppingList = new Array();
 var shoppingList2 = ['bread', 'corn', 'more corn'];

 console.log(shoppingList2);
 shoppingList2[0] = 'even more corn';
 console.log(shoppingList2);
 var enemies = [
   {x:10, y: 10, color: 'red'},
   {x:20, y:20, color: 'blue'}
 ];
 var junk = [1, 'stuff', 22.22, {name: 'hi'}, {hp: 12}];
 console.log(junk.length);
 junk.push("knife", "laser");
 console.log(junk);
 junk.pop();
 console.log(junk);
 junk.splice(1, 3, "bow", "Sword"); //index 1, remove 3 elements add bow and sword
 console.log(junk);

 var enemies = [
   {x: 10, y: 50, hp: 100},
   {x: 20, y: 50, hp: 50},
   {x: 30, y: 50, hp: 1000},
   {x: 40, y: 50, hp: 10},
 ];

 var player = {
   name: "Rozen",
   hp: 1000,
   weapons: ["katana", "gun"],
   addWeapon: function(newWeapon){
     this.weapons.push(newWeapon);
     console.log(player.weapons);
   }
 };
 player.addWeapon("Dual Blades");
 console.log(player);
 function convert(num){
   var c = num * 100;
   return c;
 }
 var a = 2;
 console.log(convert(a));

 var fun = function(){
   console.log('This is fun');
 }
 player.addWeapon = fun; //function assignemnt expression
 player.addWeapon();   // function call

 player.addWeapon = function(newWeapon){
   this.weapons.push(newWeapon);
 }
 player.addWeapon("Spade");

 */
