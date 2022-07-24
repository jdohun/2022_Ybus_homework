/*
동(598, y)
서 (-5 , y)
남(x, -6)
북(x, 498)
 */

const east_init = 598;
const west_init = -5;
const south_init = -6;
const north_init = 498;

const ready = 1;
const start = 2;
const Over = 3;

let gameCondition = ready; // 현재 게임 상태 시작 준비중

// player 초기화
let playerSpeed = 1;
let playerY = 232;
let playerX = 282;

let total_Bullets = 50; // 화면에 분포되어야하는 전체 총알의 개수
let total_guideds = 10; // 화면에 분포되어야하는 전체 유도탄의 개수
let current_guideds = 0; // 현재 생성되어 있는 유도탄의 개수
let times = 0.00; // 게임 시작 후 흐른 시간

let bulletList = [];    // 생성된 총알을 저장할 배열(list)

// 동서남북 각각의 위치에서 생성된 총알(List)
let eastBullets = [];
let westBullets = [];
let southBullets = [];
let northBullets = [];

let eastBelow300 = [];  // 동쪽에서 bottom이 300 이하 위치에서 생성된 총알들
let eastETC = [];       // 동쪽에서 bottom이 300 이상 위치에서 생성된 총알들
let westBelow300 = [];  // 서쪽에서
let westETC = [];       //
let southBelow250 = []; // 남쪽에서 left가 25 이하 위치에서 생성된 총알들
let southETC = [];      // 남쪽에서
let northBelow250 = []; // 북쪽에서
let northETC = [];      //

// total_Bullet을 동서남북에 4분할 -> 동서남북이 12로 초기화됨
// 동:0, 서:1, 남:2, 북:3
let creation_walls_bullet = [12, 12, 12, 12]; // 동 서 남 북에서 생성 가능한 총알의 개수
let created_walls_bullet = [0, 0, 0, 0]; // 동 서 남 북에서 생성된 총알의 개수

let minBullet = 12; // 동서남북 중에서 가장 적은 수의 총알 가진 벽의 총알의 개수
let possilbe_walls = []; // 동:0, 서:1, 남:2, 북:3

let bulletNumber = 0;
let choiced_walls = null;

// 시작 재시작 문구
let startSign = $(`<span id="startSign" class="sign">PUSH ENTER START!</span>`);
let restartSign = $(`<span id="restartSign" class="sign">
                GAME OVER<br>
                ENTER TO RESTART
        </span>`);

// 총알 개수
let bulletCount = document.querySelector("#bulletCount");

// main ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 시작 전 준비

// 50개를 4분할하고 남은 2개의 총알을 배분할 벽 두 곳 선택
choiced_walls = Math.floor((Math.random() * 10) % 4);
creation_walls_bullet[choiced_walls] += 1;

findPossiibleCreateWall();

choiced_walls = Math.floor((Math.random() * 10) % possilbe_walls.length);
creation_walls_bullet[possilbe_walls[choiced_walls]] += 1;
possilbe_walls = []; // 추가 생성이 가능한 벽

$("#map").append(startSign); // 시작 사인 표시
bulletCount.innerText = total_Bullets; // 총알 개수 표시
drawPlayer(); // 플레이어 생성
createBullet(); // 초기 총알 생성
// setBulletRoute(); // 초기 총알 경로 설정


// 시작

