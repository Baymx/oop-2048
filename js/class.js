//定义一个格子类
class Grid{
	constructor(){
		this.gridCell=null;
		this.init();
	}
	init(){
		for(var i =0; i<board.length;i++){
			for(var j =0; j<board[i].length;j++){
				board[i][j]=0;
				this.gridCell = $("#grid-cell-" + i + "-" + j);
	 			//通过getPosTop()方法设置每个格子距顶端的距离
	    		this.gridCell.css("top", getPosTop(i, j));
	    		//通过getPosLeft()方法设置每个格子距左端的距离
	        	this.gridCell.css("left", getPosLeft(i, j));
			}
		}
	}
}
//定义一个数字类
class Number{
	constructor(){
		this.randx="";
		this.randy="";
		this.randNumber="";
		this.numberCell=null;
		this.timer=null;
		this.init();
	}
	init(){
		$(".number-cell").remove();
		for(var i =0; i<board.length;i++){
			for(var j =0; j<board[i].length;j++){
				//向棋盘格上增加数字格
				$("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
                this.numberCell = $("#number-cell-" + i + "-" + j);
                if (board[i][j] == 0) {
	                this.numberCell.css("width", "0px");
	                this.numberCell.css("height", "0px");
	                this.numberCell.css("top", getPosTop(i, j) + 50);
	                this.numberCell.css("left", getPosLeft(i, j) + 50);
	            } 
            	//如果棋盘格的值不为0的话,设置数字格为高宽为75并设置背景色和前景色及数字值
		       else {
		            this.numberCell.css("width", "100px");
		            this.numberCell.css("height", "100px");
		            this.numberCell.css("top", getPosTop(i, j));
		            this.numberCell.css("left", getPosLeft(i, j));
		            this.numberCell.css("background-color", this.getNumberBackgroundColor(board[i][j]));
		            this.numberCell.css("color", this.getNumberColor(board[i][j]));
		            this.numberCell.text(board[i][j]);
		        }
		       hasConflicted[i][j]=false;
			}
		}
	}
	generateOneNumber(){
			 if (nospace(board)) {
			        return false;
			  }
			 //随机一个x\y坐标的位置
			this.randx=this.rand(0,3);
			this.randy=this.rand(0,3);
			 //定义一个死循环,完成生成随机空格子
//			 this.timer=setInterval(function(){
			while(true){
				
			 	console.log(this.randx);
			 	console.log(this.randy);
			 	if (board[this.randx][this.randy] == 0) {
			 		break;
//		           clearInterval(this.timer);
		        }
		    	//否则重新随机一个位置
		        this.randx=this.rand(0,3);
				this.randy=this.rand(0,3);
				
			}
//			 }.bind(this),100)
			 
		    this.randNumber = Math.random() < 0.5 ? 2 : 4;
		     //在随机位置显示随机数字
	   		 board[this.randx][this.randy] = this.randNumber;
	   		 //显示数字的动画效果
	   		 this.ShowNumberWithAnimation(this.randx, this.randy, this.randNumber);
	   		 
	   		 return true;
	}

	ShowNumberWithAnimation(i, j, randNumber){
		//获取当前的数字格
		this.numberCell = $("#number-cell-" + i + "-" + j);
		//设置当前的数字格的背景色和前景色及数字值
		this.numberCell.css("background-color", this.getNumberBackgroundColor(randNumber));
	    this.numberCell.css("color", this.getNumberColor(randNumber));
	    this.numberCell.text(randNumber);
	    //设置当前的数字格的显示动画
	    this.numberCell.animate({
	        width: "100px",
	        height: "100px",
	        top: getPosTop(i, j),
	        left: getPosLeft(i, j)
	    }, 50);
	}
	rand(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	getNumberBackgroundColor(number){
		//getNumberBackgroundColor()方法来设置数字的背景色
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
	getNumberColor(number){
		if (number <= 4) {
        	return "#776e65"
	    }
	    	return "white";
	}
}

//定义一个左边移动的类

class Left{
	constructor(){
		this.num=null;
		this.score=null;
	}
	moveLeft(){
		//判断是否可以向左移动
		if (!this.canMoveLeft(board)) {
        	return false;
    	}
		for(var i=0 ; i<4; i++){
			for(var j=1; j<4; j++){
				if(board[i][j]!=0){
					for(var k=0;k<j;k++){
						//判断移动的目标位置是否为0  并且中间是否没有空白
						if(board[i][k]==0 && this.noBlokHorizontalCol(i, k, j, board)){
							//移动方块格子
							showMoveAnimation(i, j, i, k);
							//把开始方块的值给目标方块位置,把开始位置设置为0
	                    	board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						//判断两格子是否相等,并且中间是否没有空白
						else if(board[i][k]==board[i][j]&& this.noBlokHorizontalCol(i, k, j, board) && !hasConflicted[i][k]){
							//移动方块格子
							showMoveAnimation(i, j, i, k);
							//相同的格子合并
							board[i][k] += board[i][j];1
							board[i][j] = 0;
							//成绩改变????/
							console.log(this.score)
							var score=this.score.getScore();
							score += board[i][k];
						    this.score.updateScore(score);
						    hasConflicted[i][k]=true;
							continue;
						}
					}
				}
				
			}
			
		}
		setTimeout(function(){
			this.num.init();
		}.bind(this),200);
		return true;
	}
	//判断移动的目标位置中间是否没有空白
	noBlokHorizontalCol(row, col1, col2, board){
		for(var i =col1+1; i<col2;i++){
			if(board[row][i]){
				return false;
			}
		}
		return true;
	}
	//判断是否可以移动
	canMoveLeft(board){
		for(var i=0;i<4;i++){
			for(var j=1; j<4; j++){
				if(board[i][j]!=0){
					if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
						return true;
					}
				}
			}
		}
		return false;
	}
}
//定义一个右边的类
class Right{
	constructor(){
		this.num=null;
		this.score=null;
	}
	moveRight(){
		//判断是否可以向左移动
		if (!this.canMoveRight(board)) {
        	return false;
    	}
		for(var i=0 ; i<4; i++){
			for(var j = 2; j >= 0; j--) {
				if(board[i][j]!=0){
					for (var k = 3; k > j; k--) {
						//判断移动的目标位置是否为0  并且中间是否没有空白
						if(board[i][k]==0&& this.noBlokHorizontalCol(i, j, k, board)){
							//移动方块格子
							showMoveAnimation(i, j, i, k);
							//把开始方块的值给目标方块位置,把开始位置设置为0
	                    	board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						//判断两格子是否相等,并且中间是否没有空白
						else if(board[i][k]==board[i][j]&& this.noBlokHorizontalCol(i, j, k, board) && !hasConflicted[i][k]){
							//移动方块格子
							showMoveAnimation(i, j, i, k);
							//相同的格子合并
							board[i][k] += board[i][j];
							board[i][j] = 0;
							//成绩改变????/
							console.log(this.score)
							var score=this.score.getScore();
							score += board[i][k];
							this.score.updateScore(score);
							hasConflicted[i][k]=true;
							continue;
						}
					}
				}
				
			}
			
		}
		setTimeout(function(){
			this.num.init();
		}.bind(this),200);
		return true;
	}
	//判断移动的目标位置中间是否没有空白
	noBlokHorizontalCol(row, col1, col2, board){
		for(var i =col1+1; i<col2;i++){
			if(board[row][i]){
				return false;
			}
		}
		return true;
	}
	//判断是否可以移动
	canMoveRight(board){
		for(var i =0 ;i<4;i++){
			 for(var j = 2; j >= 0; j--) {
				if(board[i][j]!=0){
					//判断右边的一个格子为空,或者右边的格子数字和左边相等-----就可以移动
					if(board[i][j+1]==0||board[i][j]==board[i][j+1]){
						return true;
					}
				}
			}
		}
		return false;
	}
}

//定义一个上移动类
class Up{
	constructor(){
		this.num=null;
		this.score=null;
	}
	moveUp(){
		//判断是否可以向左移动
		if (!this.canMoveUp(board)) {
        	return false;
    	}
		for(var i=1;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]!=0){
					for(var k=0; k<i; k++){
						if(board[k][j]==0 && this.noBlokHorizontalRow(k, i, j, board)){
							//移动方块格子
							showMoveAnimation(i, j, k, j);
							//把开始方块的值给目标方块位置,把开始位置设置为0
	                    	board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if(board[i][j]==board[k][j] && this.noBlokHorizontalRow(k, i, j, board) && !hasConflicted[k][j]){
							//移动方块格子
							showMoveAnimation(i, j, k, j);
							//相同的格子合并
							board[k][j] += board[i][j];
							board[i][j] = 0;
							//成绩改变????/
							console.log(this.score)
							var score=this.score.getScore();
							score += board[k][j];
						    this.score.updateScore(score);
						    hasConflicted[k][j]=true;
							continue;
						}
					}
				}
			}
		}
		setTimeout(function(){
			this.num.init();
		}.bind(this),200);
		return true;
	}
	//判断移动的条件
	canMoveUp(board){
		for(var i=1;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]!=0){
					if(board[i-1][j]==0||board[i][j]==board[i-1][j]){
						return true;
					}
				}
			}
		}
		return false;
	}
	noBlokHorizontalRow(row1, row2, col, board) {
	    for (var i = row1 + 1; i < row2; i++) {
	        if (board[i][col] != 0) {
	            return false;
	        }
	    }
	    return true;
	}
}

