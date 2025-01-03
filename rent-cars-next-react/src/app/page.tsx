'use client'
import Metrics from "@components/rent/metrics";
import { useEffect, useState } from 'react';
import { DatePicker } from "@nextui-org/date-picker";
import { IoMdRefresh } from "react-icons/io";

interface Rent {
  cedula: string;
  nombre: string;
  fecha: string;
  tiempo_dias: string;
  saldo: string;
  placa: string;
  marca: string;
}

export default function Home() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "rent");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item: Rent) => {
    const itemDate = new Date(item.fecha);
    if (!startDate && !endDate) {
      return true;
    }

    if (!startDate) {
      const endDateFormatted = new Date(endDate?.year, endDate?.month - 1, endDate?.day);
      return itemDate <= endDateFormatted;
    }
    if (!endDate) {
      const startDateFormatted = new Date(startDate?.year, startDate?.month - 1, startDate?.day);
      return itemDate >= startDateFormatted;
    }

    const endDateFormatted = new Date(endDate?.year, endDate?.month - 1, endDate?.day);
    const startDateFormatted = new Date(startDate?.year, startDate?.month - 1, startDate?.day);
    return itemDate >= startDateFormatted && itemDate <= endDateFormatted;
  });

  return (
    <div className="mt-10">
      <Metrics data={data}/>
      <div className="inline float-left w-[85%]">
        <div className="bg-white rounded-lg p-6 shadows w-[95%] mx-auto">
          <h1 className="text-2xl font-bold text-center text-gray-800">Alquiler de autos</h1>
          <div className="flex gap-3 my-3 mt-6 text-lg items-center">
            <p className="w-[10%] text-gray-600 font-bold">Filtrar fecha: </p>
            <DatePicker
              className="w-1/4"
              isInvalid={endDate && startDate && startDate > endDate}
              errorMessage={(value) => {
                if (value.isInvalid) {
                  return "Ingresa un rango valido";
                }
              }}
              hideTimeZone
              showMonthAndYearPickers
              label="Desde"
              variant="bordered"
              value={startDate}
              locale="es"
              onChange={setStartDate}
            />
            <p className="">-</p>
            <DatePicker
              className="w-1/4"
              isInvalid={endDate && startDate && startDate > endDate}
              errorMessage={(value) => {
                if (value.isInvalid) {
                  return "Ingresa un rango valido";
                }
              }}
              hideTimeZone
              showMonthAndYearPickers
              label="Hasta"
              variant="bordered"
              value={endDate}
              onChange={setEndDate}
            />
            <IoMdRefresh className="text-2xl hover:text-gray-400 hover:cursor-pointer" onClick={() => { setStartDate(null); setEndDate(null) }} />
          </div>
          <table className="w-full text-center">
            <thead className="bg-gray-600 text-white">
              <tr className="h-10">
                <th>Cedula</th>
                <th>Nombre</th>
                <th>Fecha alquiler</th>
                <th>Tiempo alquilado (dias)</th>
                <th>Saldo</th>
                <th>Placa</th>
                <th>Marca</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {data.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center h-10">No se encontraron resultados</td>
                </tr>
              )}
              {data.length > 0 && filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center h-10">No se encontraron resultados para la fecha seleccionada</td>
                </tr>
              )}
              {filteredData.map((item : Rent, key) => (
                <tr className="border-b border-gray-200 h-10" key={key}>
                  <td>{item.cedula}</td>
                  <td>{item.nombre}</td>
                  <td>
                    {new Date(item.fecha).toLocaleDateString('es-CO', {
                      weekday: 'long', 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td>{item.tiempo_dias}</td>
                  <td>${item.saldo}</td>
                  <td>{item.placa}</td>
                  <td>{item.marca}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
