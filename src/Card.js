import { useState } from "react";
import deleteimg from "./assets/borrar.png";
import updateimg from "./assets/actualizar.png";
import { Modal } from "./Modal";

export function Card({
  imgsrc,
  name,
  cantidad,
  codigo,
  precio,
  fechaIngreso,
  caducidad,
  costo
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen2, setModal2Open] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const open2Modal = () => setModal2Open(true);
  const close2Modal = () => setModal2Open(false);

  const [qname, setName] = useState(name);
  const [qquantity, setQuantity] = useState(cantidad);
  const [qprice, setPrice] = useState(precio);
  const [edate, setEDate] = useState(caducidad);
  const [adate, setADate] = useState(fechaIngreso);
  const [cost, setCost] = useState(costo);

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(imgsrc);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleEDateChange = (e) => {
    setEDate(e.target.value);
  };
  const handleADateChange = (e) => {
    setADate(e.target.value);
  };
  const handleCostChange = (e) => {
    setCost(e.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    console.log("Imagen seleccionada:", selectedImage);

    const formData = new FormData();

    formData.append("image", selectedImage);

    formData.append("name", qname);
    formData.append("quantity", qquantity);
    formData.append("price", qprice);
    formData.append("expireDate", edate);
    formData.append("arriveDate", adate);
    formData.append("cost", cost);

    fetch("http://localhost:3010/API/producto/" + codigo, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => console.log("Éxito:", data))
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (e) => {
    e.preventDefault();

    fetch("http://localhost:3010/API/producto/" + codigo, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => console.log("Éxito:", data))
      .catch((error) => console.error("Error:", error));

    close2Modal();
  };

  return (
    <>
      <div
        style={{
          background: "orange",
          textAlign: "center",
          width: "10vw",
          marginRight: "4vw",
          marginTop: "5vh",
          height: "fit-content",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h1>{name}</h1>
        <img style={{ width: "9vh" }} src={imgsrc} alt="Imagen de perfil" />
        <h3>Precio: {precio}</h3>
        <h3>Cantidad: {cantidad}</h3>
        <h3>código: {codigo}</h3>
        <h3>Ingreso:{fechaIngreso}</h3>
        <h3>Caducidad:{caducidad}</h3>
        <h3>Costo:{costo}</h3>
        <div className="frame">
          <div className="head">
            <img
              style={{ width: "4vh" }}
              src={updateimg}
              alt="Botón de actualizar"
              onClick={openModal}
            />
          </div>
          <div className="tail">
            <img
              style={{ width: "4vh" }}
              src={deleteimg}
              alt="Botón de eliminar"
              onClick={open2Modal}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 style={{ textAlign: "center" }}>Actualizar producto</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ alignSelf: "center" }}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && (
              <div>
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            )}
          </div>
          Nombre:
          <input
            className="inData"
            id="name"
            type="text"
            value={qname}
            onChange={handleNameChange}
            placeholder="ingresar nombre"
          />
          Precio:
          <input
            className="inData"
            id="price"
            type="text"
            value={qprice}
            onChange={handlePriceChange}
            placeholder="ingresar cantidad"
          />
          Cantidad:
          <input
            className="inData"
            id="quantity"
            type="text"
            value={qquantity}
            onChange={handleQuantityChange}
            placeholder="ingresar cantidad"
          />
          Costo:
          <input
            className="inData"
            id="cost"
            type="text"
            value={cost}
            onChange={handleCostChange}
            placeholder="Ingresar costo"
          /> 
          Caducidad:
          <input id="expired" type="date" value={edate} onChange={handleEDateChange} />
          Fecha Ingreso:
          <input id="arrived" type="date" value={adate} onChange={handleADateChange} />
        </div>
        <button
          style={{
            padding: "20px",
            marginLeft: "13vw",
            marginTop: "10px",
            fontSize: "15px",
          }}
          onClick={handleUpdate}
        >
          Actualizar
        </button>
      </Modal>

      <Modal isOpen={isModalOpen2} onClose={close2Modal}>
        <h2
          style={{
            textAlign: "center",
            color: "red",
            textTransform: "uppercase",
          }}
        >
          Confirmar eliminación
        </h2>
        <strong>
          <p style={{ textAlign: "center" }}>
            Estás seguro que quieres eliminar el producto
          </p>
        </strong>

        <div className="modalFrame">
          <button
            style={{ marginRight: "10px", padding: "10px" }}
            onClick={handleDelete}
          >
            <span className="icon1"></span>
          </button>
          <button style={{ padding: "10px" }} onClick={close2Modal}>
            <span className="icon2"></span>
          </button>
        </div>
      </Modal>
    </>
  );
}
