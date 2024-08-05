import React from 'react';
import Cell from './Cell'

const BoardGenerator = () => {

    function Board() {
      const rows = 10;
      const columns = 10;
      const matrix = Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {Array.from({ length: columns }, (_, colIndex) => (
            <Cell key={colIndex} num={rowIndex * columns + colIndex} />
          ))}
        </div>
      ));

  return <>{matrix}</>;
  }

    return (
      <>
      <Board/>
      </>
    )
  }

export default BoardGenerator