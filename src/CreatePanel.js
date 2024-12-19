import React, { useState } from "react";
import { Modal } from "./Modal";
import { PopupPanel } from "./PopupPanel";

export const CreatePanel = () => {
  const [qname, setName] = useState("");
  const [qquantity, setQuantity] = useState("");
  const [qprice, setPrice] = useState("");
  const [edate, setEDate] = useState("");
  const [adate, setADate] = useState("");
  const [cost, setCost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopupPanel = () => setPopupOpen(true);
  const closePopupPanel = () => setPopupOpen(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", selectedImage);
    formData.append("name", qname);
    formData.append("quantity", qquantity);
    formData.append("price", qprice);
    formData.append("expireDate", edate);
    formData.append("arriveDate", adate);
    formData.append("cost", cost);

    fetch("http://localhost:3010/API/producto", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Datos invalidos");
        }
        return response.json();
      })
      .then((data) => {console.log("Éxito:", data)
        openPopupPanel();
      })
      .catch((error) => {console.error("Error:", error)
        setMessage(error.toString());
        openModal()
      });
  };

  return (
    <>
      <div className="title">
        <h2>Ingresar datos</h2>
      </div>
      <div className="form" style={{ display: "flex", alignItems: "center" }}>
        <div>
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
      </div>
      <div className="casilla2">
        Caducidad:
        <input
          id="expired"
          style={{ marginRight: "20px" }}
          type="date"
          value={edate}
          onChange={handleEDateChange}
        />
        Fecha Ingreso:
        <input
          id="arrived"
          type="date"
          value={adate}
          onChange={handleADateChange}
        />
      </div>
      <div className="casilla2">
        <div className="casilla">
          Nombre:
          <input
            className="inData"
            id="name"
            type="text"
            value={qname}
            onChange={handleNameChange}
            placeholder="Ingresar nombre"
          />
        </div>
        <div className="casilla">
          Precio:
          <input
            className="inData"
            id="price"
            type="text"
            value={qprice}
            onChange={handlePriceChange}
            placeholder="Ingresar precio sin iva"
          />
          Cantidad:
          <input
            className="inData"
            id="quantity"
            type="text"
            value={qquantity}
            onChange={handleQuantityChange}
            placeholder="Ingresar cantidad"
          />
        </div>
      </div>
      <div className="casilla2">
        Costo:
        <input
          className="inData"
          id="cost"
          type="text"
          value={cost}
          onChange={handleCostChange}
          placeholder="Ingresar costo"
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        style={{
          marginTop: "1vh",
          padding: "10px 20px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "orange",
          color: "#000",
          cursor: "pointer",
        }}
      >
        Crear
      </button>
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
          Has creado un producto
        </PopupPanel>
    </>
  );
};
