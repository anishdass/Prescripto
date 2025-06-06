import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relatedDoctors, setRelatedDoctors] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doctor) => doctor.speciality === speciality && doctor._id !== docId
      );
      setRelatedDoctors(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className=' w-full grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 pt-5 gap-y-6 sm:px-0'>
      {relatedDoctors.slice(0, 5).map((doctor, index) => (
        <div
          onClick={() => {
            navigate(`/appointment/${doctor._id}`);
            scrollTo(0, 0);
          }}
          key={index}
          className=' border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
          {/* Doctor's profile */}
          <img className=' bg-blue-50' src={doctor.image} alt='profile-img' />
          <div className=' p-4'>
            <div
              className={`flex items-center gap-2 text-sm text-center ${
                doctor.available ? "text-green-500" : " text-red-500"
              }`}>
              <p
                className={`w-2 h-2 ${
                  doctor.available ? "bg-green-500" : "bg-gray-500"
                } rounded-full`}></p>
              <p>{doctor.available ? "Available" : "Unavailable"}</p>
            </div>
            <p className=' text-gray-900 text-lg font-medium'>{doctor.name}</p>
            <p className=' text-gray-600 text-sm'>{doctor.speciality}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedDoctors;
