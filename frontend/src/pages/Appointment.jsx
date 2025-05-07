import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { currencySymbol, doctors } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THURS", "FIR", "SAT"];

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const getAvailableSlot = async () => {
    setDoctorSlots([]);
    // Getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // Getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // Setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting Hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDoctorSlots((prev) => [...prev, timeSlots]);
    }
  };

  const fetchDoctorInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id == docId);
    setDoctorInfo(docInfo);
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlot();
  }, [doctorInfo]);

  useEffect(() => {
    console.log(doctorSlots);
  }, [doctorSlots]);

  return (
    doctorInfo && (
      <div>
        {/* Doctor image */}
        <div className=' flex flex-col flex-row gap-4'>
          <div>
            <img
              className=' bg-primary w-full sm:min-w-72 rounded-lg'
              src={doctorInfo.image}
              alt=''
            />
          </div>
          {/* Doctor details */}
          <div className=' flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            <p className=' flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {doctorInfo.name}{" "}
              <img
                className=' w-5'
                src={assets.verified_icon}
                alt='verified-icon'
              />
            </p>
            <div className=' flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>
                {doctorInfo.degree} - {doctorInfo.speciality}
              </p>
              <button className=' py-0.5 px-2 border text-xs  rounded-full'>
                {doctorInfo.experience}
              </button>
            </div>
            {/* Doctor about */}
            <div>
              <p className=' flex items-center gap-1 text-sm font-medium mt-3 text-gray-900'>
                About <img src={assets.info_icon} alt='' />
              </p>
              <p className=' text-sm to-gray-500 max-w-[700px] mt-1'>
                {doctorInfo.about}
              </p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>
              Appointment Fee:{" "}
              <span className=' text-gray-600'>
                {currencySymbol}
                {doctorInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking slots */}
        <div className=' sm: ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking slots</p>
          <div className=' flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {doctorSlots.length &&
              doctorSlots.map((slot, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={` text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : " border border-gray-200"
                  }`}
                  key={index}>
                  <p>{slot[0] && daysOfWeek[slot[0].datetime.getDay()]}</p>
                  <p>{slot[0] && slot[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className=' flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {doctorSlots.length &&
              doctorSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={` text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}>
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className=' bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>
            Book an Appointment
          </button>
        </div>
        {/* Listing Related Doctors */}
        <RelatedDoctors docId={docId} speciality={doctorInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
