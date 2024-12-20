import { useState} from "react";
import { Modal } from "./Modal";
import { PopupPanel } from "./PopupPanel";
import { Slider } from "./Slider";

export function SellingPanel() {
  const [productsList, setProductsList] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [ced, setCed] = useState("");
  const [total, setTotal] = useState("$");
  const [subtotal, setSubtotal] = useState("$");
  const [iva, setIva] = useState("$");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopupPanel = () => setPopupOpen(true);
  const closePopupPanel = () => setPopupOpen(false);

  const [style, setStyle] = useState({ backgroundColor:"orange", width: "6.6vw"})
  const [styleB, setStyleB] = useState({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    right: "-420px",
    paddingTop: "50px",
    maxWidth: "40vw",
    maxHeight: "30vh",
  })
  const style2 = { backgroundColor:"orange", width: "40vw"};
  const styleB2 = {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    right: "-150px",
    paddingTop: "50px",
    maxWidth: "40vw",
    maxHeight: "30vh",
  };
  const handleOnChangeAdd = (e) => {
    setId(e.target.value);
  };
  const handleOnClickAdd = () => {
    setProductsList((t) => [...t, id]);
  };
  const handleOnClickDelete = () => {
    setProductsList([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let letras = new RegExp(/^[A-Za-z\s]+$/g)
    let numeros = new RegExp(/^[0-9]+$/g)
    let numeros2 = new RegExp(/^[0-9]+$/g)
  
    let str ="";
    productsList.map(product=>{return str += product})

    // bug extraño inexplicable
   
  
    if (
      name.trim() !== "" &&
      name !== undefined && 
      numeros.test(str) &&
      letras.test(name) &&
      numeros2.test(ced)&&
      ced.trim() !== "" &&
      ced !== undefined 
    ) {
      const data = {
        customerName: name,
        customerID: ced,
        idProducts: productsList,
      };

      fetch("http://localhost:3010/API/Vender", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Productos no validos");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Éxito:", data);
          openPopupPanel();
          setTotal("$")
          setIva("$")
          setSubtotal("$")
          setTotal((t)=>t + " " + data.total);
          setIva((t)=>t + " " + data.iva);
          setSubtotal((t)=>t + " " + data.subtotal);
        })
        .catch((error) => {
          console.error("Error:", error);
          setMessage(error.toString());
          openModal();
        });
    } else {
      setMessage("Faltan datos del Cliente");
      openModal();
    }
  };

  const getSells = async () => {
    setStyle(style2)
    setStyleB(styleB2)
    try {
      const resp = await fetch("http://localhost:3010/API/Vender");
      setData(await resp.json());
    } catch (error) {}
  };

  return (
    <>
      <div className="sellframe">
        <h1 style={{ textAlign: "center" }}>Venta</h1>
        Cliente:
        <input
          className="inData"
          id="name"
          type="text"
          placeholder="ingresar nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        Cedula:
        <input
          className="inData"
          id="ced"
          type="text"
          placeholder="ingresar cedula"
          value={ced}
          onChange={(e) => setCed(e.target.value)}
        />
        <div className="ids">
          Ids:
          {productsList.length > 0 ? (
            productsList.map((element, index) => {
              return (
                <ol key={index}>
                  <li> {element} </li>
                </ol>
              );
            })
          ) : (
            <h3>No hay ids seleccionados</h3>
          )}
          <span onClick={handleOnClickDelete} className="icon12"></span>
          <input onChange={handleOnChangeAdd} className="sbar" type="text" />
          <button onClick={handleOnClickAdd} className="sbar">
            <span className="lupaicon"></span>
          </button>
        </div>
        <div style={{display:"flex",flexDirection:"column"}}>
        Subtotal:
        <input
          value={subtotal}
          className="inData"
          id="total"
          type="text"
          disabled
        />
        iva:
        <input
          value={iva}
          className="inData"
          id="total"
          type="text"
          disabled
        />
        Total:
        <input
          value={total}
          className="inData"
          id="total"
          type="text"
          disabled
        />
        </div>
       
        <input
          style={{
            padding: "10px 50px",
            marginTop: "25px",
            alignSelf: "center",
            position: "relative",
            right: "-190px",
          }}
          type="button"
          value="Vender"
          onClick={handleSubmit}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div style={{ textAlign: "center" }}>{message}</div> <br />
        <input
          style={{ position: "relative", right: "-15vw", padding: "10px" }}
          type="button"
          value="Ok"
          onClick={closeModal}
        />
      </Modal>

      <PopupPanel isOpen={isPopupOpen} onClose={closePopupPanel}>
        Has hecho una venta
      </PopupPanel>

      <div
        style={styleB}
      >
        <button onClick={getSells} style={style}>Mostrar ventas</button>
        <Slider data={data} />
      </div>
    </>
  );
}