//定一个向下移动的类
class  Down{
	constructor(){
		this.num=null;
		this.score=null;
	}
	//初始化移动,并且移动
	moveDown(){
		//判断是否可以向左移动
		if (!this.canMoveDown(board)) {
        	return false;
    	}
		for(var i=2;i>=0;i--){
			for(var j=0;j<4;j++){
				if(board[i][j]!=0){
					for(var k=3; k>i; k--){
						if(board[k][j]==0 && this.noBlokHorizontalRow(i, k, j, board)){
							//移动方块格子
							showMoveAnimation(i, j, k, j);
							//把开始方块的值给目标方块位置,把开始位置设置为0
	                    	board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if(board[i][j]==board[k][j] && this.noBlokHorizontalRow(i, k, j, board) && !hasConflicted[k][j] ){
							//移动方块格子
							showMoveAnimation(i, j, k, j);
							//相同的格子合并
							board[k][j] += board[i][j];
							board[i][j] = 0;
							//成绩改变????/
							console.log(this.score)
							var score=this.score.getScore();
							score += board[i][j];
							this.score.updateScore(score);
							hasConflicted[k][j]=true;
							continue;
						}
					}
				}
			}
		}
		setTimeout(function(){
			this.num.init();
		}.bind(this),200);
		return true;
	}
	noBlokHorizontalRow(row1, row2, col, board) {
	    for (var i = row1 + 1; i < row2; i++) {
	        if (board[i][col] != 0) {
	            return false;
	        }
	    }
	    return true;
	}
	canMoveDown(board){
		for(var i=2;i>=0;i--){
			for(var j=0;j<4;j++){
				if(board[i][j]!=0){
					if(board[i+1][j]==0 || board[i+1][j]==board[i][j]){
						return true;
					}
				}
			}
		}
		return false;
	}
}

//定义一个分数类

class Score{
	constructor(){
		this.left=null;
		this.right=null;
		this.up=null;
		this.down=null;
		this.score=0;
	}
	getScore(){
		return parseInt($("#score").html());
	}
	updateScore(score){
		$("#score").text(score);
	}
	init(){
		$("#score").text(0);
	}
	isgameover(){
		if(this.noSpace()&&this.noMove()){
			setTimeout(function(){
				this.gameOver();
			}.bind(this),500)
		}
	}
	noSpace(){
		for(var i =0; i<3 ;i++){
			for(var j=0 ; j<3 ;j++){
				if(board[i][j]==0){
					 return false;
				}
			}
		}
		return true;
	}
	noMove(){
		if(this.right.canMoveRight(board) ||this.left.canMoveLeft(board)  
				|| this.up.canMoveUp(board) || this.down.canMoveDown(board)){
					return false;
			
		}
		return true;		
	}
	gameOver(){
		this.score=this.getScore();
	    $("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p><span>" + this.score + "</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
	    var gameover = $("#gameover");
	    gameover.css("width", "500px");
	    gameover.css("height", "500px");
	    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
	}
}
