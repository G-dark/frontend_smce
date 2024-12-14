import { useState } from "react";
import lines from "./assets/lines.png"

export function Sidebar({option,setOption}) {
  const [on, setOn] = useState(false);

  const changeState = () => {
    if (on) {
      setOn(false);
    } else {
      setOn(true);
    }
   
  };



  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      position: "absolute",
    },
    div: {
      height: "120vh",
      width: "4vw",
      padding: "20px",
      backgroundColor: "orange",
      textAlign: "center",
    },
    div2: {
      height: "100vh",
      width: "4vw",
      padding: "20px",
      borderRadius: "4px",
      backgroundColor: "brown",
      textAlign: "center",
    },
  };

  return on ? (
    <div>
      <div style={styles.wrapper}>
        <div style={styles.div}>
          <img
            className="imageicon"
            onClick={changeState}
            src={lines}
            alt="tres lineas"
          ></img>

          <ul style={{ display: "flex", flexDirection: "column", position:"absolute", marginLeft:"-5vh"}}>
            <li onClick ={()=>{setOption("4")}} className="listI">Inventario</li> 
            <li onClick ={()=>{setOption("5")}} className="listI">Reportes</li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div style={styles.wrapper}>
      <div style={styles.div2}>
        <img
          className="imageicon"
          onClick={changeState}
          src={lines}
          alt="tres lineas"
        ></img>
      </div>
    </div>
  );
}
