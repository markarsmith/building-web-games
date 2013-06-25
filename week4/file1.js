/**
 * Created by markl_000 on 25/06/13.
 */
var previous = Date.now();

function game_frame() {
    game();
    ready_to_draw = true;
    setTimeout(game_frame, 1000/60);
};

function draw_frame() {
    ready_to_draw = fale;
    draw();
    requestAnimationFrame(draw_frame);
};

function Game() {

}

Game.prototype = {
    loop: function (){
        this.input();
        this.gameFrame();
    },
    loop2: function (){
        this.input();
        this.gameFrame();
    }
}

var Person = function(n){
    if(n){this.name = n;}
}

Person.prototype.speak = function () {alert(this.name)};
Person.prototype.name = 'annoy';

var p1 = new Person('bert');
var p2 = new Person();
p1.speak();
p2.speak();



//Polymorphism: -

Player.prototype.fire = function(){
    this.currentWeapon.fire();
}

Player.prototype.fire = function(){
    if(this.currentWeapon == 'pistol');
    if(this.currentWeapon == 'shotgun');
}

ctx.drawImage(p1.currentWeapon.image);