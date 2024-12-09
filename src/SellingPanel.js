export function SellingPanel() {
  return (
    <>
      <h1>Venta</h1>
      Cliente:
      <input
        id="name"
        type="text"
        placeholder="ingresar nombre"
        style={{
          padding: "10px",
          marginRight: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: "orange",
        }}
      />
      Cedula:
      <input
        id="ced"
        type="text"
        placeholder="ingresar cedula"
        style={{
          padding: "10px",
          marginRight: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: "orange",
        }}
      />
    </>
  );
}
