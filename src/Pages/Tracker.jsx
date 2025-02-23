import { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';

export default function PeriodTracker() {
  const [cycleLength, setCycleLength] = useState(28);
  const [startDate, setStartDate] = useState(""); // Add start date
  const [phases, setPhases] = useState([]);
  const [history, setHistory] = useState([]);

  // Calculate phases based on cycle length
  const calculatePhases = () => {
    const ovulationDay = cycleLength - 14;
    const menstruationEnd = 5; // Assume menstruation lasts for 5 days
    const lutealPhaseStart = ovulationDay + 1;

    return [
      { name: "Menstruation", start: 1, end: menstruationEnd },
      { name: "Follicular", start: menstruationEnd + 1, end: ovulationDay - 1 },
      { name: "Ovulation", start: ovulationDay, end: ovulationDay },
      { name: "Luteal", start: lutealPhaseStart, end: cycleLength },
    ];
  };

  
  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from('period_cycles')
        .select('*')
        .order('start_date', { ascending: false });  

      if (error) {
        console.error("Error fetching history:", error);
      } else {
        setHistory(data);
      }
    };

    fetchHistory();
  }, []);  

  
  const handleSubmit = async () => {
    if (!startDate) {
      alert("Please select the start date");
      return;
    }

   
    const calculatedPhases = calculatePhases();

    const formattedPhases = calculatedPhases.map((phase) => ({
      name: phase.name,
      start_date: new Date(new Date(startDate).setDate(new Date(startDate).getDate() + phase.start - 1)),
      end_date: new Date(new Date(startDate).setDate(new Date(startDate).getDate() + phase.end - 1)),
    }));

    
    const { data, error } = await supabase
      .from('period_cycles')  
      .insert([
        {
          cycle_length: cycleLength,
          start_date: startDate,
          phases: formattedPhases,
        },
      ]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Cycle data successfully added:", data);
      
      setHistory([data[0], ...history]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="pt-16 bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-lg font-semibold mb-2">The first day of your last period 🌸</h2>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border rounded-md text-gray-700"
        />
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
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-rose-500 text-white py-2 rounded-md text-lg font-medium"
        >
          See results
        </button>
        <div className="mt-4 text-left">
          {phases.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Cycle Phases:</h3>
              <ul>
                {phases.map((phase, index) => (
                  <li key={index} className="mb-2">
                    <strong>{phase.name}</strong>: {phase.start} - {phase.end} days
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* History Section */}
        <div className="mt-6 text-left">
          <h3 className="text-lg font-semibold mb-2">Cycle History:</h3>
          {history.length > 0 ? (
            <ul>
              {history.map((cycle, index) => (
                <li key={index} className="mb-4">
                  <strong>Cycle {index + 1} (Started on: {new Date(cycle.start_date).toLocaleDateString()})</strong>
                  <ul className="mt-2">
                    {cycle.phases.map((phase, phaseIndex) => (
                      <li key={phaseIndex}>
                        <strong>{phase.name}</strong>: {new Date(phase.start_date).toLocaleDateString()} - {new Date(phase.end_date).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No cycle history available.</p>
          )}
        </div>

        <p className="mt-4 text-sm text-gray-500 flex items-start">
          <span className="text-blue-500 text-lg mr-1 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
              <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
            </svg>
          </span>
          Remember that ovulation predictors and calculators can help you learn more about your cycle and fertile window.
        </p>
      </div>
    </div>
  );
}
