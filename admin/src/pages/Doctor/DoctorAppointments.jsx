import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointments = () => {
  const { dtoken, appointments, getAppointments } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, slotTimeFormat, currency } =
    useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className=' w-full max-w-6xl m-5'>
      <p className=' mb-3 text-lg font-medium'>All Appointments</p>
      <div className=' bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]'>
        <div className=' max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-3 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date and Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((appointment, index) => (
          <div
            className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
            key={index}>
            <p className=' max-sm:hidden'>{index + 1}</p>
            <div className=' flex items-center gap-2'>
              <img
                className=' w-8 rounded-full'
                src={appointment.userData.image}
                alt=''
              />
              <p>{appointment.userData.name}</p>
            </div>
            <div>
              <p className=' text-xs inline border border-primary px-2 rounded-full'>
                {appointment.payment ? "Paid" : "Unpaid"}
              </p>
            </div>
            <p className=' max-sm:hidden'>
              {calculateAge(appointment.userData.dob)}
            </p>
            <p>
              {slotDateFormat(appointment.slotDate)},{" "}
              {slotTimeFormat(appointment.slotTime)}
            </p>
            <p>
              {currency}
              {appointment.amount}
            </p>
            <div className=' flex'>
              <img
                className=' w-10 cursor-pointer'
                src={assets.cancel_icon}
                alt='accept-icon'
              />
              <img
                className=' w-10 cursor-pointer'
                src={assets.tick_icon}
                alt='decline-icon'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
