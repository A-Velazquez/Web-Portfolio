import { useState } from "react";

const HelloComponent = ({ message, alertStyle = "bg-transparent" } : { message : string, alertStyle? : string } )  => {
  
  
  return (
    <div className = {alertStyle}>
      <p>{message}</p>
    </div>);

}

const Sample = () => {

  const [ index, setIndex ] = useState(1);


  const onClickButton = () => {
    setIndex(index + 1);
    console.log(index);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HelloComponent message={`Hello World ${index}`} />
      <button className = "btn btn-sm" onClick={onClickButton}>CLICK ME { index % 2 === 0 ? "Even" : "Odd" }</button>
      { index % 10 === 0 && <HelloComponent message="GOTCHA"/> }
    </div>
  );

}

export default Sample;