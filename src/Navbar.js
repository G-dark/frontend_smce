
import { ListElement } from "./ListElement";

export function Navbar({option, setOption}) {

  return (
    <header>
      <nav> 
        <ul> 

        <li onClick = {() => setOption("1")} ><ListElement content ="Crear" colorlyric= "orange" background ="black"/></li>

        <li onClick = {() => setOption("2")} ><ListElement content ="Buscar" colorlyric= "orange" background ="black"/></li>
        
        <li onClick = {() => setOption("3")} ><ListElement content ="Vender" colorlyric= "orange" background ="black"/></li>
        </ul> 
        
        </nav>

       
    </header>
  );
}
