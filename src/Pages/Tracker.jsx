import { useState } from "react";
import Calendar from "../components/Calendar";

export default function PeriodTracker() {
//   const [date, setDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-lg font-semibold mb-2">The first day of your last period 🌸</h2>
        {/* <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-md text-gray-700"
        /> */}
        <Calendar/>
        <h2 className="text-lg font-semibold mt-4 mb-2">Average cycle length (days)</h2>
        <div className="flex items-center justify-center space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded-md"
            onClick={() => setCycleLength((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <input
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
            className="w-16 text-center p-2 border rounded-md"
          />
          <button
            className="px-3 py-1 bg-gray-200 rounded-md"
            onClick={() => setCycleLength((prev) => prev + 1)}
          >
            +
          </button>
        </div>
        <button className="w-full mt-4 bg-rose-500 text-white py-2 rounded-md text-lg font-medium">
          See results
        </button>
        <p className="mt-4 text-sm text-gray-500 flex items-start">
          <div className="text-blue-500 text-lg mr-1 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
        <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
        </svg></div>
          Remember that ovulation predictors and calculators can help you learn more about your cycle and fertile window.
        </p>
      </div>
    </div>
  );
}
