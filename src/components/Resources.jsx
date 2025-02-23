import React from 'react';

const Resources = () => {
  const meditationVideos = [
    {
      title: "10-Minute Meditation for Menstrual Pain Relief",
      url: "https://www.youtube.com/watch?v=O-6f5wQXSu8",
      duration: "10 mins",
      description: "A quick guided meditation to help relieve menstrual cramps and anxiety."
    },
    {
      title: "Deep Sleep Guided Meditation for Menstrual Comfort",
      url: "https://www.youtube.com/watch?v=aEqlQvczMJQ",
      duration: "30 mins",
      description: "A calming meditation to help you relax and get better sleep during your period."
    },
    {
      title: "Morning Meditation for Menstrual Wellness",
      url: "https://www.youtube.com/watch?v=gwgXtV1uG2M",
      duration: "15 mins",
      description: "Start your day with a gentle meditation focusing on menstrual health and relaxation."
    }
  ];

  const articles = [
    {
      title: "Managing Menstrual Health: Tips and Strategies",
      url: "https://www.healthline.com/health/womens-health/menstrual-health",
      source: "Healthline",
      description: "Learn how to manage menstrual health, from cramps to emotional well-being."
    },
    {
      title: "The Importance of Period Tracking for Your Health",
      url: "https://www.mayoclinic.org/healthy-lifestyle/womens-health/expert-answers/period-tracking/faq-20422662",
      source: "Mayo Clinic",
      description: "Why tracking your period is essential for understanding your overall health."
    },
    {
      title: "Menstrual Health and Mental Well-being",
      url: "https://www.womenshealth.gov/menstrual-cycle-and-mental-health",
      source: "WomensHealth.gov",
      description: "Understanding the connection between menstrual cycles and mental health."
    }
  ];

  const helplines = [
    {
      name: "Menstrual Health Support",
      number: "1800-1234-5678",
      hours: "9 AM - 6 PM",
      description: "A helpline offering menstrual health support and advice."
    },
    {
      name: "Women's Health Helpline",
      number: "1800-4567-8901",
      hours: "24/7",
      description: "A 24/7 support service for women's health concerns, including menstrual health."
    },
    {
      name: "Period Pain Relief Center",
      number: "1860-2345-6789",
      hours: "9 AM - 9 PM",
      description: "Specialized support for managing period-related discomfort and pain relief strategies."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold  mb-12 text-center">Menstrual Health Resources</h1>

        {/* Guided Meditation Videos Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold  mb-6">Guided Meditation Videos</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meditationVideos.map((video, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-medium  mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-2">{video.description}</p>
                <p className="text-sm text-gray-500 mb-3">Duration: {video.duration}</p>
                <a 
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" font-medium"
                >
                  Watch Video → 
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Articles and Resources Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Helpful Articles & Resources</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-medium  mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-2">{article.description}</p>
                <p className="text-sm text-gray-500 mb-3">Source: {article.source}</p>
                <a 
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" font-medium"
                >
                  Read More → 
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Crisis & Helpline Numbers Section */}
        <section>
          <h2 className="text-2xl font-semibold  mb-6">Crisis & Helpline Numbers</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              {helplines.map((helpline, index) => (
                <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <h3 className="text-lg font-medium  mb-2">{helpline.name}</h3>
                  <p className="text-gray-600 mb-2">{helpline.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold ">{helpline.number}</span>
                    <span className="text-sm text-gray-500">Available {helpline.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            If you're experiencing a medical emergency, please dial 911 or visit your nearest emergency room.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;
