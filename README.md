# TetrisJS

A well known tetris game made with pure JavaScript.

[TetrisJS]

# Built with

* JavaScript

* CSS3

* HTML5

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

What is needed for the software to run.

* npm

`npm i npm@latest -g`

## Installing

1. Clone the repository

`git clone https://github.com/DariuszLegizynski/Tetris_WebApp.git`

2. Run npm install inside project root directory

`npm install`

3. Start the server

`npm run start`

4. Enjoy! :-)

## Brief summary

1. Vanilla JavaScript application.
2. Uses class components.
3. In this game variant tetrominoes are made of colorized arrays. The relevant arrays are then filtered out to give the tetrominoe the right shape.

## Known bugs

1. Clear line: after a clear line blocks are visually still present. A new tetrominoe however will just go trough them.
2. Kick rotation is not implemented: when a block is rotated near the board border it may get stuck in the wall. To play further, step out of the wall.
3. Tetrominoes can get into each other.
4. Some landed tetrominoes disappear for a moment: when a new tetrominoe is landed on other landed tetrominoes, the landed ones are undrawn for a short period of time (less then 0,5s).
5. When the game is over, a new one cannot be started. Till then the "start new game" function works.

## Contributors

Dariusz Legizynski - Initial work.

## License

This project is licensed under the MIT License - see the [LICENSE.md] file for details.

[TetrisJS]: https://dariuszlegizynski.github.io/Tetris_WebApp/
[LICENSE.md]: https://github.com/DariuszLegizynski/React-Movie_App/blob/master/LICENSE



Welcome to my JavaScript tetris game repository.

Here you can play it (press "Enter" to start the game):
https://dariuszlegizynski.github.io/Tetris_WebApp/

Temporary controlls:
- Enter: start the game
- left arrow: move left
- right arrow: move right
- q key: rotate
- down arrow: move one row down

Known bugs:
- clear line -> blocks are visually still present -> affects the game.
- kick rotate not implemented -> when block is rotated near the board border it may get stuck in the wall. To play, please step out of the wall -> affects the game.
- blocks get into each other -> sometimes it may happen -> affects the game.
- some blocks dissapear for a moment -> when the new block comes down to other landed blocks, the landed blocks are undrawn for a short period of time (less then 0,5s). This does issue does not affect the game.
