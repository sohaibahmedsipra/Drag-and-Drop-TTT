document.addEventListener("DOMContentLoaded", function () {
    const objects = document.querySelectorAll('.object');
    const cells = document.querySelectorAll('[data-cell]');
    const turn = document.getElementById('turn');
    let currentPlayer = 'X';
    let inUse = null;
    let Play = true; 

    objects.forEach(object => {
        object.addEventListener('dragstart', dragStart);
        object.addEventListener('dragover', dragOver);
    });
    cells.forEach(cell => {
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('drop', dragDrop);
        cell.setAttribute('data-cellOccupied', 'false');
    });

    function dragStart() {
        if (Play && this.getAttribute('data-object') === currentPlayer) {
            inUse = this;
        }
    }
    function dragOver(e) {
        e.preventDefault();
    }

    function dragDrop() {
        if (Play) {
            this.classList.remove('hovered');
            if (this.getAttribute('data-cellOccupied') === "false" && inUse.getAttribute('data-object') === currentPlayer) {
                this.appendChild(inUse);
                this.setAttribute('data-cellOccupied', 'true');
                if (checkWin()) {
                    turn.textContent = `Winner is ${currentPlayer}!`;
                    Play = false;
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    turn.textContent = `Current Turn: ${currentPlayer}`;
                }
            }
        }
    }

    function checkWin() {
        const board = Array.from(cells).map(cell => cell.children[0] ? cell.children[0].textContent : null);
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6] 
        ];
    
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[b] && board[c] && board[a] === currentPlayer &&
                board[b] === currentPlayer && board[c] === currentPlayer) {
                return true;
            }
        }
        return false;
    }
    
    const reloadButton = document.getElementById('reloadButton');
    reloadButton.addEventListener('click', () => {
        location.reload();
    });
});