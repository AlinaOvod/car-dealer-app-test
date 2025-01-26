'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader } from './components/Loader/Loader';
import { apiClient } from '@/utils/apiClient';

export type VehicleMake = {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
};

const FilterPage = () => {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState<number[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedMakeId(
      makes.find((make) => make.MakeName === selectedMake)?.MakeId || null
    );
  }, [selectedMake, makes]);

  useEffect(() => {
    apiClient('vehicles/GetMakesForVehicleType/car?format=json')
      .then((data) => {
        setMakes(data.Results);
      })
      .catch((err) => {
        console.error('Error fetching vehicle makes:', err);
        setError('Error fetching vehicle makes');
      });
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];

    for (let year = 2015; year <= currentYear; year++) {
      yearsArray.push(year);
    }

    setYears(yearsArray);
  }, []);

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const isBtnDisabled = !selectedMake || !selectedYear;

  if (makes.length === 0) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="w-full text-xl h-screen flex justify-center items-center error-message">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 pb-12">
      <div className="flex items-end h-80 w-full bg-sky-600">
        <p className="text-white p-8 text-8xl font-bold">Car Dealer App</p>
      </div>
      <div className="flex flex-col gap-8 w-2/5 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">Vehicle Filter</h1>
        <div className=" flex flex-col gap-3">
          <div>
            <label htmlFor="make" className="mb-1 block text-gray-700">
              Select Vehicle Make:
            </label>
            <select
              id="make"
              className="border p-3 rounded-lg w-full"
              value={selectedMake}
              onChange={handleMakeChange}
            >
              <option value="" disabled>
                Choose a make
              </option>
              {makes.map((make, i) => (
                <option key={i} value={make.MakeName}>
                  {make.MakeName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="year" className="mb-1 block text-gray-700">
              Select Model Year:
            </label>
            <select
              id="year"
              className="border p-3 rounded-lg w-full"
              value={selectedYear}
              onChange={handleYearChange}
              disabled={!selectedMake}
            >
              <option value="" disabled>
                Choose a year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <Link href={`/result/${selectedMakeId}/${selectedYear}`}>
            <button
              className={`py-3 px-12 bg-sky-600 text-white rounded-lg ${
                isBtnDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-sky-700'
              }`}
              disabled={isBtnDisabled}
            >
              Next
            </button>
          </Link>
        </Suspense>
      </div>
    </div>
  );
};

export default FilterPage;
