import { useState } from "react";
import { Card } from "./Card";
import lupa from "./assets/lupa.png";

export function SearchPanel() {
  const [searchedItem, setSearchedItem] = useState("");
  const [data, setData] = useState([]);
  const [pholder, setPholder] = useState("Elige un criterio");
  const [filtro, setFiltro] = useState("");
  const [ba, setBa] = useState(false);
  const [gl, setGl] = useState(false);
  const [btnba, setBtnba] = useState("Despues");
  const [btngl, setBtngl] = useState(">=");
  const [show, setShow] = useState({ visibility: "hidden" });
  const [show2, setShow2] = useState({ visibility: "hidden" });
  const handleItemChanges = (e) => {
    setSearchedItem(e.target.value);
  };

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
    switch (e.target.value) {
      case "Codigo":
        setShow({ visibility: "hidden" });
        setShow2({ visibility: "hidden" });
        setPholder("Ejemplo: 1");
        break;
      case "Nombre":
        setShow({ visibility: "hidden" });
        setShow2({ visibility: "hidden" });
        setPholder("Ejemplo: Cerveza");
        break;
      case "FechaE":
        setShow({ visibility: "visible" });
        setShow2({ visibility: "hidden" });
        setPholder("YYYY-MM-DD");
        break;
      case "FechaA":
        setShow({ visibility: "visible" });
        setShow2({ visibility: "hidden" });
        setPholder("YYYY-MM-DD");
        break;
      case "Precio":
        setShow({ visibility: "hidden" });
        setShow2({ visibility: "visible" });
        setPholder("Ejemplo: 5000");
        break;
      case "Costo":
        setShow({ visibility: "hidden" });
        setShow2({ visibility: "visible" });
        setPholder("Ejemplo: 3000");
        break;
      case "All":
        setShow({ visibility: "hidden" });
        setPholder("No es necesario criterio");
        break;
      default:
        setPholder("Elige un criterio");
        setShow2({ visibility: "hidden" });
        setShow({ visibility: "hidden" });
    }
  };
  const handleOnClickbtnAfterBefore = () => {
    if (ba) {
      setBa(false);
      setBtnba("Despues");
    } else {
      setBa(true);
      setBtnba("Antes");
    }
  };
  const handleOnClickbtnGreaterOrLess = () => {
    if (gl) {
      setGl(false);
      setBtngl(">=");
    } else {
      setGl(true);
      setBtngl("<=");
    }
  };
  const handleOnClick = async (e) => {
    try {
      const response = await fetch("http://localhost:3010/API/producto/");
      setData(await response.json());
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
    let array;
    switch (filtro) {
      case "Codigo":
        try {
          const response = await fetch(
            "http://localhost:3010/API/producto/" + searchedItem
          );
          setData(await response.json());
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
        break;
      case "Nombre":
        array = [];
        setTimeout(() => {
          for (let i in Object.values(data)) {
            const obj = Object.values(data)[i];

            if (obj.name.includes(searchedItem)) {
              array.push(obj);
            }
          }
          console.log(array);
          if (array.length > 0  && Object.values(data).length > 0) setData(array);
        }, 3000);

        break;
      case "FechaE":
        array = [];
        setTimeout(() => {
          const searchedDate = new Date(searchedItem);
          for (let i in Object.values(data)) {
            const obj = Object.values(data)[i];
            const datei = new Date(obj.expireDate);

            if (ba) {
              if (datei <= searchedDate) array.push(obj);
            } else {
              if (datei >= searchedDate) array.push(obj);
            }
          }
          console.log(array);
          if (array.length > 0  && Object.values(data).length > 0) setData(array);
        }, 3000);
        break;
      case "FechaA":
        array = [];
        setTimeout(() => {
          const searchedDate = new Date(searchedItem);
          for (let i in Object.values(data)) {
            const obj = Object.values(data)[i];
            const datei = new Date(obj.arriveDate);

            if (ba) {
              if (datei <= searchedDate) array.push(obj);
            } else {
              if (datei >= searchedDate) array.push(obj);
            }
          }
          console.log(array);
          if (array.length > 0 && Object.values(data).length > 0) setData(array);
        }, 3000);
        break;
      case "Precio":
        array = [];
        setTimeout(() => {
          for (let i in Object.values(data)) {
            const obj = Object.values(data)[i];
            const pricei = obj.price;

            if (gl) {
              if (pricei <= +searchedItem) {
                array.push(obj);
              }
            } else {
              if (pricei >= +searchedItem) {
                array.push(obj);
              }
            }
          }
          console.log(array);
          if (array.length >= 0 && Object.values(data).length > 0) setData(array);
        }, 3000);
        break;
      case "Costo":
        array = [];
        setTimeout(() => {
          for (let i in Object.values(data)) {
            const obj = Object.values(data)[i];
            const costi = obj.cost;

            if (gl) {
              if (costi <= +searchedItem) {
                array.push(obj);
              }
            } else {
              if (costi >= +searchedItem) {
                array.push(obj);
              }
            }
          }
          console.log(array);
          if (array.length >= 0 && Object.values(data).length > 0) setData(array);
        }, 3000);
        break;
      case "All":
        break;

      default:
    }
  };

  return (
    <>
      <div className="searchbar">
        <input
          type="text"
          placeholder={pholder}
          style={{ fontSize: "20px" }}
          onChange={handleItemChanges}
        />
        <button style={{ backgroundColor: "white" }} onClick={handleOnClick}>
          <img style={{ width: "7vh" }} src={lupa} alt="lupa" />
        </button>
      </div>

      <div className="filtrado">
        <select name="tipo" onChange={handleFiltroChange} value={filtro}>
          <option value="">Filtrado por tipo</option>
          <option value="Nombre">Nombre</option>
          <option value="Codigo">Código</option>
          <option value="Costo">Costo</option>
          <option value="Precio">Precio</option>
          <option value="FechaE">Vencimiento</option>
          <option value="FechaA">Ingreso</option>
          <option value="All">Todos</option>
        </select>
        <button style={show} onClick={handleOnClickbtnAfterBefore}>
          {btnba}
        </button>
        <button style={show2} onClick={handleOnClickbtnGreaterOrLess}>
          {btngl}
        </button>
      </div>

      <div className="products">
        {Array.isArray(Object.values(data)) ? (
          (Object.values(data).length > 0) ? ( Object.values(data).map((producto) => {
            return (
              <Card
                key={producto.code}
                imgsrc={producto.image}
                name={producto.name}
                cantidad={producto.quantity}
                codigo={producto.code}
                precio={producto.price}
                caducidad={producto.expireDate}
                fechaIngreso={producto.arriveDate}
                costo={producto.cost}
              />
            );
          })):(<h3>No hay productos con esas caracteristicas</h3>)
         
        ) : (
          <h3>No hay datos seleccionados</h3>
        )}
      </div>
    </>
  );
}
