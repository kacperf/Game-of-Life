function GameOfLife(boardWidth, boardHeight) {
    this.width = boardWidth;
    this.height = boardHeight;
    this.board = document.getElementById('board');
    this.newGeneration = [];
    this.cells = [];

    this.createBoard = function () {
        this.board.style.height = this.height * 10 + 'px';
        this.board.style.width = this.width * 10 + 'px';
        this.nextCell = this.width * this.height;

        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                var gameCell = document.createElement('div');
                this.board.appendChild(gameCell);

                gameCell.dataset.x = j;
                gameCell.dataset.y = i;

                this.cells.push(gameCell);


                gameCell.addEventListener('click', (event) => {
                    console.log(event.target.dataset.x, console.log(event.target.dataset.y))
                    if (event.target.classList.contains('live')) {

                        this.setCellState(event.target.dataset.x, event.target.dataset.y, 'dead');
                    } else {
                        this.setCellState(event.target.dataset.x, event.target.dataset.y, 'live');
                    }
                    console.log(this.cells)

                });
            }
        }

    };

    this.setCellState = function(x, y, state) {
        var x = parseInt(x, 10);
        var y = parseInt(y, 10);
        var index = (y*this.width) + x;
        if (state === 'live') {
            this.cells[index].classList.add('live');
        } else {
            console.log(this.cells, index)
            this.cells[index].classList.remove('live');
        }

    };

    this.checkCellLive = function(x, y) {
        var index = (y*this.width) + x;
        return this.cells[index].classList.contains('live');
    };

    this.computeCellNextState = function(x, y) {

        var neighbours = [];
        var countAlive = 0;

        neighbours.push(this.cells[x + (y - 1) * this.width]);
        neighbours.push(this.cells[(x - 1) + (y - 1) * this.width]);
        neighbours.push(this.cells[(x - 1) + y * this.width]);
        neighbours.push(this.cells[(x - 1) + (y + 1) * this.width]);
        neighbours.push(this.cells[x + (y + 1) * this.width]);
        neighbours.push(this.cells[(x + 1) + (y + 1) * this.width]);
        neighbours.push(this.cells[(x + 1) + y * this.width]);
        neighbours.push(this.cells[(x + 1) + (y - 1) * this.width]);

        for (var i=0; i<neighbours.length; i++){
            if(typeof neighbours[i] !== 'undefined') {
                if(neighbours[i].className === 'live') {
                    countAlive++;
                }
            }
        }

        if(countAlive > 3 || countAlive < 2){
            return 0;
        } else if(countAlive === 2){
            if (this.cells[x + y * this.width].className === 'live') {
                return 1;
            } else {
                return 0;
            }
        } else {
            return 1;
        }
    };


    this.computeNextGeneration = function() {
        this.newGeneration = [];

        this.cells.forEach(el => {
            var x = parseInt(el.dataset.x, 10);
            var y = parseInt(el.dataset.y, 10);

            if (this.computeCellNextState(x, y) === 1) {
                this.newGeneration.push(1);
            } else {
                this.newGeneration.push(0);
            }
        })
    };

    this.printNextGeneration = function() {
        this.cells.forEach(el => {
            var x = parseInt(el.dataset.x, 10);
            var y = parseInt(el.dataset.y, 10);
            console.log(this.newGeneration)
            if (this.newGeneration[x + y * this.width] === 1) {
                this.cells[x + y * this.width].classList.add('live');
            } else {
                this.cells[x + y * this.width].classList.remove('live');
            }

        })
    }
}

document.addEventListener("DOMContentLoaded", function(){

    var game = new GameOfLife(10, 10);
    game.createBoard();

    document.querySelector('#play').addEventListener('click', function() {
        setInterval(function() {
            game.computeNextGeneration();
            game.printNextGeneration();
        }, 300)

    })

});
