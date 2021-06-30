import React, { useState } from "react";


export default function Filtros(props) {
  const [paisActual, actualizarPais] = useState("todos");
  const [precioActual, actualizarPrecio] = useState("cualquiera");
  const [tamañoActual, actualizarTamaño] = useState("cualquiera");
  const [tiempoActual, actualizarTiempo] = useState("");
  const [tiempoActualDos, actualizarTiempoDos] = useState("");

  const hotelDisponibleEnFecha = (fechaHotelDesde, fechaHotelHasta, fechaDesde, fechaHasta) => {
    return fechaDesde >= fechaHotelDesde && fechaHasta <= fechaHotelHasta;
  };

  const tamañoDeHotel = (habitaciones) => {
    if (habitaciones < 10) {
      return "pequeño";
    } else if (habitaciones >= 10 && habitaciones < 30) {
      return "mediano";
    } else {
      return "grande";
    }
  };

  const fechasValidas = () => {
    return (
      tiempoActual === "" ||
      tiempoActualDos === "" ||
      tiempoActual < tiempoActualDos
    );
  };

  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "jueves",
    "Viernes",
    "Sabado"
  ];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];
  function dateFormat1(fecha) {
    let t = new Date(fecha);
    let diaDeLaSemana = dias[t.getDay()];
    let diaDelMes = t.getDate() + 1;
    let mes = meses[t.getMonth()];
    let anio = t.getFullYear();
    return `${diaDeLaSemana} ${diaDelMes} de ${mes} del ${anio}`;
  }

  const crearLista = ({
    pais = paisActual,
    precio = precioActual,
    tamaño = tamañoActual,
    fechaDesde = tiempoActual,
    fechaHasta = tiempoActualDos
  }) => {
    let nuevaLista = props.listaCompletaDeHoteles;

    if (pais !== "todos") {
      nuevaLista = nuevaLista.filter((hotel) => hotel.country === pais);
    }
    if (precio !== "cualquiera") {
      nuevaLista = nuevaLista.filter(
        (hotel) => hotel.price === parseInt(precio, 10)
      );
    }
    if (tamaño !== "cualquiera") {
      nuevaLista = nuevaLista.filter(
        (hotel) => tamañoDeHotel(hotel.rooms) === tamaño
      );
    }
    if (fechaDesde !== "" && fechaHasta !== "") {
      let fechaFormateadaDesde = new Date(fechaDesde).valueOf();
      let fechaFormateadaHasta = new Date(fechaHasta).valueOf();
      nuevaLista = nuevaLista.filter((hotel) =>
        hotelDisponibleEnFecha(
          hotel.availabilityFrom,
          hotel.availabilityTo,
          fechaFormateadaDesde,
          fechaFormateadaHasta,
        )
      );
    }
    /*if (fechaHasta !== "") {
      let fechaFormateada = new Date(fechaHasta).valueOf();
      nuevaLista = nuevaLista.filter((hotel) =>
        hotelDisponibleEnFecha(
          hotel.availabilityFrom,
          hotel.availabilityTo,
          fechaFormateada
        )
      );
    }*/
    return nuevaLista;
  };

  const onChangePrecio = (evento) => {
    actualizarPrecio(evento.target.value);
    let listaFiltrada = crearLista({ precio: evento.target.value });
    props.setListaDeHoteles(listaFiltrada);
  };

  const onChangePais = (evento) => {
    actualizarPais(evento.target.value);
    let listaFiltrada = crearLista({ pais: evento.target.value });
    props.setListaDeHoteles(listaFiltrada);
  };

  const onChangeTamaño = (evento) => {
    actualizarTamaño(evento.target.value);
    let listaFiltrada = crearLista({ tamaño: evento.target.value });
    props.setListaDeHoteles(listaFiltrada);
  };

  const onChangeDesde = (evento) => {
    actualizarTiempo(evento.target.value);
    let listaFiltrada = crearLista({ fechaDesde: evento.target.value });
    props.setListaDeHoteles(listaFiltrada);
  };

  const onChangeHasta = (evento) => {
    actualizarTiempoDos(evento.target.value);
    let listaFiltrada = crearLista({ fechaHasta: evento.target.value });
    props.setListaDeHoteles(listaFiltrada);
  };

  const eliminarFiltro = (evento) => {
    actualizarPais("todos");
    actualizarPrecio("cualquiera");
    actualizarTamaño("cualquiera");
    actualizarTiempo("");
    actualizarTiempoDos("");

    let listaFiltrada = crearLista({
      precio: "cualquiera",
      pais: "todos",
      tamaño: "cualquiera",
      fechaDesde: "",
      fechaHasta: "",
    });
    props.setListaDeHoteles(listaFiltrada);
  };

  const fechaInicial=()=>{
    actualizarTiempoDos("");
   
   let listaFiltrada = crearLista({
    fechaHasta:"",
   });
   props.setListaDeHoteles(listaFiltrada);
  }

  let precioFormateado= (precioActual) => {
  
    if(precioActual === "4"){
   return ("lujoso")
    }
    else if (precioActual === "3"){
      return ("caro")
    }
    else if(precioActual === "2"){
      return("medio")
    }
    else if(precioActual === "1"){
      return("barato")
    }
    else{
      return("cualquiera")
    }
      
  }



  return (
    <div className="header">
      <div className="titulo">
        <h1> Hoteles</h1>
        {tiempoActual !== "" && tiempoActualDos !== "" ? (
          fechasValidas() ? (
            <h4>
             Busqueda de hotel {tamañoActual} de precio {precioFormateado(precioActual)} desde {dateFormat1(tiempoActual)} hasta el {dateFormat1(tiempoActualDos)} en {paisActual}
            </h4>
          ) : (
            fechaInicial(), window.alert("La fecha puesta no es valida")
          )
        ) : (
          <></>
        )}
      </div>
      <div className="contenedor-filtros">
        <label htmlFor="hasta">Desde:</label>
        <input
          type="date"
          value={tiempoActual}
          id="desde"
          onChange={onChangeDesde}
        />

        <label htmlFor="hasta">Hasta:</label>
        <input
          type="date"
          value={tiempoActualDos}
          id="hasta"
          onChange={onChangeHasta}
        />

        <select
          name="seleccionar-paises"
          id="seleccionar-paises"
          value={paisActual}
          onChange={onChangePais}
        >
          <option value="todos">Todos los paises</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Argentina">Argentina</option>
          <option value="Brasil">Brasil</option>
          <option value="Chile">Chile</option>
        </select>

        <select
          name="precios"
          id="precios"
          value={precioActual}
          onChange={onChangePrecio}
        >
          <option value="cualquiera">cualquier precio</option>
          <option value="1">Hotel Barato</option>
          <option value="2">Hotel Medio</option>
          <option value="3">Hotel Caro</option>
          <option value="4">Hotel Lujoso</option>
        </select>
        <select
          name="tamaños-habitaciones"
          id="tamaños-habitaciones"
          value={tamañoActual}
          onChange={onChangeTamaño}
        >
          <option value="cualquiera">Cualquier tamaño</option>
          <option value="pequeño">Hotel Pequeño</option>
          <option value="mediano">Hotel Mediano</option>
          <option value="grande">Hotel Grande</option>
        </select>

        <button className="boton-eliminar-filtro" onClick={eliminarFiltro}>
         Limpiar
        </button>
      </div>
    </div>
  );
}
