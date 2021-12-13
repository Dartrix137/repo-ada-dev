import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import { GET_PROYECTOS, GET_PROYECTOS_LIDERADOS } from 'graphql/proyectos/queries';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import ModalObj from 'components/ModalObj';
import ModalAvan from 'components/ModalAvan';
import {Enum_TipoObjetivo} from './../.././utils/enums'
import useFormData from 'hooks/useFormData';
import { useUser } from "context/userContext";


const IndexProyectos = () => {

  const { userData } = useUser();

  const{data, error, loading}=useQuery(GET_PROYECTOS);

  const{data: dataLideres, error: errorLideres, loading: loadingLideres}=useQuery(GET_PROYECTOS_LIDERADOS, {
    variables: {
      idLider: userData._id,
    },
  });

  useEffect(()=>{
    console.log('datos de los proyectos Liderados', dataLideres);
  }, [dataLideres]); 

  useEffect(()=>{
    if(error || errorLideres){
      toast.error('error consultando los proyectos')
    }
  },[error])

  if (loading || loadingLideres) return <div>cargando</div>

  return (
  <div>
      <div className="navbar">
          <span>Proyectos</span>
      </div>
    {userData.rol=='ADMINISTRADOR' || userData.rol=='ESTUDIANTE'?
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
    <table className='tabla' >
        <thead>
          <tr>
          
            <th>Nombre</th>
            <th>Presupuesto</th>
            <th>fechaInicio</th>
            <th>estado </th>
            <th>fase </th>
            <th>objetivos</th>
            <th>avances</th>
            <th>actualizar</th>
            <th>inscribirse</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Proyectos.map((u) => {
              
              return (
                
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.presupuesto}</td>
                  <td>{u.fechaInicio}</td>
                  <td>{u.estado}</td>
                  <td>{u.fase}</td>
               
                  <td key={u._id}><ModalObj id={`exampleModelObjetivos-${u._id}`} titulo="Objetivos" objetivos={u.
                    objetivos}></ModalObj>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#exampleModelObjetivos-${u._id}`}>
                    ver
                    </button>
                  </td>

                  <td key={u._id}><ModalAvan id={`exampleModalAvances-${u._id}`} titulo="Avances"  avances={u.avances}></ModalAvan>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#exampleModalAvances-${u._id}`}>
                    ver
                    </button>
                  </td>

                  <td><button type="button" class="btn btn-primary"> actualizar </button></td>
                  <td><button type="button" class="btn btn-primary"> inscripciones </button></td>
            
                </tr>
                
              );
              
            })}
        </tbody>
      </table>
      </div>:""
    }
    {userData.rol=='LIDER' ?

    <div>
    <div className='flex flex-row-reverse mx-10'>
        <Link to="/proyectos/RegistroProyectos" className="btn-general mt-20  text-2xl">
          Registrar Proyecto
        </Link>
    </div>
  
    <div className='flex flex-col justify-center items-center'>
      <div className='table-container'>
        <table id='table-list'>
        <thead>
          <tr>
          
            <th>Nombre</th>
            <th>Presupuesto</th>
            <th>Fecha Inicio</th>
            <th>Estado </th>
            <th>Fase </th>
            <th>Objetivos</th>
            <th>avances</th>
            <th>Editar</th>
            <th>inscribirse</th>
          </tr>
        </thead>
        <tbody>
          {dataLideres &&
            dataLideres.ProyectosLiderados.map((u) => {
              
              return (
                
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.presupuesto}</td>
                  <td>{u.fechaInicio}</td>
                  <td>{u.estado}</td>
                  <td>{u.fase}</td>
              
                  <td key={u._id}><ModalObj id={`exampleModelObjetivos-${u._id}`} titulo="Objetivos" objetivos={u.
                    objetivos}></ModalObj>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#exampleModelObjetivos-${u._id}`}>
                    ver
                    </button>
                  </td>

                  <td key={u._id}><ModalAvan id={`exampleModalAvances-${u._id}`} titulo="Avances"  avances={u.avances}></ModalAvan>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#exampleModalAvances-${u._id}`}>
                    ver
                    </button>
                    
                  </td>

                  <td><button type="button" className="btn btn-primary">  Editar </button></td>
                  <td><Link to="/inscripciones" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Inscribirse
                  </Link></td>
                </tr>
                
              );
              
            })
          }
          </tbody>
        </table>
        </div>
        </div> 
      </div>: ""
    }  
  </div>  
     
  )
};


export default IndexProyectos;
