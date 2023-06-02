import { useState } from 'react';
import { v1 as uuid } from "uuid"
import './App.css';
import Header from './componentes/Header/header';
import Formulario from './componentes/Formulario/Formulario';
import MiOrg from './componentes/MiOrg';
import Equipo from './componentes/Equipo';
import Footer from './componentes/Footer';


function App() {

  const [mostrarFormulario,actualizarMostrar] = useState(false)
  const [colaboradores, actualizarColaboradores] = useState([{
    equipo:"Front End",
    foto: "https://github.com/harlandlohora.png",
    nombre: "Harland Lohora",
    puesto: "Instructor",
    fav: false
  },
  {
    equipo:"Programación",
    foto: "https://github.com/genesysaluralatam.png",
    nombre: "Genesys Rondon",
    puesto: "Desarrolladora de software e instructora",
    fav: true

  },
  {
    equipo:"UX y Diseño",
    foto: "https://github.com/JeanmarieAluraLatam.png",
    nombre: "Jeanmarie Quijada",
    puesto: "Instructora en Alura Latam",
    fav: false

  },
  {
    equipo:"Programación",
    foto: "https://github.com/christianpva.png",
    nombre: "Christian Velasco",
    puesto: "Head en Alura e Instructor",
    fav: false
  },
  {
    equipo:"Innovación y Gestión",
    foto: "https://github.com/JoseDarioGonzalezCha.png",
    nombre: "Jose Gonzalez",
    puesto: "Dev Fullstack"
  }])

  const [equipos,actualizarEquipos] = useState([

    {
      id: uuid(),
      titulo: "Programación",
      colorPrimario: "#57C278",
      colorSecundario:"#D9F7E9" 
    },
    {
      id: uuid(),
      titulo: "Front End",
      colorPrimario: "#82CFFA",
      colorSecundario:"#E8F8FF"
    },
    {
      id: uuid(),
      titulo: "Data Science",
      colorPrimario: "#A6D157",
      colorSecundario:"#F0F8E2"
    },

    {
      id: uuid(),
      titulo: "Devops",
      colorPrimario: "#E06B69",
      colorSecundario:"#FDE7E8"
    },

    {
      id: uuid(),
      titulo: "UX y Diseño",
      colorPrimario: "#DB6DBF",
      colorSecundario:"#FAE9F5"
    },

    {
      id:uuid(),
      titulo: "Movil",
      colorPrimario: "#FFBA05",
      colorSecundario:"#FFF5D9"
    },

    {
      id:uuid(),
      titulo: "Innovacion y gestion",
      colorPrimario: "#FF8A29",
      colorSecundario:"#FFEEDF"
    }

  ])
  //Dos formas de usar el operador ternario
  //Ternario --> condicion ? Semuestra : noSeMuestra
  // condicion && seMuestra 

  const cambiarMostrar = () => {
    actualizarMostrar(!mostrarFormulario)
  }

  //Registrar colaborador
  const registrarColaborador=(colaborador) =>{
    console.log("Nuevo colaborador", colaborador )
    actualizarColaboradores([...colaboradores,colaborador]) // ... con los 3 puntitos copiamos un arreglode colaboradores
  }

  //Eliminar Colaborador
  const eliminarColaborador= (id)=>{
    console.log("Eliminar Colaborador",id)
    const nuevosColaboradores = colaboradores.filter((colaborador)=> colaborador.id !== id)
    actualizarColaboradores(nuevosColaboradores)
  }


//Actualizar color de equipo
  const actualizarColor =(color,id)=> {
    console.log("Actualizar:",color,id)
    const equiposActualizados = equipos.map((equipo)=>{
      if (equipo.id === id) {
        equipo.colorPrimario = color
      }
      return equipo
    })
    actualizarEquipos(equiposActualizados)
  }


//Crear Equipo
 
const crearEquipo = (nuevoEquipo) =>{
  console.log(nuevoEquipo)
  actualizarEquipos([...equipos,{...nuevoEquipo, id:uuid()}])
}

  const like = (id) =>{
    console.log("like",id)
    const colaboradoresActualizados = colaboradores.map((colaborador)=>{
      if (colaborador.id === id){
      colaborador.fav = !colaborador.fav
      }
      return colaborador
  })
  actualizarColaboradores(colaboradoresActualizados)
  }


  return (
    <div >
      <Header/>
      {/* { mostrarFormulario === true ? <Formulario/> : <> </> } */}

      {
        mostrarFormulario && <Formulario 
          equipos= {equipos.map((equipo)=>equipo.titulo)}
          registrarColaborador = {registrarColaborador}
          crearEquipo= {crearEquipo}
       />
      }
      <MiOrg cambiarMostrar = {cambiarMostrar} />
      
      {
        equipos.map( (equipo)=>{ 
          //en react siempre que trabajamos con map usamos key
          return <Equipo 
            datos={equipo}
            key={equipo.titulo}
            colaboradores= {colaboradores.filter(colaborador => colaborador.equipo === equipo.titulo)}
            eliminarColaborador = {eliminarColaborador}
            actualizarColor={actualizarColor}
            like={like}
          />
        })
      }

      <Footer/>

    </div>
   
  );
}
 

export default App;
