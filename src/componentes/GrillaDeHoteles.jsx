import React from "react";
import Hotel from "./Hotel";

export default function GrillaDeHoteles(props) {
  return (
    <div className="grilla">
      {props.hotelesFiltrados.length > 0
        ? props.hotelesFiltrados.map((hotel) => (
            <Hotel
              key={hotel.slug}
              nombre={hotel.name}
              imagen={hotel.photo}
              descripcion={hotel.description}
              disponibleDesde={hotel.availabilityFrom}
              disponibleHasta={hotel.availabilityTo}
              habitaciones={hotel.rooms}
              ciudad={hotel.city}
              pais={hotel.country}
              precio={hotel.price}
            />
          ))
        :  <img
           className="banner"
           src="/images/sinresultado.png" 
           alt="No se encuentra la busqueda"
      />}
    </div>
  );
}
