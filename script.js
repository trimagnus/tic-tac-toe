const Player = (name, mark) => {
    const _mark = mark;
    const _name = name;
    const getName = () => {
        return _name;
    };
    const getMark = () => {
        return _mark;
    };
    return {
        getName,
        getMark
    }
};

const Board = ()=>{
    let _gameboard = ['','','','','','','','',''];
    let _nodes = [];

    const getBoard = () => {
        return _gameboard;
    };

    const setNodes = () => {
        for(let i = 0; i < 9; i++) {
            let node = document.getElementById(`s${i}`);
            _nodes.push(node);
        }
    };

    const setMark = (pos, mark) => {
        _nodes[pos].innerText = mark;
        _gameboard[pos] = mark;
    };

    const checkWin = () => {
        const matchPos = [ [0,1,2], [3,4,5], [6,7,8], 
                            [0,3,6], [1,4,7], [2,5,8], 
                            [0,4,8], [2,4,6] ];
        for (const pos of matchPos) {
            if(_checkMatch(pos)) {
                return pos;
            }
        }
        return false;
    };

    _checkMatch = (arr) => {
        if(!_gameboard[arr[0]]) return false;

        if(_gameboard[arr[0]] === _gameboard[arr[1]] && _gameboard[arr[1]] === _gameboard[arr[2]]) return true;
    };

    return {
        getBoard,
        setNodes,
        setMark,
        checkWin
    };
};

const DisplayController = (() => {
    const _display = document.getElementById('display');

    const render = (str) => {
        _display.innerHTML = str;
    };

    const renderById = (str, id) => {
        document.getElementById(id).innerHTML = str;
    };

    const renderInstructions = (text) => {
        document.querySelector('.instructions').innerText = text;
    };

    return {
        render,
        renderById,
        renderInstructions
    };
})();

const Game = (()=>{
    let _board;
    let _currentPlayer;
    let _player1;
    let _player2;

    let _playing = false;

    const _createMainMenu = () => {
        const text = `
        <div class="player-selection">
          <div class="one-player-selection-area">
            <div class="player-button one-player-button">
              1 Player (VS AI)
            </div>
          </div>
          <div class="two-player-selection-area">
            <div class="player-button two-player-button">
              2 Player (VS Human)
            </div>
            <div class="get-names-area">
              <input id="p1-name-input" type="text" placeholder="Player 1">
              <input id="p2-name-input" type="text" placeholder="Player 2">
              <button id="start-two-player">Start</button>
            </div>
          </div>
        </div>
        `;
        DisplayController.render(text);
        const area = document.querySelector('.get-names-area');
        area.style.display = 'none';

        // document.querySelector('.one-player-button').addEventListener('click', );
        document.querySelector('.two-player-button').addEventListener('click', ()=>{
            if(area.style.display === 'none') {
                area.style.display = 'flex';
                window.setTimeout(()=>{
                    area.style.opacity = 1;
                }, 10);
            } else {
                area.style.opacity = 0;
                window.setTimeout(()=>{
                    area.style.display = 'none';
                },1000);
            }
        });

        document.getElementById('start-two-player').addEventListener('click', () => {
            const p1Name = _getPlayerNameFromInput('p1-name-input');
            const p2Name = _getPlayerNameFromInput('p2-name-input');
            _startTwoPlayerGame(p1Name, p2Name);
        });
    };

    const _getPlayerNameFromInput = (inputID) => {
        const inp = document.getElementById(inputID);
        if (inp.value) return inp.value;
        return inp.placeholder;
    };

    const _startOnePlayerGame = () => {

    };

    const _startTwoPlayerGame = (player1Name, player2Name) => {
        _playing = true;

        _player1 = Player(player1Name, 'X');
        _player2 = Player(player2Name, 'O');

        _board = Board();
        _createGameArea(player1Name, player2Name);
        _renderBoard();

        _currentPlayer = [_player1,_player2][Math.floor(Math.random() * 2)];
        _setCurrentPlayer();
        _board.setNodes();

        document.getElementById('board').addEventListener('click', _handleBoardClick)
    };

    const _createGameArea = (p1Name, p2Name) => {
        const text = `
          <div class="game-area">
            <div class="instructions">Instructions</div>
            <div id="board"></div>
            <div class="turn-indicator-area">
              <div class="turn-indicator p1-turn-indicator">${p1Name}</div>
              <div class="turn-indicator p2-turn-indicator">${p2Name}</div>
            </div>
          </div>
          <div class="restart-button-wrapper">
            <button id="restart-button">Restart</button>
          </div>
        `;
        DisplayController.render(text);
        document.getElementById('restart-button').addEventListener('click', ()=>{
            _createMainMenu();
        });
    };

    const _renderBoard = () => {
        const text = `
          <div class="board-row">
            <div class="board-square" id="s0"></div>
            <div class="board-square" id="s1"></div>
            <div class="board-square" id="s2"></div>
          </div>
          <div class="board-row">
            <div class="board-square" id="s3"></div>
            <div class="board-square" id="s4"></div>
            <div class="board-square" id="s5"></div>
          </div>
          <div class="board-row">
            <div class="board-square" id="s6"></div>
            <div class="board-square" id="s7"></div>
            <div class="board-square" id="s8"></div>
          </div>
        `;
        DisplayController.renderById(text, 'board');
    };

    const _setCurrentPlayer = () => {
        DisplayController.renderInstructions(`${_currentPlayer.getName()}, it's your turn!`);
        const p1Indicator = document.querySelector('.p1-turn-indicator');
        const p2Indicator = document.querySelector('.p2-turn-indicator');

        if(_currentPlayer.getMark() === 'X') {
            p1Indicator.classList.add('current-turn-indicator');
            p2Indicator.classList.remove('current-turn-indicator');
        } else {
            p1Indicator.classList.remove('current-turn-indicator');
            p2Indicator.classList.add('current-turn-indicator');
        }
    };

    const _handleBoardClick = (e) => {
        if(!_playing) return;
        if(!e.target.classList.contains('board-square')) return;
        if(e.target.innerText) return;

        const pos = e.target.id[1];
        const mark = _currentPlayer.getMark();

        _board.setMark(pos, mark);
        const win = _board.checkWin();

        if(win) {
            _playing = false;
            for(const pos of win) {
                document.getElementById(`s${pos}`).classList.add('winning-square');
            }
            DisplayController.renderInstructions(`${_currentPlayer.getName()} wins!`);
        } else {
            if(_currentPlayer === _player1) {
            _currentPlayer = _player2;
            } else {
            _currentPlayer = _player1;
            }
            _setCurrentPlayer();
        }

     
    };

    _createMainMenu();
})();