// 함수 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 동서남북 중에서 가장 적은 수의 총알 가진 벽의 총알의 개수를 저장
function findMinBullet() {
    let temp = Number.MAX_VALUE;
    for(let i = 0; i < 4; ++i){
        if(temp >= creation_walls_bullet[i]) {
            temp = creation_walls_bullet[i];
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
        if(minBullet == creation_walls_bullet[i]) {
            possilbe_walls.push(i);
        }
    }
}

// 초기 총알 생성
function createBullet() {
    let bulletID; // = "bullet" + bulletNumber++; // 총알 고유번호
    let map = $("#map");
    let initX, initY;

    // east 동쪽 생성
    for(created_walls_bullet[0]; created_walls_bullet[0] < creation_walls_bullet[0]; ++created_walls_bullet[0]){
        initY = (Math.random() * 1000) % 500;
        bulletID = "bullet" + bulletNumber++;

        let bullet_span = $("<span class='bullet East'>");
        bullet_span.attr('id', bulletID);
        bullet_span.css({bottom: initY, left: east_init});
        let map = $("#map");
        map.append(bullet_span);

        let bullet = new Object();
        bullet.name = bulletNumber;
        bullet.id = bulletID;
        bullet.type = 0; // 0 : normal, 1 : guided
        bullet.zone = 0; // 0 : East, 1 : West, 2 : South, 3 : North
        bullet.initData = initY;
        bullet.speed = (Math.random() * 10) % 4 + 0.1;
        bulletList.push(bullet);
        eastBullets.push(bullet);
    }

    // west 서쪽 생성
    for(created_walls_bullet[1]; created_walls_bullet[1] < creation_walls_bullet[1]; ++created_walls_bullet[1]){
        initY = (Math.random() * 1000) % 500;
        bulletID = "bullet" + bulletNumber++;

        let bullet_span = $("<span class='bullet West'>");
        bullet_span.attr('id', bulletID);
        bullet_span.css({bottom: initY, left: west_init});
        map.append(bullet_span);

        let bullet = new Object();
        bullet.name = bulletNumber;
        bullet.id = bulletID;
        bullet.type = 0; // 0 : normal, 1 : guided
        bullet.zone = 1; // 0 : East, 1 : West, 2 : South, 3 : North
        bullet.initData = initY;
        bullet.speed = (Math.random() * 10) % 4 + 0.1;
        bulletList.push(bullet);
        westBullets.push(bullet);
    }

    // south 남쪽 생성
    for(created_walls_bullet[2]; created_walls_bullet[2] < creation_walls_bullet[2]; ++created_walls_bullet[2]){
        initX = (Math.random() * 1000) % 600;
        bulletID = "bullet" + bulletNumber++;

        let bullet_span = $("<span class='bullet South'>");
        bullet_span.attr('id', bulletID);
        bullet_span.css({bottom: south_init, left: initX});
        map.append(bullet_span);

        let bullet = new Object();
        bullet.name = bulletNumber;
        bullet.id = bulletID;
        bullet.type = 0; // 0 : normal, 1 : guided
        bullet.zone = 2; // 0 : East, 1 : West, 2 : South, 3 : North
        bullet.initData = initX;
        bullet.speed = (Math.random() * 10) % 4 + 0.1;
        bulletList.push(bullet);
        southBullets.push(bullet);
    }

    // north 북쪽 생성
    for(created_walls_bullet[3]; created_walls_bullet[3] < creation_walls_bullet[3]; ++created_walls_bullet[3]){
        initX = (Math.random() * 1000) % 600;
        bulletID = "bullet" + bulletNumber++;

        let bullet_span = $("<span class='bullet South'>");
        bullet_span.attr('id', bulletID);
        bullet_span.css({bottom: north_init, left: initX});
        map.append(bullet_span);

        let bullet = new Object();
        bullet.name = bulletNumber;
        bullet.id = bulletID;
        bullet.type = 0; // 0 : normal, 1 : guided
        bullet.zone = 3; // 0 : East, 1 : West, 2 : South, 3 : North
        bullet.initData = initX;
        bullet.speed = (Math.random() * 10) % 4 + 0.1;
        bulletList.push(bullet);
        northBullets.push(bullet);
    }
}

// 생성된 총알의 위치별 재그룹화
function groupingBullets() {
    let i;

    // east
    for(i = 0; i < eastBullets.length; ++i) {
       if(eastBullets[i].initData < 300) {
           eastBelow300.push(eastBullets[i]);
       }
       else {
           eastETC.push(eastBullets[i]);
       }
    }

    // west
    for(i = 0; i < westBullets.length; ++i) {
        if(westBullets[i].initData < 300) {
            westBelow300.push(westBullets[i]);
        }
        else {
            westETC.push(westBullets[i]);
        }
    }

    // south
    for(i = 0; i < southBullets.length; ++i) {
        if(southBullets[i].initData < 250) {
            southBelow250.push(southBullets[i]);
        }
        else {
            southETC.push(southBullets[i]);
        }
    }

    // north
    for(i = 0; i < northBullets.length; ++i) {
        if(northBullets[i].initData < 250) {
            northBelow250.push(northBullets[i]);
        }
        else {
            northETC.push(northBullets[i]);
        }
    }
}

// 생성된 총알 이동
function setBulletRoute() {
    // 총알의 생성위치 별로
    // 동서는 bottom 300을 기준으로
    // 큰 쪽은 현재 위치에서 bottom +=,
    // 동쪽은 left -=, 서쪽은 left +=

    // 남북은 left 250을 기준으로
    // 작은 쪽은 left +=, 큰쪽은 -=
    // 남쪽은 bottom +=, 북쪽은 -=
}

// 게임 준비
function gameReady() {
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

// http://guny.kr/archives/24 대각선 움직임 참조
// 플레이어 움직임
let keypress = {}, // 어떤 키가 눌려 있는지 저장
    $player = $("#player");
setInterval(function(){ // 주기적으로 검사
    if(keypress['87']) playerY += playerSpeed; // up - w
    if(keypress['83']) playerY -= playerSpeed; // down - s
    if(keypress['65']) playerX -= playerSpeed; // left - a
    if(keypress['68']) playerX += playerSpeed; // right - d

    $player.css({bottom: playerY, left: playerX});

    //console.log(keypress);
}, 10); // 매 0.01 초마다 실행

$(document).keydown(function(e){ // 어떤 키가 눌렸는지 저장
    keypress[e.which.toString()] = true;
});
$(document).keyup(function(e){ // 눌렸던 키를 해제
    keypress[e.which.toString()] = false;
});