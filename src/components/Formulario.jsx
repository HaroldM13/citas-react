import { useState, useEffect } from "react";
import Alerta from './Alerta';


const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [alerta, setAlerta] = useState({});

  useEffect( () => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  // const generarId = () => {

  //   const random = Math.random().toString(36).substr(2);
  //   const fecha = Date.now().toString(36);
  //   return random + fecha;
  // }

  const handleSumbit = e => {
    e.preventDefault();

    if ([nombre,propietario,email,fecha,sintomas].includes('')) {
        setAlerta({
          msg: 'Todos los Campos Son Obligatorios!',
          error: true
        })
        return;
    }

    //Objeto de Pacientes
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if (paciente.id) {

      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState );

      setPacientes(pacientesActualizados);

      setPaciente({});

      setAlerta({
        msg:'Paciente Editado Correctamente!',
      });
  
      setTimeout(() => {
        setAlerta({});
      }, 3000);

    } else {
      //Nuevo Paciente
      objetoPaciente.id = crypto.randomUUID(),

      setPacientes([...pacientes, objetoPaciente]);

      setAlerta({
        msg:'Paciente Agregado Correctamente!',
      });
  
      setTimeout(() => {
        setAlerta({});
      }, 3000);

    }

    //Reiniciamos el formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  }

  const { msg } = alerta;

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5" >
        <h2 className="font-black text-3xl text-center" >Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center font-bold mb-10" >
          Ingresa Pacientes {''} 
          <span className="text-indigo-600 font-bold" >Administralos</span>
        </p>


        <form 
          onSubmit={handleSumbit} 
          action="" 
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" >
          {msg && <Alerta alerta={alerta} />}
          <div className="mb-5" >
            <label 
              htmlFor="nombre" 
              className="block text-gray-600 uppercase font-bold"
            >
              Nombre Mascota
            </label>
            <input 
              type="text" 
              name="nombre" 
              id="nombre"
              value={nombre} 
              placeholder="Nombre de la Mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:cursor-text"
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-5" >
            <label 
              htmlFor="propietario" 
              className="block text-gray-600 uppercase font-bold" 
            >
              Nombre Propietario
            </label>
            <input 
              type="text" 
              name="propietario" 
              id="propietario"
              value={propietario} 
              placeholder="Nombre del Propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:cursor-text"
              onChange={e => setPropietario(e.target.value)}
            />
          </div>

          <div className="mb-5" >
            <label 
            htmlFor="email" 
            className="block text-gray-600 uppercase font-bold" 
            >
              Email
            </label>
            <input 
              type="email" 
              name="email" 
              id="email"
              value={email} 
              placeholder="Ingrese Email"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:cursor-text"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5" >
            <label 
            htmlFor="alta" 
            className="block text-gray-600 uppercase font-bold" 
            >
              Fecha Alta
            </label>
            <input 
              type="date" 
              name="alta" 
              id="alta"
              value={fecha}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:cursor-text"
              onChange={e => setFecha(e.target.value)}
            />
          </div>

          <div className="mb-5" >
            <label 
            htmlFor="sintomas" 
            className="block text-gray-600 uppercase font-bold" 
            >
              Sintomas
            </label>
            <textarea 
              name="sintomas" 
              id="sintomas"
              value={sintomas}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:cursor-text" 
              placeholder="Escriba los sintomas del paciente..."
              onChange={e => setSintomas(e.target.value)}
            />
          </div>

          <input 
            type="submit" 
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-700 transition-colors"
            value={ paciente.id ? 'Guardar Cambios' : 'Agregar Paciente' } 
          />

        </form>
    </div>
  )
}

export default Formulario