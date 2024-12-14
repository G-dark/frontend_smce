import { Navbar } from "./Navbar";
import { CreatePanel } from "./CreatePanel";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { SearchPanel } from "./SearchPanel";
import { SellingPanel } from "./SellingPanel";

export function App() {
  const [option, setOption] = useState("");
  switch (option) {
    case "":
      return (
        <div>
          <Sidebar option={option} setOption={setOption}/>
          <div className="first-container">
            <Navbar option={option} setOption={setOption} />
            {option}
          </div>
          <div className="second-container">
            <div className="main-Container"></div>
          </div>
        </div>
      );

    case "1":
      return (
        <div>
          <Sidebar option={option} setOption={setOption}/>
          <div className="first-container">
              <Navbar option={option} setOption={setOption} />
          </div>

          <div className="second-container">
            <div className="main-container">
              <CreatePanel />
            </div>
          </div>
        </div>
      );

      case "2":
      return (
        <div>
          <Sidebar option={option} setOption={setOption}/>
          <div className="first-container">
              <Navbar option={option} setOption={setOption} />
          </div>

          <div className="second-container">
            <div className="main-container">
              <SearchPanel />
            </div>
          </div>
        </div>
      );

      case "3":
        return (
          <div>
            <Sidebar option={option} setOption={setOption}/>
            <div className="first-container">
                <Navbar option={option} setOption={setOption} />
            </div>
  
            <div className="second-container">
              <div className="main-container">
               <SellingPanel/>
              </div>
            </div>
          </div>
        );
        case "4":
        return (
          <div>
            <Sidebar option={option} setOption={setOption}/>
            <div className="first-container">
                <Navbar option={option} setOption={setOption} />
            </div>
  
            <div className="second-container">
              <div className="main-container">
               
              </div>
            </div>
          </div>
        );

        case "5":
        return (
          <div>
            <Sidebar option={option} setOption={setOption}/>
            <div className="first-container">
                <Navbar option={option} setOption={setOption} />
            </div>
  
            <div className="second-container">
              <div className="main-container">
               
              </div>
            </div>
          </div>
        );
        default:
          <h1>No hay información</h1>
  }
}
