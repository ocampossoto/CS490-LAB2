angular.module('GameAPP',[]).controller('GameCtrl', function($scope){
    $scope.player = 1;

    $scope.items = [
        {one:{row:1,col:1,img:"back.png"},two:{row:1,col:2,img:"back.png"},three:{row:1,col:3,img:"back.png"}},
        {one:{row:2,col:1,img:"back.png"},two:{row:2,col:2,img:"back.png"},three:{row:2,col:3,img:"back.png"}},
        {one:{row:3,col:1,img:"back.png"},two:{row:3,col:2,img:"back.png"},three:{row:3,col:3,img:"back.png"}}];

    $scope.editing = false;
    $scope.addItem = function(item){
        $scope.items.push(item);
        $scope.item = {};
    };
    document.getElementById("one").style.backgroundColor = "green";
    document.getElementById("two").style.backgroundColor = "white";
   //$scope.items[0].one.img = "X.png";
    var grid = make_grid();
    $scope.do = function(row, col){
        if($scope.player == 1){
            if(grid[row][col].flip($scope.player)){
                if(col == 1){
                    $scope.items[row-1].one.img= "X.png";
                }
                else if(col == 2){
                    $scope.items[row-1].two.img= "X.png";
                }
                else if(col == 3){
                    $scope.items[row-1].three.img= "X.png";
                }
                document.getElementById("two").style.backgroundColor = "green";
                document.getElementById("one").style.backgroundColor = "white";
                $scope.player = 2;
            }

        }
        else{
            if(grid[row][col].flip($scope.player)){
                if(col == 1){
                    $scope.items[row-1].one.img= "circle.png";
                }
                else if(col == 2){
                    $scope.items[row-1].two.img= "circle.png";
                }
                else if(col == 3){
                    $scope.items[row-1].three.img= "circle.png";
                }
                document.getElementById("one").style.backgroundColor = "green";
                document.getElementById("two").style.backgroundColor = "white";
                $scope.player = 1;
            }
        }
        if(check_win(grid, row, col)){
            var message = document.createElement('h2');


            if($scope.player == 2){
                message.appendChild(document.createTextNode("Player 2 Wins!"));
            }
            else{
                message.appendChild(document.createTextNode("Player 1 Wins!"));
            }
            var btn = document.createElement('button');
            btn.innerHTML = 'New Game!';
            btn.onclick = function(){
                location.reload();
            };
            document.body.appendChild(message);
            document.body.appendChild(btn);
        }
        if(check_end(grid)){
            document.getElementById("one").style.backgroundColor = "green";
            document.getElementById("two").style.backgroundColor = "white";
            var message = document.createElement('h2');
            message.appendChild(document.createTextNode("Draw"));
            var btn = document.createElement('button');
            btn.innerHTML = 'New Game!';
            btn.onclick = function(){
                location.reload();
            };
            document.body.appendChild(message);
            document.body.appendChild(btn);
        }
        //console.log(end);

    }
});

function check_win(grid, r, c){

    var count = 1;
    //down
    if(r < 3){
        for(var i = r+1; i < 4;i++){
            //console.log(i,grid[i][c].flipped);
            if(grid[i][c].flipped){
                //console.log("in");
                if(grid[r][c].value == grid[i][c].value){
                    count++;
                }
                else{
                    count=1;
                    break;
                }
            }
            else{
                count =1;
                break;
            }
        }
        if(count == 3){
            return true;
        }
    }
    count = 1;
    //up
    if(r > 1){
        for(var i = r-1; i > 0;i--){
            //console.log(i,grid[i][c].flipped);
            if(grid[i][c].flipped){
                //console.log("in");
                if(grid[r][c].value == grid[i][c].value){
                    count++;
                }
                else{
                    count=1;
                    break;
                }
            }
            else{
                count =1;
                break;
            }
        }
        if(count == 3){
            return true;
        }
    }
    if(c < 3){
        for(var i = c+1; i < 4;i++){
            //console.log(i,grid[i][c].flipped);
            if(grid[r][i].flipped){
                //console.log("in");
                if(grid[r][c].value == grid[r][i].value){
                    count++;
                }
                else{
                    count=1;
                    break;
                }
            }
            else{
                count =1;
                break;
            }
        }
        if(count == 3){
            return true;
        }
    }

    count = 1;
    //up
    if(c > 1){
        for(var i = c-1; i > 0;i--){
            //console.log(i,grid[i][c].flipped);
            if(grid[r][i].flipped){
                //console.log("in");
                if(grid[r][c].value == grid[r][i].value){
                    count++;
                }
                else{
                    count=1;
                    break;
                }
            }
            else{
                count =1;
                break;
            }
        }
        if(count == 3){
            return true;
        }
    }
    count =1
    //diagonal up left
    if(r <3 && c <3 ){
        for(var i = c+1; i < 4;i++){
            //console.log(i,grid[i][i].flipped);
            if(grid[i][i].flipped){
                //console.log("in");
                if(grid[r][c].value == grid[i][i].value){
                    count++;
                }
                else{
                    count=1;
                    break;
                }
            }
            else{
                count =1;
                break;
            }
        }
        if(count == 3){
            return true;
        }
    }
    count =1;
    //diagonal down right
    if(r >0 && c >0 ){
        for(var i = c-1; i > 0;i--){
            //console.log(i,grid[i][i].flipped);
            if(grid[i][i].flipped){
                //console.log("in");
                if(grid[r][c].value == grid[i][i].value){
                    count++;
                }
                else{
                    count=1;
                    break;
                }
            }
            else{
                count =1;
                break;
            }
        }
        if(count == 3){
            return true;
        }
    }
    count =1;
    //right down left
    if(c == 3 && r ==1){
        var x = 1;
        //console.log(r, c);
        for(var i = c-1; i > 0;i--){
            //console.log(i,grid[r+x][i].flipped);
            if(grid[r+x][i].flipped){
                //console.log("in");
                if(grid[r][c].value == grid[r+x][i].value){
                    count++;
                    x++;
                }
                else{
                    count=1;
                    break;
                }
            }
            else{
                count =1;
                break;
            }
        }
        if(count == 3){
            return true;
        }
    }
    count =1;
    //left up right
    if(r ==3 && c == 1){
        var x = 1;
        //console.log(r, c, grid);
        for(var i = r-1; i >0;i--){
            //console.log(i,c+x,grid[i][c+x]);
            if(grid[i][c+x].flipped){
                //console.log("in");
                if(grid[r][c].value == grid[i][c+x].value){
                    count++;
                    x++;
                }
                else{
                    count=1;
                    break;
                }
            }
            else{
                count =1;
                break;
            }
        }
        if(count == 3){
            return true;
        }
    }
    return false;

}


function check_end(grid){
    for (var row = 1; row < 4; row++) {
        for (var col = 1; col < 4; col++) {
            if(!grid[row][col].flipped){
                return false;
            }
        }
    }
    return true;
}


function make_grid(){
    var grid=[];
    for (var row = 1; row < 4; row++) {
        grid[row] = [];
        for (var col = 1; col < 4; col++) {
            grid[row][col] = new Tile(row, col);
        }
    }
    return grid;
}

function Tile(r,c) {
    this.row = r;
    this.col = c;
    this.value= "";
    this.flipped = false;
}

Tile.prototype.flip = function (player) {
    if(this.flipped){
        return false;
    }
    this.flipped=true;
    if(player==1){
        this.value = "X";
    }
    else{
        this.value = "O";
    }
    return true;
}

