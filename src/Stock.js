import { useEffect, useState } from "react";

function Stock() {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    
    getProducts()
 // eslint-disable-next-line 
 }, []);

  async function getProducts() {
    const data = await fetch("http://localhost:3010/API/producto");
    setProductos(await data.json());
    console.log(productos);
  }
  return (
    <>

      <table border="2" style={{ backgroundColor: "orange", width: "50%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Ingreso</th>
            <th>Vencimiento</th>
            <th>Costo</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => {
              return (
                <tr key={producto.code}>
                  <td>{producto.code}</td>
                  <td>{producto.name}</td>
                  <td>{producto.price}</td>
                  <td>{producto.arriveDate}</td>
                  <td>{producto.expireDate}</td>
                  <td>{producto.cost}</td>
                  <td> <img style={{width:"50px"}} src={producto.image} alt="perfil"/> </td>
                </tr>
              );
            })
          ) : (
            <tr>
                <td><p>Elementos no encontrados</p></td></tr>
            
          )}
        </tbody>
      </table>
    </>
  );
}

export default Stock;
