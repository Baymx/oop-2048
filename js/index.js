window.onload=function(){
	$("#gameover").remove();
	newGame();
}
$("#gameover").remove();
function newGame(){
	$("#gameover").remove();
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
					},300);
					setTimeout(function(){
						//游戏结束的判断
	            		s.isgameover();
					},400);
				}
	            break;
	        case 38://up
	        	up.num=n;
	        	up.score=s;
				if(up.moveUp()){
					setTimeout(function(){
						n.generateOneNumber();
						//游戏结束的判断
					},300)
					setTimeout(function(){
						//游戏结束的判断
	            		s.isgameover();
					},400);
				}
	            break;
	        case 39://right
	        	right.num=n;
	        	right.score=s;
	        	if(right.moveRight()){
	        		setTimeout(function(){
						n.generateOneNumber();
						//游戏结束的判断
	        		},300)
	        		setTimeout(function(){
						//游戏结束的判断
	            		s.isgameover();
					},400);
				}
	            break;
	        case 40://down
	        	down.num=n;
	        	down.score=s;
	        	if(down.moveDown()){
	        		setTimeout(function(){
						n.generateOneNumber();
						//游戏结束的判断
	        		},300)
	        		setTimeout(function(){
						//游戏结束的判断
	            		s.isgameover();
					},400);
				}
	            break;
	        default :
	            break;
		}
	});
	
	var odiv=document.querySelector("#grid-container");
	
	odiv.addEventListener("touchstart",function(e){
		
			touch.on("#grid-container","swipeleft",function(e){
				left.num=n;
				left.score=s;
				if(left.moveLeft()){
					setTimeout(function(){
					n.generateOneNumber();
				},300);
				setTimeout(function(){
					//游戏结束的判断
			        s.isgameover();
					},300);
				}
				e.preventDefault();
			});
			touch.on("#grid-container","swiperight",function(e){
				right.num=n;
			    right.score=s;
			    if(right.moveRight()){
			       setTimeout(function(){
						n.generateOneNumber();
						//游戏结束的判断
			        },300)
			        setTimeout(function(){
						//游戏结束的判断
			            s.isgameover();
					},300);
				}
				e.preventDefault();
			});
			touch.on("#grid-container","swipeup",function(e){
				up.num=n;
			    up.score=s;
				if(up.moveUp()){
					setTimeout(function(){
						n.generateOneNumber();
						//游戏结束的判断
						},300)
					setTimeout(function(){
						//游戏结束的判断
			            s.isgameover();
					},300);
				}
				e.preventDefault();
			});
			touch.on("#grid-container","swipedown",function(e){
				down.num=n;
			    down.score=s;
			    if(down.moveDown()){
			        setTimeout(function(){
						n.generateOneNumber();
						//游戏结束的判断
			        },300)
			        setTimeout(function(){
						//游戏结束的判断
			            s.isgameover();
					},300);
				}
				e.preventDefault();
			});
					
			e.preventDefault();
		},false);
}

function restartgame(){
	$("#gameover").remove();
    newGame();

}

