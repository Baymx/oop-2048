
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
	var flag=true;
	var odiv=document.querySelector("#grid-container");
	odiv.addEventListener("touchstart",function(e){
			e.preventDefault();
		},false);
		touch.on("#grid-container","swipeleft",function(e){
				console.log('swipeleft');
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
				console.log('over');
				e.preventDefault();
			});
			touch.on("#grid-container","swiperight",function(e){
				console.log('swiperight');
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
			    console.log('over');
				e.preventDefault();
			});
			touch.on("#grid-container","swipeup",function(e){
				console.log('swipeup');
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
				console.log('over');
				e.preventDefault();
			});
			touch.on("#grid-container","swipedown",function(e){
				console.log('swipedown');
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
	        	console.log('over');
				e.preventDefault();
			});
			touch.on("#restartgamebutton","tap",function(e){
				$("#gameover").remove();
   				 newGame();
   				 console.log("1")
				e.preventDefault();
			});
//		document.addEventListener("touchmove",function(e){
//			e.preventDefault();
//		},false);
		odiv.addEventListener("touchend",function(e){
			
		},false)
//点击事件
$("#newgamebutton").click(function(){
	$("#gameover").remove();
	newGame();
});
$("#grid-container").on("tap","#restartgamebutton",function(){
	$("#gameover").remove();
	newGame();
})

function newGame(){
	$("#gameover").remove();
	//初始化分数
	g.init();
	n.init();
	s.init();
	//初始化调用两个随机的数字
	n.generateOneNumber();
	n.generateOneNumber();
}

function restartgame(){
	$("#gameover").remove();
    newGame();

}

