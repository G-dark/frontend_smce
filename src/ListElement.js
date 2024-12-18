import React from "react";


export function ListElement({ content, colorlyric = "orange", background}) {
 
  return (
    <div
      className="square"
      style={{ backgroundColor: background, color: colorlyric }}
    >
      <h3 style={{ width: "10vw", color: colorlyric, textAlign: "center" }}>
        {content}
      </h3>
    </div>
  );
}

