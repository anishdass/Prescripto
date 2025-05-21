import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const AllAppointments = () => {
  const { atoken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, slotTimeFormat, currency } =
    useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);

  return (
    <div className=' w-full max-w-6xl m-5'>
      <p className=' mb-3 text-lg font-medium'>All Appointments</p>
      <div className=' bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className=' hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 border-b'>
          <p>#</p>
          <p>Patient`</p>
          <p>Age</p>
          <p>Date and Time</p>
          <p>Doctor name</p>
          <p>Fee</p>
          <p>Action</p>
        </div>
        {appointments.map((appointment, index) => (
          <div
            key={index}
            className=' flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
            <p className=' max-sm:hidden'>{index + 1}</p>
            <div className=' flex items-center gap-2'>
              <img
                className=' w-8 rounded-full'
                src={appointment.userData.image}
                alt='user-image'
              />
              <p>{appointment.userData.name}</p>
            </div>
            <p className=' max-sm:hidden'>
              {calculateAge(appointment.userData.dob)}
            </p>
            <p>
              {slotDateFormat(appointment.slotDate)},{" "}
              {slotTimeFormat(appointment.slotTime)}
            </p>
            <div className=' flex items-center gap-2'>
              <img
                className=' bg-gray-500 w-8 rounded-full'
                src={appointment.docData.image}
                alt='user-image'
              />
              <p>{appointment.docData.name}</p>
            </div>
            <p>
              {currency}
              {appointment.amount}
            </p>
            {appointment.cancelled ? (
              <p className=' text-red-400 text-xs font-medium'>Cancelled</p>
            ) : appointment.isCompleted ? (
              <p className=' text-green-500 text-xs font-medium'>Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(appointment._id)}
                className=' w-10 cursor-pointer'
                src={assets.cancel_icon}
                alt=''
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
