Welcome to my JavaScript tetris game repository.

Here you can play it (press "Enter" to start the game):
https://dariuszlegizynski.github.io/Tetris_WebApp/

Temporary controlls:
- Enter: start the game
- left arrow: move left
- right arrow: move right
- y key: rotate
- down arrow: move one row down

Known bugs:
- clear line -> blocks are visually still present -> affects the game.
- kick rotate not implemented -> when block is rotated near the board border it may get stuck in the wall. To play, please step out of the wall -> affects the game.
- blocks get into each other -> sometimes it may happen -> affects the game.
- some blocks dissapear for a moment -> when the new block comes down to other landed blocks, the landed blocks are undrawn for a short period of time (less then 0,5s). This does issue does not affect the game.
