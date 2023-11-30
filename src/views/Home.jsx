import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { API_KEY, API_URL } from "../../config";
import Session from "../auth/Session";
import AddServices from "./AddServices";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const supabase = createClient(API_URL, API_KEY);

function Home({user}) {
  const navigate = useNavigate();
  const [car, setCar] = useState('cargando');
  const [addCarText, setAddCarText] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    getCar();
    getAppointments();
    getServices();
  }, []);

  async function getCar() {    
    let { data: cars, error } = await supabase
    .from('cars')
    .select("*")
    .eq('userId', user.id)
       
    if (error) {
      console.log('Error obteniendo patente', error);
      setCar('no auto registrado');
    } else {
      console.log('cars', cars);
      setCar(cars);
    }
  }

  const AddCarSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const { result, error } = await supabase
      .from('cars')
      .insert([
        { car: addCarText, userId: user.id },
      ])
      .select()
      if (error) {
        console.log('Error ingresando patente', error);
      } else {
        console.log(result);
        window.location.reload();
      }
    } catch (error) {
      console.log('Error ingresando patente', error);
    }
  }

  async function getAppointments() {
    try {
      const { data, error } = await supabase.from("appointments").select();
      if (error) {
        console.log('Error obteniendo servicios programados', error);
      } else {
        setAppointments(data);
      }
    } catch (error) {
      console.log('Error obteniendo servicios programados', error);
    }
  }

  async function getServices() {
    try {
      const { data, error } = await supabase.from("services").select();
      if (error) {
        console.log('Error obteniendo servicios', error);
      } else {
        setServices(data);
      }
    } catch (error) {
      console.log('Error obteniendo servicios', error);
    }
  }

  async function deleteAppointment(deleteId) {
    try {
      const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', deleteId)     
      if (error) {
        console.log('Error eliminando servicios programados', error);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log('Error antes de eliminar servicios programados', error);
    }
  }

  function findServicesById(id) {
    const service = services.find((service) => service.id === id);
    if (service) {
      return service.name;
    }
    return '';
  }

  return (
    <div>
      {console.log('car', car)}
      <Session user={user}/>
      <h1>Servicios de {user.email}</h1>
      {car === 'cargando' ? <p>Cargando...</p> :
      car === 'no auto registrado' ?
      (
        <div>
        <label>Patente:</label>
        <input
          type="text"
          value={addCarText}
          onChange={(e) => setAddCarText(e.target.value)}
        />
      <button onClick={AddCarSubmit}>agregar patente</button>
      </div>
      )
      : <p>Patente: {car[0].car}</p>
      }

      <button onClick={() => {
        navigate('/addservices', { state: {carId: car[0].id} });
      }}>Agregar un nuevo servicio</button>

      <h2>Servicios programados</h2>
      <ul>
        {appointments.length === 0 ? <p>No hay servicios programados</p>
        : (
          appointments.map((appointment) => (
            <li key={appointment.id}>
              <p>Fecha: {appointment.date}</p>
              <p>Servicio: {findServicesById(appointment.servicesId)}</p>
              <p>Dirección de recogida: {appointment.pickupAddress}</p>
              <p>Dirección de entrega: {appointment.deliveryAddress}</p>
              <button onClick={() => deleteAppointment(appointment.id)}>Eliminar</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Home;