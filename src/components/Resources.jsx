import React from "react";

const resources = {
  articles: [
    { title: "Understanding Period Health", link: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/menstrual-cycle" },
    { title: "Essential Nutrition During Menstruation", link: "https://www.healthline.com/health/womens-health/what-to-eat-during-period" },
    { title: "Managing Cramps Naturally", link: "https://www.healthline.com/health/womens-health/menstrual-cramp-remedies" },
  ],
  videos: [
    { title: "Period Health Explained", link: "https://youtu.be/WOi2Bwvp6hw?si=QILWQ7P7f93PzHnb" },
    { title: "How to Track Your Cycle", link: "https://youtu.be/jA4VHxqa_ug?si=8032hXXTtNyuk4j7" },
  ],
  essentials: [
    { title: "Menstrual Cup Guide", link: "https://www.healthline.com/health/womens-health/menstrual-cup" },
    { title: "Best Period Tracking Apps", link: "https://www.femtechworld.co.uk/special/the-6-best-period-tracking-apps-of-2023/" },
  ],
};

export const Resources = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-cream text-dark-red rounded-lg shadow-lg mt-12">
      <h1 className="text-3xl font-bold text-dark-red mb-4">Resources</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">Articles</h2>
        <div className="grid gap-4">
          {resources.articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-light-pink text-dark-red p-3 rounded-md shadow-sm hover:bg-pink-300 transition"
            >
              {article.title}
            </a>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">YouTube Videos</h2>
        <div className="grid gap-4">
          {resources.videos.map((video, index) => (
            <a
              key={index}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-light-pink text-dark-red p-3 rounded-md shadow-sm hover:bg-pink-300 transition"
            >
              {video.title}
            </a>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Essentials</h2>
        <div className="grid gap-4">
          {resources.essentials.map((essential, index) => (
            <a
              key={index}
              href={essential.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-light-pink text-dark-red p-3 rounded-md shadow-sm hover:bg-pink-300 transition"
            >
              {essential.title}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resources;
