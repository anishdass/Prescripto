import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  function convertTo12Hour(time24) {
    // time24 should be in "HH:mm" format
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 0 to 12 and 13-23 to 1-11

    return `${hour}:${minute} ${ampm}`;
  }

  const getUsersAppointment = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUsersAppointment();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const makePayment = async (appointment) => {
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );
    const { data } = await axios.post(
      backendUrl + "/api/user/payment-stripe",
      {
        amount: appointment.amount,
        name: appointment.docData.name,
        date: slotDateFormat(appointment.slotDate),
        time: appointment.slotTime,
      },
      {
        headers: { token },
      }
    );

    window.location.href = data.session.url;
  };

  useEffect(() => {
    if (token) {
      getUsersAppointment();
    }
  }, [token]);

  return (
    <div>
      <p className=' pb-3 mt-12 font-medium text-zinc-700 border-b'>
        My Appointments
      </p>
      <div>
        {appointments.map((appointment, index) => (
          <div
            className=' grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
            key={index}>
            <div>
              <img
                className=' w-32 bg-indigo-50'
                src={appointment.docData.image}
                alt='doctor-image'
              />
            </div>
            <div className=' flex-1 text-sm text-zinc-600'>
              <p className=' text-neutral-800 font-semibold'>
                {appointment.docData.name}
              </p>
              <p>{appointment.docData.speciality}</p>
              <p className=' text-zinc-700 font-medium mt-1'>Address:</p>
              <p className=' text-xs'>{appointment.docData.address.line1}</p>
              <p className=' text-xs'>{appointment.docData.address.line2}</p>
              <p className=' text-xs mt-1'>
                <span className=' text-sm text-neutral-700 font-medium'>
                  Date & Time:
                </span>{" "}
                {slotDateFormat(appointment.slotDate)} |{" "}
                {convertTo12Hour(appointment.slotTime)}
              </p>
            </div>
            <div></div>
            <div className=' flex flex-col gap-2 justify-end'>
              {!appointment.cancelled && !appointment.isCompleted && (
                <button
                  onClick={() => makePayment(appointment)}
                  className=' text-sm text-stone-500 text-center sm:min-w-40 py-2 border rounded hover:bg-[#5f6fff] hover:text-white transition-all duration-300'>
                  Pay Online
                </button>
              )}
              {!appointment.cancelled && !appointment.isCompleted && (
                <button
                  onClick={() => cancelAppointment(appointment._id)}
                  className=' text-sm text-stone-500 text-center sm:min-w-40 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>
                  Cancel appointment
                </button>
              )}
              {appointment.cancelled && !appointment.isCompleted && (
                <button className=' sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                  Appointment Cancelled
                </button>
              )}
              {appointment.isCompleted && (
                <button className=' sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
