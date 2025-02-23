import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Smile, Frown, Meh, ThumbsUp, ThumbsDown } from 'lucide-react';

const moodOptions = [
  { value: 5, label: 'Great', icon: ThumbsUp, color: 'text-rose-700' },
  { value: 4, label: 'Good', icon: Smile, color: 'text-pink-600' },
  { value: 3, label: 'Okay', icon: Meh, color: 'text-yellow-600' },
  { value: 2, label: 'Not Great', icon: Frown, color: 'text-orange-600' },
  { value: 1, label: 'Terrible', icon: ThumbsDown, color: 'text-red-600' }
];

const factorOptions = [
  'Cramps', 'Headache', 'Bloating', 'Mood Swings', 
  'Energy Levels', 'Diet', 'Exercise', 'Stress',
  'Hydration', 'Sleep'
];

const MoodLogger = ({ supabase }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [notes, setNotes] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const fetchMoodHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('mood_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(7);

      if (error) throw error;

      setMoodHistory(data.map(entry => ({
        date: new Date(entry.created_at).toLocaleDateString(),
        moodValue: Number(entry.mood_value)
      })).reverse());
    } catch (error) {
      console.error('Error fetching mood history:', error);
      setMoodHistory([]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from('mood_logs').insert([
        {
          user_id: user.id,
          mood_value: selectedMood,
          factors: selectedFactors,
          notes: notes,
          created_at: new Date().toISOString(),
        }
      ]);

      if (error) throw error;

      setSelectedMood(null);
      setSelectedFactors([]);
      setNotes('');
      fetchMoodHistory();
    } catch (error) {
      console.error('Error logging mood:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFactor = (factor) => {
    setSelectedFactors(prev => prev.includes(factor) ? prev.filter(f => f !== factor) : [...prev, factor]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-rose-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-rose-900 dark:text-rose-300 text-xl font-semibold mb-4">How are you feeling today?</h2>
        <div className="grid grid-cols-5 gap-4 mb-6">
          {moodOptions.map(({ value, label, icon: Icon, color }) => (
            <button
              key={value}
              onClick={() => setSelectedMood(value)}
              className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-all ${selectedMood === value ? 'bg-rose-300 scale-105' : 'bg-white dark:bg-gray-700 hover:bg-rose-200'}`}
            >
              <Icon className={`w-8 h-8 ${color}`} />
              <span className="text-sm text-rose-900 dark:text-gray-200">{label}</span>
            </button>
          ))}
        </div>
        <h3 className="text-rose-900 dark:text-gray-200 mb-3">What's affecting your mood?</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {factorOptions.map(factor => (
            <button
              key={factor}
              onClick={() => toggleFactor(factor)}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${selectedFactors.includes(factor) ? 'bg-rose-600 text-white' : 'bg-white dark:bg-gray-700 text-rose-900 dark:text-gray-200 border border-rose-200 hover:bg-rose-200'}`}
            >
              {factor}
            </button>
          ))}
        </div>
        <h3 className="text-rose-900 dark:text-gray-200 mb-3">Add a note about your day</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg h-24 focus:ring-2 focus:ring-rose-500 bg-white dark:bg-gray-700"
          placeholder="How was your day? (optional)"
        />
        <button
          onClick={handleSubmit}
          disabled={!selectedMood || isLoading}
          className={`w-full py-2 px-4 rounded-lg text-white transition-colors ${!selectedMood || isLoading ? 'bg-rose-300 cursor-not-allowed' : 'bg-rose-900 hover:bg-rose-800'}`}
        >
          {isLoading ? 'Saving...' : 'Log My Mood'}
        </button>
      </div>

      <div className="bg-rose-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-rose-900 dark:text-rose-300 text-xl font-semibold">Your Mood History</h2>
        <div className="h-64 w-full">
          {moodHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodHistory}>
                <XAxis dataKey="date" stroke="#9b2c2c" />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#9b2c2c" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #9b2c2c', borderRadius: '4px' }} />
                <Line type="monotone" dataKey="moodValue" stroke="#9b2c2c" strokeWidth={2} dot={{ fill: '#9b2c2c', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-rose-900">No mood data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodLogger;
