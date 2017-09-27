//创建一个二维数组存放16个格子数字,先定义为空
var board = new Array();
var hasConflicted = new Array();
for(var i = 0;i<4;i++){
 	board[i]= new Array();
 	hasConflicted[i] = new Array();
 	for(var j = 0;j<4;j++){
 		board[i][j]="";
 		hasConflicted[i][j]=false;
 	}
}

//得到每个格子的位子
function getPosTop(i, j) {
    return 20 + i * 95;
}
//得到每个格子的位子
function getPosLeft(i, j) {
return 20 + j * 95;
}
//getNumberBackgroundColor()方法来设置数字的背景色
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
}
//使用getNumberColor()方法来设置数字的前景色
function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65"
    }
    return "white";
}

//移动动画
function showMoveAnimation(fromx, fromy, tox, toy) {
    var numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}

function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}