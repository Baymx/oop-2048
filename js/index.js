window.onload=function(){
	newGame();
}

function newGame(){
	//创建类的实例
	var g =new Grid();
	var n =new Number();
	var left = new Left();
	var right= new Right();
	var up= new Up();
	var down= new Down();
	var s= new Score();
	//初始化分数
	s.init();
	//初始化调用两个随机的数字
	n.generateOneNumber();
	n.generateOneNumber();
	s.left=left;
	s.right=right;
	s.up=up;
	s.down=down;
	//按键前后左右的时间判断
	$(document).keydown(function(e){
		var e = e || event;
		switch(e.keyCode){
			case 37:
				left.num=n;
				left.score=s;
				if(left.moveLeft()){
					setTimeout(function(){
						n.generateOneNumber();
						//游戏结束的判断
	            		s.isgameover();
					},600)
				}
	            break;
	        case 38://up
	        	up.num=n;
	        	up.score=s;
				if(up.moveUp()){
					setTimeout(function(){
						n.generateOneNumber();
						//游戏结束的判断
	            		s.isgameover();
					},600)
					
				}
	            break;
	        case 39://right
	        	right.num=n;
	        	right.score=s;
	        	if(right.moveRight()){
	        		setTimeout(function(){
						n.generateOneNumber();
						//游戏结束的判断
	            		s.isgameover();
	        		},600)
				}
	            break;
	        case 40://down
	        	down.num=n;
	        	down.score=s;
	        	if(down.moveDown()){
	        		setTimeout(function(){
						n.generateOneNumber();
						//游戏结束的判断
	            		s.isgameover();
	        		},600)
				}
	            break;
	        default :
	            break;
		}
	});
}

function restartgame(){
	$("#gameover").remove();
    newGame();

}
