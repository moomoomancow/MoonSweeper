// // import React from 'react';
// // import { useState } from 'react';
// // import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

// // const Cell = ({ imgSrc, value, onClick, count }) => {
// //   const [imgSrc, setImageSrc] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSViqfwydarhZcs0oYGZfpqXyLeDVHnR1k0xA&s')
// //   const [value, setValue] = useState(Math.floor(Math.random() * 2));


// //   function Clicker (){
// //     value === 1 ? setImageSrc('https://png.pngtree.com/png-clipart/20180608/ourmid/pngtree-grey-moon-free-illustration-png-image_4452211.png') : setImageSrc('https://www.lroc.asu.edu/news/uploads/M117792992L_thumb.png')
// //   }

// //   return (
// //     <>
// //    <Card>
// //     <CardBody>
// //       <img src={imgSrc}
// //       alt ='moon'
// //       onClick={Clicker} key={value}
// //       style={{ width: '100px', height: '100px', objectFit: 'cover' }}/>

// //       <h1>{}</h1>
// //     </CardBody>
// //    </Card>
// //   </>
// //   )
// // }

// // export default Cell

// import React from 'react';
// import { Card, CardBody } from '@chakra-ui/react';
// // import "./Cell.css"

// const Cell = ({ imgSrc, value, onClick, count }) => {
//   return (
//     <Card onClick={onClick}>
//       <CardBody>
//         <img
//           src={imgSrc}
//           alt='moon'
//           style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//         />
//         <h1>{count}</h1>
//       </CardBody>
//     </Card>
//   );
// }

// export default Cell;
