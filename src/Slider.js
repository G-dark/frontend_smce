import { useState } from "react";
export const Slider = ({ data }) => {
  const [i, setI] = useState(4);
  const [j, setJ] = useState(0);

  const adelantar = () => {
    if(data.length - i !== 0){
        setI((t) => t + 4);
        setJ((t) => t + 4);
    }
  };

  const atrasar = () => {
    
    if (j > 0) {
      setI((t) => t - 4);
      setJ((t) => t - 4);
    }
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <input
          style={{ backgroundColor:"orange", display: "flex", flexDirection: "column" }}
          type="button"
          value="<"
          onClick={atrasar}
        />
        {data.slice(j, i).map((sell) => {
          return (
            <div key={sell.code}>
              <h1>{sell.customerName}</h1>
              <h2>{sell.code}</h2>
              <h3>{sell.customerID}</h3>
              <h3>{sell.total}</h3>
              <h3>{sell.orderDate}</h3>
            </div>
          );
        })}
        <input
          style={{ backgroundColor:"orange", display: "flex", flexDirection: "column" }}
          type="button"
          value=">"
          onClick={adelantar}
        />
      </div>
    </>
  );
};
