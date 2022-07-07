const ready = 1;
const start = 2;
const gameOver = 3;

let gameCondition = ready; // 현재 게임 상태 시작 준비중

let total_Bullet = 50; // 생성 가능한 총알의 개수
let total_guided = 0;  // 생성 가능한 유도탄의 개수
let current_Bullet = total_Bullet; // 현재 생성되어 있는 총알의 개수
let current_guided = total_guided; // 현재 생성되어 있는 유도탄의 개수
let times = 0.00; // 게임 시작 후 흐른 시간

let minBullet = Number.MAX_VALUE; // 동서남북 중에서 가장 적은 수의 총알 가진 벽의 총알의 개수
let possilbe_wall = []; // 동:0, 서:1, 남:2, 북:3

// total_Bullet을 동서남북에 4분할 -> 동서남북이 12로 초기화됨
// 동:0, 서:1, 남:2, 북:3
let creation_wall = [12, 12, 12, 12]; // 동 서 남 북의 총알의 개수

let bulletID = 0;

// 50개를 4분할하고 남은 2개의 총알을 배분할 벽 두 곳 선택
findMinBullet();
let choiced_wall = Math.floor((Math.random() * 10) % 4);
creation_wall[choiced_wall] += 1;

findPossiibleCreateWall();

choiced_wall = Math.floor((Math.random() * 10) % possilbe_wall.length);
creation_wall[possilbe_wall[choiced_wall]] += 1;
possilbe_wall = [];

// 함수
// 동서남북 중에서 가장 적은 수의 총알 가진 벽의 총알의 개수를 저장
function findMinBullet() {
    for(let i = 0; i < 4; ++i){
        if(minBullet >= creation_wall[i]) {
            minBullet = creation_wall[i];
        }
    }
}

// 총알 생성 가능한 벽 목록 저장 : minBullet과 같은 값의 벽 저장
function findPossiibleCreateWall() {
    findMinBullet();
    for(let i = 0; i < 4; ++i) {
        if(minBullet == creation_wall[i]) {
            possilbe_wall.push(i);
        }
    }
}

// 총알 생성
function createBullet() {

}