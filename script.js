
const score=document.querySelector(".score");
const startscreen=document.querySelector(".startscreen");
const gamearea=document.querySelector(".gamearea");
player={
    speed:5,score:0
};


let keys={
    ArrowUp: false,ArrowDown : false , ArrowRight:false, ArrowLeft:false
}
startscreen.addEventListener("click",start);
addEventListener("keydown",keydown);
addEventListener("keyup",keyup);
function keydown(e){
    e.preventDefault();
    keys[e.key]=true;
    console.log(keys);
}
function keyup(e){
    e.preventDefault();
    keys[e.key]=false;
    console.log(e.key);
}
function moving(){

    let liness=document.querySelectorAll(".lines");
   
    liness.forEach(function(item){
        if(item.y>600){
            item.y -= 700;
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";
    })
}
function iscolide(a,b){
    arect=a.getBoundingClientRect();
    brect=b.getBoundingClientRect();
    return !((arect.bottom<brect.top) || (arect.top> brect.bottom)
|| (arect.right< brect.left) || ( arect.left > brect.right))
}
function endgame(){
    player.start=false;
    startscreen.classList.remove("hide");
}
function moveenemy(car){

    let liness=document.querySelectorAll(".enemy");

    liness.forEach(function(item){
        if(iscolide(car,item)){
            console.log("boom");
            endgame();
        }
        if(item.y>630){
            item.y -=  700;
            item .style.left=Math.floor(Math.random()*380) + "px";
        }
     
        item.y+=player.speed;
        item.style.top=item.y+"px";
    })
}

function gameplay(){

    let car=document.querySelector('.car');
    let road=gamearea.getBoundingClientRect();
    if(player.start){
   moving();
   moveenemy(car);
 if(keys.ArrowDown && player.y< (road.bottom-130)){player.y += player.speed}
 if(keys.ArrowUp && player.y> (road.top+100)){player.y -=  player.speed}
 if(keys.ArrowLeft && player.x >0 ){player.x -=  player.speed}
 if(keys.ArrowRight && player.x<(road.width - 80)  ){player.x +=  player.speed}
 car.style.top=player.y +"px";
 car.style.left=player.x +"px";
 window.requestAnimationFrame(gameplay);
player.score++;
score.innerText="score:-"+player.score;
}
}
function start(){
     startscreen.classList.add("hide");
gamearea.innerHTML="";
   
player.start=true;
player.score=0;
window.requestAnimationFrame(gameplay);
for(i=0;i<5;i++){
    let roadline=document.createElement('div');
roadline.setAttribute("class", "lines");
roadline.y=i*150;
roadline.style.top=roadline.y+"px";
gamearea.appendChild(roadline);
}
for(i=0;i<4;i++){
    let enemycar=document.createElement('div');
enemycar.setAttribute("class", "enemy");
enemycar.y=i*150;
enemycar.style.top=enemycar.y+"px";
enemycar.style.backgroundImage= randomcolor();
enemycar.style.left=Math.floor(Math.random()*380) + "px";
gamearea.appendChild(enemycar);

}
let car=document.createElement('div');
car.setAttribute("class","car");
car.innerText="";
gamearea.appendChild(car);
player.x=car.offsetLeft;
 player.y=car.offsetTop;


}
function randomcolor(){
    function c(){
        let hex=Math.floor(Math.random() * 256).toString(16);
        return ("0"+ String(hex)).substr(-2);
    }
    console.log("clor is "+ "#"+c()+c()+c());
    return "#"+c()+c()+c();
}