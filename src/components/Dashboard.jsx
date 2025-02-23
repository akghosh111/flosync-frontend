import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();


    const features = [
        {title: "Mood Logging", path: "/mood-log"},
        {title: "Period Tracker", path: "/period-tracker"},
        {title: "Health Tips", path: "/health-tips"},
        {title: "Resources", path: "/resources"},
        {title: "Anonymous Chat", path: "/chat"},
        {title: "AI Chatbot", path: "/chatbot"},

    ];

    

  return (
    <div className="pt-20 min-h-screen section px-6">
        <div className="container mx-auto">
            <h1 className="mb-6">Welcome</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    
                    <div key={index} onClick={() => navigate(feature.path)} >
                        <h3 className="dashboard-card">{feature.title}</h3>
                        {/* <ArrowRight size={24} className="text-rose-600" /> */}
                    
                    </div>
                ))}
            </div>
        </div>
    </div>

  )
}

export default Dashboard
