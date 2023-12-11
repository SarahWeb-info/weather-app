import React , {useState} from 'react';
import '../css/navbar.css';
import { MdHome , MdLocationOn , MdPerson} from "react-icons/md";


export default function Navbar() {
  const noBorder = {'borderRadius': '0'};
  const rightBorder = {'borderTopRightRadius': '3vw'};
  const leftBorder = {'borderTopLeftRadius': '3vw'};

  const [ space1 , setSpace1 ]  = useState(noBorder);
  const [ space2 , setSpace2 ]  = useState(noBorder);
  const [ space3 , setSpace3 ]  = useState(noBorder);
  const [ space4 , setSpace4 ]  = useState(noBorder);

  const resetBorder = () => {
    setSpace1(noBorder);
    setSpace2(noBorder);
    setSpace3(noBorder);
    setSpace4(noBorder);
  }

  const displayStyle=(x)=>{
    resetBorder();
   
    if (x===1) {
      setSpace1(rightBorder);
      setSpace2(leftBorder);
    }else if(x===2){
      setSpace2(rightBorder);
      setSpace3(leftBorder);
    }else {
      setSpace3(rightBorder);
      setSpace4(leftBorder);
    }
  }

  return (
    <div className='navbar'>
      <span style={space1}></span>
      <a href="/app" onMouseOver={()=>displayStyle(1)} onMouseLeave={resetBorder}><MdHome /></a>
      <span style={space2}></span>
      <a href="/aroundUs"  onMouseOver={()=>displayStyle(2)}  onMouseLeave={resetBorder}><MdLocationOn /></a>
      <span style={space3}></span>
      <a href="/setting" onMouseOver={()=>displayStyle(3)}  onMouseLeave={resetBorder}><MdPerson /></a>
      <span style={space4}></span>
    </div>
  )
}
