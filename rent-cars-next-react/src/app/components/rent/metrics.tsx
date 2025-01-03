'use client'
import { useEffect, useState } from "react";
import { DatePicker } from "@nextui-org/date-picker";
import {today, getLocalTimeZone} from "@internationalized/date";

const Metrics = ({ data }) => {
  // Inicializar el estado como una fecha actual válida
  const [inputDate, setDate] = useState<Date | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);

  useEffect(() => {
    const formattedDate = today().year + "-" + (today().month < 10 ? "0" + today().month : today().month) + "-" + (today().day < 10 ? "0" + today().day : today().day);
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}rent/metrics/${formattedDate}`);
      const data = await response.json();
      setMonth(data.month_count);
      setDay(data.day_count);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (inputDate) {
      const formattedDate = inputDate?.year + "-" + (inputDate?.month < 10 ? "0" + inputDate?.month : inputDate?.month) + "-" + (inputDate?.day < 10 ? "0" + inputDate?.day : inputDate?.day);
      const fetchData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}rent/metrics/${formattedDate}`);
        const data = await response.json();
        setMonth(data.month_count);
        setDay(data.day_count);
      };

      fetchData();
    }
  }, [inputDate]);

  return (
    <div className="rounded-lg p-6 float-left w-[15%] bg-gray-700 text-white">
      <DatePicker
        className="bg-gray-200 text-gray-800 my-4 overflow-hidden rounded-lg"
        hideTimeZone
        showMonthAndYearPickers
        label="Fecha"
        variant="bordered"
        defaultValue={today()}
        locale="es"
        onChange={(newDate) => setDate(newDate)} // Asegúrate de pasar un objeto Date válido
      />
      <div>
        <div className="text-center hover:text-gray-400 hover:cursor-pointer">
          <p className="text-3xl font-bold">{month}</p>
          <p className="text-lg">Alquileres mensuales</p>
        </div>
        <div className="text-center mt-10 hover:text-gray-400 hover:cursor-pointer">
          <p className="text-3xl font-bold">{day}</p>
          <p className="text-lg">Alquileres diarios</p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
