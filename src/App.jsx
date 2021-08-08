import React, { useState } from "react";
import "./styles.css";
import { hotelesData } from "./recursos/listadehoteles.js";
import GrillaDeHoteles from "./componentes/GrillaDeHoteles";
import Filtros from "./componentes/Filtros";

export default function App() {
  let [listaDeHoteles, setListaDeHoteles] = useState(hotelesData); //para que compartan el estado filtro y grilla

  return (
    <div className="App">
      <div className="container">
        <Filtros
          hotelesFiltrados={listaDeHoteles}
          listaCompletaDeHoteles={hotelesData}
          setListaDeHoteles={setListaDeHoteles}
        />
        <GrillaDeHoteles hotelesFiltrados={listaDeHoteles} />
      </div>
    </div>
  );
}
