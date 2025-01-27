import { VehicleMake } from '@/app/page';
import Image from 'next/image';
import { Car } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/utils/apiClient';

export const generateStaticParams = async () => {
  const data = await apiClient(
    'vehicles/GetMakesForVehicleType/car?format=json'
  );

  const makes = data.Results.map((make: VehicleMake) => make.MakeName);
  const years = Array.from({ length: 11 }, (_, i) => 2015 + i);

  const paths = makes.flatMap((makeId: string) => {
    return years.map((year) => ({ makeId, year: year.toString() }));
  });

  return paths;
};

type VehicleModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
  Image_Url?: string;
};

const fetchModels = async (makeId: string, year: string) => {
  try {
    const data = await apiClient(
      `vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    return data.Results;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
};

export default async function Page({
  params,
}: {
  params: Promise<{ makeId: string; year: string }>;
}) {
  const { makeId, year } = await params;

  let models: VehicleModel[] = [];
  let error: string | null = null;

  try {
    models = await fetchModels(makeId, year);
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = 'An unknown error occurred';
    }
  }

  return (
    <div className="my-20 w-3/5 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Results for {models[0]?.Make_Name} {year}:
      </h1>

      {error ? (
        <div className="error-message">{error}</div>
      ) : models.length === 0 ? (
        <li>
          No models found for {makeId} {year}.
        </li>
      ) : (
        <ul>
          {models.length === 0 ? (
            <li>
              No models found for {makeId} {year}.
            </li>
          ) : (
            models.map((model) => (
              <li
                key={model.Model_ID}
                className="flex items-center justify-between border-b p-4 hover:bg-slate-50 last:border-none"
              >
                <div className="flex gap-8 items-center">
                  {model.Image_Url ? (
                    <div className="flex items-center">
                      <Image alt={model.Model_Name} src={model.Image_Url} />
                    </div>
                  ) : (
                    <div className="flex items-center text-neutral-600 justify-center w-28 h-24 rounded-xl bg-slate-200">
                      <Car size={40} />
                    </div>
                  )}
                  <h2 className="c">
                    {model.Make_Name} {model.Model_Name}
                  </h2>
                </div>
                <button className="py-2 px-4 border-2 border-sky-600 rounded-lg hover:bg-sky-600 hover:text-white">
                  View
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      <Link href={`/`}>
        <button className="mt-16 py-3 px-12 bg-sky-600 text-white rounded-lg hover:bg-sky-700">
          Back to the filter
        </button>
      </Link>
    </div>
  );
}
