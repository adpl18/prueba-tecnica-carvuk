import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { API_KEY, API_URL } from "../../config";
import Session from "../auth/Session";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const supabase = createClient(API_URL, API_KEY);

function AddAppointments({user}) {
  const location = useLocation();
  const {carId} = location.state;
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [date, setDate] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    getServices();
  }, []);

  const handleServiceClick = (service) => {
    console.log(`Servicio seleccionado: ${service.name}`);
    if (service.availability) {
      setSelectedServiceId(service.id);
    } else {
      alert("Servicio no disponible");
      setSelectedServiceId(null);
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  async function getServices() {
    const { data } = await supabase.from("services").select();
    setServices(data);
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedServiceId) {
        alert("Debes seleccionar un servicio");
        return;
      }
      const { result, error } = await supabase
      .from('appointments')
      .insert([
        { servicesId: selectedServiceId,
          carId: carId,
          pickupAddress: pickupAddress,
          deliveryAddress: deliveryAddress,
          date: date,
        },
      ])
      .select()

      if (error) {
        console.log('Error ingresando servicio programado', error);
      } else {
        console.log(result);
        navigate('/');        
      }
    } catch (error) {
      console.log('Error ingresando servicio programado', error);
    }
  }

  return (
    <div>
      <Session user={user}/>
      <h1>Programas un nuevo servicio</h1>
        <div className="dropdown-container">
            {services.map((service) => (
              <button
                className={selectedServiceId === service.id ? "dropdown-button-selected" : "dropdown-button"}
                key={service.name}
                onClick={() => handleServiceClick(service)}
              >
                {service.name}
              </button>
            ))}
        </div>
      <div className="form-container">
      <label>Dirección de recogida:</label>
      <input
        type="text"
        value={pickupAddress}
        onChange={(e) => setPickupAddress(e.target.value)}
      />

      <label>Dirección de entrega:</label>
      <input
        type="text"
        value={deliveryAddress}
        onChange={(e) => setDeliveryAddress(e.target.value)}
      />

      <div className="datepicker-container">
        <label>Fecha:</label>
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          placeholderText="Selecciona una fecha"
        />
      </div>

      <button className="button-form" onClick={handleSubmit}>Enviar</button>
    </div>
    </div>
  );
}

export default AddAppointments;