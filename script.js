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
    return {

    };
};

const DisplayController = (() => {
    const _display = document.getElementById('display');

    const render = (str) => {
        _display.innerHTML = str;
    };

    return {
        render
    };
})();

const Game = (()=>{
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
        const player1 = Player(player1Name, 'X');
        const player2 = Player(player2Name, 'O');

        const board = Board();
        _createGameArea(player1Name, player2Name);
    };

    const _createGameArea = () => {
        const text = `
          
        `;
        DisplayController.render(text);
    };

    _createMainMenu();
})();