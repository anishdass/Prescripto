import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dashData,
    setDashData,
    getDashData,
    dtoken,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getDashData();
    }
  }, [dtoken]);
  console.log(dashData);

  return (
    dashData && (
      <div className=' m-5'>
        <div className=' flex flex-wrap gap-3'>
          <div className=' flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img
              className=' w-14'
              src={assets.earning_icon}
              alt='doctor-icon'
            />
            <div>
              <p className=' text-xl font-semibold text-gray-600'>
                {currency} {dashData.earnings}
              </p>
              <p className=' text-gray-400 '>Earnings</p>
            </div>
          </div>
          <div className=' flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img
              className=' w-14'
              src={assets.appointments_icon}
              alt='appointment-icon'
            />
            <div>
              <p className=' text-xl font-semibold text-gray-600'>
                {dashData.appointments}
              </p>
              {dashData.appointments === 1 ? (
                <p className=' text-gray-400 '>Appointment</p>
              ) : (
                <p className=' text-gray-400 '>Appointments</p>
              )}
            </div>
          </div>
          <div className=' flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img
              className=' w-14'
              src={assets.patients_icon}
              alt='doctor-icon'
            />
            <div>
              <p className=' text-xl font-semibold text-gray-600'>
                {dashData.patients}
              </p>
              {dashData.patients === 1 ? (
                <p className=' text-gray-400 '>Patient</p>
              ) : (
                <p className=' text-gray-400 '>Patients</p>
              )}
            </div>
          </div>
        </div>
        <div className=' bg-white '>
          <div className=' flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
            <img src={assets.list_icon} alt='list-icon' />
            <p className=' font-semibold'>Latest Appointments</p>
          </div>
          <div className=' pt-4  border border-t-0'>
            {dashData.latestAppointments.map((appointment, index) => (
              <div
                className=' flex items-center px-6 py-3 hover:bg-gray-100'
                key={index}>
                <img
                  className=' rounded-full w-10 mr-2'
                  src={appointment.userData.image}
                  alt='doctor-image'
                />
                <div className=' flex-1 text-sm'>
                  <p className=' text-gray-800 font-medium'>
                    {appointment.userData.name}
                  </p>
                  <p className=' text-gray-600'>
                    {slotDateFormat(appointment.slotDate)}
                  </p>
                </div>
                {appointment.cancelled ? (
                  <p className=' text-red-400 text-xs font-medium'>Cancelled</p>
                ) : appointment.isCompleted ? (
                  <p className=' text-green-500 text-xs font-medium'>
                    Completed
                  </p>
                ) : (
                  <div className=' flex'>
                    <img
                      onClick={() => cancelAppointment(appointment._id)}
                      className=' w-10 cursor-pointer'
                      src={assets.cancel_icon}
                      alt='accept-icon'
                    />
                    <img
                      onClick={() => completeAppointment(appointment._id)}
                      className=' w-10 cursor-pointer'
                      src={assets.tick_icon}
                      alt='decline-icon'
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
