import Chart from "chart.js/auto";
import React, { useRef, useEffect, useState } from "react";

export function StatisticalPanel() {
  const ref = useRef();
  const chartInstance = useRef();
  let data = [];
  let data2 = [];
  const [optionSelected, setOptionSelected] = useState("");
  const [optionSelected2, setOptionSelected2] = useState("5");
  const [visibility, setVisibility] = useState({ visibility: "hidden" });
  const [visibility2, setVisibility2] = useState({ visibility: "hidden" });
  const [from, setFrom] = useState("1999-08-16");
  const [to, setTo] = useState("2002-09-05");
  const [title, setTitle] = useState("");
  const [years, setYears] = useState([]);

  useEffect(() => {
    const actualYear = new Date(Date.now()).getFullYear() - 5;

    for (let index = 0; index < 10; index++) {
      setYears((t) => [...t, actualYear + index]);
    }
  }, []);

  const getSells = async () => {
    try {
      const resp = await fetch("http://localhost:3010/API/Vender");
      data = await resp.json();
    } catch (error) {
      console.error(error);
    }
  };

  const getProducts = async () => {
    try {
      const resp = await fetch("http://localhost:3010/API/producto");
      data2 = await resp.json();
    } catch (error) {
      console.error(error);
    }
  };
  const dataByDay = [
    { day: "Lunes", count: 0 },
    { day: "Martes", count: 0 },
    { day: "Miercoles", count: 0 },
    { day: "Jueves", count: 0 },
    { day: "Viernes", count: 0 },
    { day: "Sabado", count: 0 },
    { day: "Domingo", count: 0 },
  ];

  const dataByMonth = [
    { month: "Enero", count: 0 },
    { month: "Febrero", count: 0 },
    { month: "Marzo", count: 0 },
    { month: "Abril", count: 0 },
    { month: "Mayo", count: 0 },
    { month: "Junio", count: 0 },
    { month: "Julio", count: 0 },
    { month: "Agosto", count: 0 },
    { month: "Septiembre", count: 0 },
    { month: "Octubre", count: 0 },
    { month: "Noviembre", count: 0 },
    { month: "Diciembre", count: 0 },
  ];
  const dataByProduct = [
    { name: "Cerveza", count: 0 },
    { name: "Vodka", count: 0 },
    { name: "Tequila", count: 0 },
    { name: "Ron", count: 0 },
    { name: "Aguardiente", count: 0 },
    { name: "Gaseosa", count: 0 },
    { name: "Mekato", count: 0 },
    { name: "Vino", count: 0 },
    { name: "Otros", count: 0 },
  ];

  const dataByExpireDate = [
    { month: "Enero", count: 0 },
    { month: "Febrero", count: 0 },
    { month: "Marzo", count: 0 },
    { month: "Abril", count: 0 },
    { month: "Mayo", count: 0 },
    { month: "Junio", count: 0 },
    { month: "Julio", count: 0 },
    { month: "Agosto", count: 0 },
    { month: "Septiembre", count: 0 },
    { month: "Octubre", count: 0 },
    { month: "Noviembre", count: 0 },
    { month: "Diciembre", count: 0 },
  ];

  const dataByArriveDate = [
    { month: "Enero", count: 0 },
    { month: "Febrero", count: 0 },
    { month: "Marzo", count: 0 },
    { month: "Abril", count: 0 },
    { month: "Mayo", count: 0 },
    { month: "Junio", count: 0 },
    { month: "Julio", count: 0 },
    { month: "Agosto", count: 0 },
    { month: "Septiembre", count: 0 },
    { month: "Octubre", count: 0 },
    { month: "Noviembre", count: 0 },
    { month: "Diciembre", count: 0 },
  ];

  const sellsByMonth = async () => {
    data.forEach((sell) => {
      const newDate = new Date(sell.orderDate);
      console.log(newDate.getMonth());
      if (newDate.getFullYear() === years[+optionSelected2]) {
        dataByMonth[newDate.getMonth()].count += sell.subtotal;
      }
    });
  };

 const stringToDate = (str) =>{
  const partes= str.split('-');

  const year = parseInt(partes[0]);
  const month = parseInt(partes[1]);
  const day = parseInt(partes[2]);

  const date = new Date(year,month,day)
  return date;
 }
  const sellsByDay = async () => {
    data.forEach((sell) => {
      const newDate = new Date(sell.orderDate);

      if (newDate >= stringToDate(from) && newDate <= stringToDate(to)) {
       
        dataByDay[newDate.getDay()-1].count += sell.subtotal;
      }
    });
  };
  const sellsByProduct = async () => {
    console.log(data)
    data.forEach((sell) => {
      // eslint-disable-next-line
      sell.products.map((product) => {
        const newDate = new Date(sell.orderDate);

        if (newDate >= stringToDate(from) && newDate <= stringToDate(to)) {
          if (
            product.name.includes("Cerveza") ||
            product.name.includes("cerveza")
          ) {
            dataByProduct[0].count += sell.subtotal;
          } else if (
            product.name.includes("Vodka") ||
            product.name.includes("vodka")
          ) {
            dataByProduct[1].count += sell.subtotal;
          } else if (
            product.name.includes("Tequila") ||
            product.name.includes("tequila")
          ) {
            dataByProduct[2].count += sell.subtotal;
          } else if (
            product.name.includes("Ron") ||
            product.name.includes("ron")
          ) {
            dataByProduct[3].count += sell.subtotal;
          } else if (
            product.name.includes("Aguardiente") ||
            product.name.includes("aguardiente")
          ) {
            dataByProduct[4].count += sell.subtotal;
          } else if (
            product.name.includes("Gaseosa") ||
            product.name.includes("gaseosa")
          ) {
            dataByProduct[5].count += sell.subtotal;
          } else if (
            product.name.includes("Mekato") ||
            product.name.includes("mekato")
          ) {
            dataByProduct[6].count += sell.subtotal;
          } else if (
            product.name.includes("Vino") ||
            product.name.includes("vino")
          ) {
            dataByProduct[7].count += sell.subtotal;
          } else {
            dataByProduct[8].count += sell.subtotal;
          }
        }
      });
    });
  };

  const productsToExpireByMonth = async () => {
    await getProducts();

    data2.forEach((product) => {
      const expireDate = new Date(product.expireDate);
      if (expireDate.getFullYear() === years[+optionSelected2]) {
        dataByExpireDate[expireDate.getMonth()].count += 1;
      }
    });
  };

  const productsToArriveByMonth = async () => {
    await getProducts();

    data2.forEach((product) => {
      const arriveDate = new Date(product.arriveDate);
      if (arriveDate.getFullYear() === years[+optionSelected2]) {
        dataByArriveDate[arriveDate.getMonth()].count += 1;
      }
    });
  };
  const toArray = (array) => {
    let array2 = [];
    array.map((row) => {
      return array2.push(row.name);
    });
    return array2;
  };

  const toArray2 = (array) => {
    let array2 = [];
    array.map((row) => {
      return array2.push(row.count);
    });
    return array2;
  };

  async function graph() {
    //ref2.current.disabled = true;

    const plugin = {
      id: "customCanvasBackgroundColor",
      beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = options.color || "#99ffff";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };

    switch (optionSelected) {
      case "mes":
        chartInstance.current = new Chart(ref.current.getContext("2d"), {
          type: "bar",
          color: "rgb(255, 205, 86)",
          data: {
            labels: dataByMonth.map((row) => row.month),
            datasets: [
              {
                label: "Ventas por mes",
                data: dataByMonth.map((row) => row.count),
                backgroundColor: "rgb(0, 0, 0)",
              },
            ],
          },
          options: {
            plugins: {
              customCanvasBackgroundColor: {
                color: "orange",
              },
            },
          },
          plugins: [plugin],
        });
        break;
      case "dia":
        chartInstance.current = new Chart(ref.current.getContext("2d"), {
          type: "bar",
          color: "rgb(255, 205, 86)",
          data: {
            labels: dataByDay.map((row) => row.day),
            datasets: [
              {
                label: "Ventas por dia",
                data: dataByDay.map((row) => row.count),
                backgroundColor: "rgb(0, 0, 0)",
              },
            ],
          },
          options: {
            plugins: {
              customCanvasBackgroundColor: {
                color: "orange",
              },
            },
          },
          plugins: [plugin],
        });
        break;
      case "producto":
        chartInstance.current = new Chart(ref.current.getContext("2d"), {
          type: "doughnut",
          data: {
            labels: toArray(dataByProduct),
            datasets: [
              {
                label: "Ventas por producto",
                data: toArray2(dataByProduct),
                backgroundColor: [
                  "rgb(6, 64, 43)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                  "rgb(0,0,0)",
                  "rgb(0,255,0)",
                  "rgb(255,0,255)",
                  "rgb(200,100,25)",
                  "rgb(255,255,255)",
                  "rgb(16,44,84)",
                ],
                hoverOffset: 4,
              },
            ],
          },
          options: {
            plugins: {
              customCanvasBackgroundColor: {
                color: "orange",
              },
            },
          },
          plugins: [plugin],
        });
        break;
      case "Vencido":
        chartInstance.current = new Chart(ref.current.getContext("2d"), {
          type: "bar",
          color: "rgb(255, 205, 86)",
          data: {
            labels: dataByExpireDate.map((row) => row.month),
            datasets: [
              {
                label: "Productos a caducar por mes",
                data: dataByExpireDate.map((row) => row.count),
                backgroundColor: "rgb(0, 0, 0)",
              },
            ],
          },
          options: {
            plugins: {
              customCanvasBackgroundColor: {
                color: "orange",
              },
            },
          },
          plugins: [plugin],
        });
        break;
        case "Ingresado":
        chartInstance.current = new Chart(ref.current.getContext("2d"), {
          type: "bar",
          color: "rgb(255, 205, 86)",
          data: {
            labels: dataByArriveDate.map((row) => row.month),
            datasets: [
              {
                label: "Productos ingresados por mes",
                data: dataByArriveDate.map((row) => row.count),
                backgroundColor: "rgb(0, 0, 0)",
              },
            ],
          },
          options: {
            plugins: {
              customCanvasBackgroundColor: {
                color: "orange",
              },
            },
          },
          plugins: [plugin],
        });
        break;
      default:
    }
  }

  const showGraph = async () => {
    await getSells();
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    switch (optionSelected) {
      case "mes":
        setVisibility2({ visibility: "visible" });
        setVisibility({ visibility: "hidden" });
        setTitle("Ventas hechas cada mes del " + years[+optionSelected2]);
        await sellsByMonth();
        await graph();
        break;
      case "dia":
        setVisibility({ visibility: "visible" });
        setVisibility2({ visibility: "hidden" });
        setTitle("Ventas hechas cada dia de la semana");
        await sellsByDay();
        await graph();
        break;
      case "producto":
        setVisibility2({ visibility: "hidden" });
        setVisibility({ visibility: "visible" });
        setTitle("Ventas hechas por producto");
        await sellsByProduct();
        await graph();
        break;
      case "Vencido":
        setVisibility({ visibility: "hidden" });
        setVisibility2({ visibility: "visible" });
        setTitle("Productos a vencer por mes");
        await productsToExpireByMonth();
        await graph();
        break;
        case "Ingresado":
        setVisibility({ visibility: "hidden" });
        setVisibility2({ visibility: "visible" });
        setTitle("Productos ingresados por mes");
        await productsToArriveByMonth();
        await graph();
        break;
      default:
        setVisibility2({ visibility: "hidden" });
        setVisibility({ visibility: "hidden" });
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Reportes</h1>
      <div style={{ alignSelf: "center", textAlign: "center"}}>
        <div style={{display:"flex",flexDirection: "row"} }>
        <h4>Criterio:</h4>
        <select
          onChange={(e) => setOptionSelected(e.target.value)}
          value={optionSelected}
        >
          <option value="">Elige una opción</option>
          <option value="dia">Ventas por dia</option>
          <option value="mes">Ventas por mes</option>
          <option value="producto">Ventas por producto</option>
          <option value="Vencido">productos a caducar por mes</option>
          <option value="Ingresado">productos ingresados por mes</option>
        </select>
        <h4 style={visibility}>De:</h4>
        <input
          type="date"
          onChange={(e) => setFrom(e.target.value)}
          style={visibility}
          value={from}
        />
        <h4 style={visibility} >Hasta:</h4>
        <input
          type="date"
          onChange={(e) => setTo(e.target.value)}
          style={visibility}
          value={to}
        />
         <h4 style={visibility2}>año:</h4>
        
        <select
          style={visibility2}
          onChange={(e) => setOptionSelected2(e.target.value)}
          value={optionSelected2}
        >
          <option value="">Elige un año</option>
          <option value="0">{years[0]}</option>
          <option value="1">{years[1]}</option>
          <option value="2">{years[2]}</option>
          <option value="3">{years[3]}</option>
          <option value="4">{years[4]}</option>
          <option value="5">{years[5]}</option>
          <option value="6">{years[6]}</option>
          <option value="7">{years[7]}</option>
          <option value="8">{years[8]}</option>
          <option value="9">{years[9]}</option>
        </select>
        <button
          style={{ padding: "10px" }}
          onClick={showGraph}
        > <span className="iconStats"></span></button> 
        </div>
        <div style={{ width: "800px" }}>
          <h1>{title}</h1>
          <canvas ref={ref}></canvas>
        </div>
      </div>
    </>
  );
}