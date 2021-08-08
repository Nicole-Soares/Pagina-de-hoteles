import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faMapMarker,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";

export default function Hotel(props) {
  

  return (
    <div className="hotel-contenedor">
      <div className="imagen-contenedor">
        <img height="50%" width="50%" src={props.imagen} alt="imagen" />
      </div>
      <div className="contenedor-parteinferior">
        <div className="contenedor-nombre">
          <h3 className="hotel-nombre">{props.nombre}</h3>

          <p className="hotel-descripcion">{props.descripcion}</p>
          <div className="contenedor-ciudad-icono">
            <div className="contenedor-icono">
              <FontAwesomeIcon className="icono-de-lugar" icon={faMapMarker} />
            </div>
            <div className="contenedor-ciudad-pais">
              <p className="ciudad">
                {props.ciudad}, {props.pais}
              </p>
            </div>
          </div>
          <div className="contenedor-habitaciones-precio">
            <div className="contenedor-habitaciones-icono">
              <div className="contenedor-icono-cama">
                <FontAwesomeIcon className="icono-cama" icon={faBed} />
              </div>
              <div className="contenedor-habitaciones">
                <p className="habitaciones">
                  {props.habitaciones} Habitaciones
                </p>
              </div>
            </div>
            <div className="contenedor-precio">
              {[...Array(props.precio)].map((num, numId) => <FontAwesomeIcon className="icono-pesos-blanco" key={numId} icon={faDollarSign} />)}
              {[...Array(4 - props.precio)].map((num, numId) => <FontAwesomeIcon className="icono-pesos-gris" key={numId} icon={faDollarSign} />)}
            </div>
          </div>
          <div className="contenedor-reservar">
            <button className="boton-reservar"> Reservar </button>
          </div>
        </div>
      </div>
    </div>
  );
}
