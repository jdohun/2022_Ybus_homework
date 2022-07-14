
const ready = 1;
const start = 2;
const Over = 3;

let gameCondition = ready; // 현재 게임 상태 시작 준비중

let playerSpeed = 1;
let playerY = 232;
let playerX = 282;

let total_Bullets = 50; // 화면에 분포되어야하는 전체 총알의 개수
let total_guideds = 10; // 화면에 분포되어야하는 전체 유도탄의 개수
let current_Bullets = 0; // 현재 생성되어 있는 총알의 개수
let current_guideds = 0; // 현재 생성되어 있는 유도탄의 개수
let times = 0.00; // 게임 시작 후 흐른 시간

let bulletsAttr = [];

// total_Bullet을 동서남북에 4분할 -> 동서남북이 12로 초기화됨
// 동:0, 서:1, 남:2, 북:3
let creation_walls = [12, 12, 12, 12]; // 동 서 남 북의 총알의 개수

let minBullet = 12; // 동서남북 중에서 가장 적은 수의 총알 가진 벽의 총알의 개수
let possilbe_walls = []; // 동:0, 서:1, 남:2, 북:3

let bulletNumber = 0;
let choiced_walls = null;

// main ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 시작 전 준비

// 50개를 4분할하고 남은 2개의 총알을 배분할 벽 두 곳 선택
choiced_walls = Math.floor((Math.random() * 10) % 4);
creation_walls[choiced_walls] += 1;

findPossiibleCreateWall();

choiced_walls = Math.floor((Math.random() * 10) % possilbe_walls.length);
creation_walls[possilbe_walls[choiced_walls]] += 1;
possilbe_walls = [];

createBullet();
drawPlayer();
gameReady();

// 시작

// 함수 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 동서남북 중에서 가장 적은 수의 총알 가진 벽의 총알의 개수를 저장
function findMinBullet() {
    let temp = Number.MAX_VALUE;
    for(let i = 0; i < 4; ++i){
        if(temp >= creation_walls[i]) {
            temp = creation_walls[i];
        }
    }

    if(temp == minBullet){
        return;
    }
    else {
        minBullet = temp;
    }
}

// 총알 생성 가능한 벽 목록 저장 : minBullet과 같은 값의 벽 저장
function findPossiibleCreateWall() {
    findMinBullet();
    for(let i = 0; i < 4; ++i) {
        if(minBullet == creation_walls[i]) {
            possilbe_walls.push(i);
        }
    }
}

// 총알 생성
function createBullet() {
    let needed_bullets = total_Bullets - current_Bullets;
    let bulletID = "bullet" + bulletNumber++;

    // 동쪽 생성
    for(let i = 0; i < creation_walls[0]; ++i){
        $("#map").append(`<span class="bullet East" id=${bulletID} style="left: -5px;"></span>`)
        ++current_Bullets;
    }

    // 서쪽 생성
    for(let i = 0; i < creation_walls[1]; ++i){
        $("#map").append(`<span class="bullet West" id=${bulletID} style="left: -5px;"></span>`)
        ++current_Bullets;
    }

    // 남쪽 생성
    for(let i = 0; i < creation_walls[2]; ++i){
        $("#map").append(`<span class="bullet South" id=${bulletID} style="left: -5px;"></span>`)
        ++current_Bullets;
    }

    // 북쪽 생성
    for(let i = 0; i < creation_walls[3]; ++i){
        $("#map").append(`<span class="bullet North" id=${bulletID} style="left: -5px;"></span>`);
        ++current_Bullets;
    }
}

// 게임 준비
function gameReady(){
    $("#map").append(`<span id="startSign" class="sign">PUSH ENTER START!</span>`);
}

// 게임 시작
function gameStart() {

}

// 게임 오버
function gameOver() {

}

// 플레이어 생성
function drawPlayer() {
    $("#map").append(`<span id="player" style="bottom : ${playerY}px; left: ${playerX}px;"></span>`);
}

function erasePlayer() {
    $("#player").remove();
}

// 플레이어 움직임
window.addEventListener("keypress", e => {
    const key = document.getElementById(e.key);
    if (e.key === "w") {
        //console.log($("#player").valueOf());
        //$("#player").attributes;

        playerY += playerSpeed;
        $("#player").remove();
        $("#map").append(`<span id="player" style="bottom : ${playerY}px; left: ${playerX}px;"></span>`);
    }

    if (e.key === "a") {
        playerX -= playerSpeed;
        $("#player").remove();
        $("#map").append(`<span id="player" style="bottom : ${playerY}px; left: ${playerX}px;"></span>`);
    }

    if (e.key === "s") {
        console.log(e.key);
    }

    if (e.key === "d") {
        console.log(e.key);
    }

    if (e.key === "w" && e.key === "a") {
        playerY += playerSpeed;
        playerX -= playerSpeed;
        $("#player").remove();
        $("#map").append(`<span id="player" style="bottom : ${playerY}px; left: ${playerX}px;"></span>`);
    }
});
