// import React, { useState, useEffect } from 'react';
// import Cell from './Cell';
// import spaceman from '../media/spaceman.png';
// import crater from '../media/crater.png'
// import gameover from '../media/loser.png'
// import Swal from 'sweetalert2';

// const BoardGenerator = () => {
//   const rows = 10;
//   const columns = 10;
//   const initialImgSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSViqfwydarhZcs0oYGZfpqXyLeDVHnR1k0xA&s';

//   const generateInitialBoard = () => {
//     return Array.from({ length: rows }, () =>
//       Array.from({ length: columns }, () => ({
//         value: Math.floor(Math.random() * 2),
//         imgSrc: initialImgSrc,
//         count: null
//       }))
//     );
//   };

//   const [board, setBoard] = useState(generateInitialBoard);

//   useEffect(() => {
//     setBoard(generateInitialBoard());
//   }, []);

//   const handleClick = (rowIndex, colIndex) => {
//     setBoard((prevBoard) => {
//       const newBoard = prevBoard.map((row, rIndex) =>
//         row.map((cell, cIndex) => {
//           if (rIndex === rowIndex && cIndex === colIndex) {
//             if (cell.value === 0) {
//               // Count surrounding 1s
//               let count = 0;
//               for (let i = -1; i <= 1; i++) {
//                 for (let j = -1; j <= 1; j++) {
//                   if (
//                     rIndex + i >= 0 && rIndex + i < rows &&
//                     cIndex + j >= 0 && cIndex + j < columns &&
//                     !(i === 0 && j === 0)
//                   ) {
//                     if (prevBoard[rIndex + i][cIndex + j].value === 1) {
//                       count++;
//                     }
//                   }
//                 }
//               }
//               return { ...cell, count, imgSrc: spaceman };
//             } else if (cell.value === 1) {
//               // Reset the board if a cell with value 1 is clicked

//               Swal.fire({
//                 title: "Those crummy craters!!",
//                 text: "Play again?",
//                 imageUrl: gameover,
//                 imageWidth: 400,
//                 imageHeight: 200,
//                 imageAlt: "Custom image",
//                 showCancelButton:true,
//                 confirmButtonText: "Yes, play again!"}).then((result) => {
//                   if(result.isConfirmed){
//                     setBoard(generateInitialBoard());
//                   }
//                 })
//               return { ...cell, imgSrc: crater };

//             }
//           }
//           return cell;
//         })
//       );
//       return newBoard;
//     });
//   };

//   return (
//     <>
//       {board.map((row, rowIndex) => (
//         <div key={rowIndex} style={{ display: 'flex' }}>
//           {row.map((cell, colIndex) => (
//             <Cell
//               key={colIndex}
//               value={cell.value}
//               imgSrc={cell.imgSrc}
//               count={cell.count}
//               onClick={() => handleClick(rowIndex, colIndex)}
//             />
//           ))}
//         </div>
//       ))}
//     </>
//   );
// }

// export default BoardGenerator;import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import nuke from '../media/nuke.png'
import miner from '../media/mining.png'

const rows = 10;
const columns = 10;
const numBombs = 10;

const generateInitialBoard = () => {
  let board = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({
      wasClicked: false,
      isBomb: false,
      adjacentBombCount: 0,
    }))
  );

  // Place bombs randomly
  let bombsPlaced = 0;
  while (bombsPlaced < numBombs) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * columns);
    if (!board[row][col].isBomb) {
      board[row][col].isBomb = true;
      bombsPlaced++;
    }
  }

  // Calculate adjacent bomb counts
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c].isBomb) continue;

      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = r + i;
          const newCol = c + j;
          if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < columns &&
            board[newRow][newCol].isBomb
          ) {
            count++;
          }
        }
      }
      board[r][c].adjacentBombCount = count;
    }
  }

  return board;
};

const GameBoard = () => {
  const [board, setBoard] = useState(generateInitialBoard);

  const revealConnectedZeros = (newBoard, rowIndex, colIndex) => {
    const stack = [[rowIndex, colIndex]];

    while (stack.length) {
      const [r, c] = stack.pop();
      if (newBoard[r][c].wasClicked || newBoard[r][c].isBomb) continue;

      newBoard[r][c].wasClicked = true;

      if (newBoard[r][c].adjacentBombCount === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = r + i;
            const newCol = c + j;
            if (
              newRow >= 0 &&
              newRow < rows &&
              newCol >= 0 &&
              newCol < columns &&
              !newBoard[newRow][newCol].wasClicked &&
              !newBoard[newRow][newCol].isBomb
            ) {
              stack.push([newRow, newCol]);
            }
          }
        }
      }
    }

    return newBoard;
  };

  const checkWinCondition = (board) => {
    return board.flat().every(cell => cell.wasClicked || cell.isBomb);
  };

  const handleClick = (rowIndex, colIndex) => {
    setBoard((prevBoard) => {
      // Create a new copy of the board
      let newBoard = prevBoard.map(row => row.map(cell => ({ ...cell })));

      const clickedCell = newBoard[rowIndex][colIndex];
      if (clickedCell.isBomb) {
        Swal.fire({
          title: "Game Over!",
          text: "You clicked on a bomb!",
          imageUrl: nuke,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Game Over",
          confirmButtonText: 'Play Again'
        }).then((result) => {
          if (result.isConfirmed) {
            setBoard(generateInitialBoard());
          }
        });
        newBoard[rowIndex][colIndex] = { ...clickedCell, wasClicked: true, imgSrc: 'https://cdn.pixabay.com/photo/2017/08/30/05/34/bomb-2698181_960_720.png' };
      } else {
        if (!clickedCell.wasClicked) {
          if (clickedCell.adjacentBombCount === 0) {
            newBoard = revealConnectedZeros(newBoard, rowIndex, colIndex);
          } else {
            newBoard[rowIndex][colIndex].wasClicked = true;
          }
        }

        // Check for win condition
        if (checkWinCondition(newBoard)) {
          Swal.fire({
            title: "Congratulations!",
            text: "You won the game!",
            imageUrl: miner,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Congratulations",
            confirmButtonText: 'Play Again'
          }).then((result) => {
            if (result.isConfirmed) {
              setBoard(generateInitialBoard());
            }
          });
        }
      }

      return newBoard;
    });
  };

  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: cell.wasClicked ? '#ddd' : '#fff',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {cell.wasClicked
                ? cell.isBomb
                  ? '💣'
                  : cell.adjacentBombCount || ''
                : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
