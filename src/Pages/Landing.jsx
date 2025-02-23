export const Landing = () => {
    return (
        <>
            <section id="home" className="pt-24 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="md:text-4xl"> Track Smarter, Feel Better, Own Your Cycle </h1>
                        <br />
                        <p className="md:text-xl">AI-powered menstrual insights, mood tracking, and a safe space to connect—because your cycle deserves more than just a calendar.</p>
                    </div>
                    <div className="mx-auto text-center pt-6 flex justify-center space-x-4">
                        <button className="btn-primary">Get Started Free</button>
                        <button className="btn-secondary">See How It Works</button>
                    </div>

                </div>
                

            </section>

            <section id="features" className="min-h-screen flex flex-col items-center justify-center section">
                
                <h1 className="mb-6 text-center">Why Choose Lunaflow?</h1>
               
                <p className="md:text-xl mx-auto text-center px-8">Tired of basic period trackers? Lunaflow goes beyond tracking dates. Get <b>AI-powered health insights, personalized wellness tips, and a supportive community</b>—all in one place.</p>  
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
                    <div className="flex flex-col text-center card">
                        <h3>✅ Smart Cycle Predictions</h3>

                    </div>
                    <div className="flex flex-col text-center card">
                        <h3>✅ Symptom & Mood Insights</h3>

                    </div>
                    <div className="flex flex-col text-center card">
                        <h3>✅ Personalized Health Tips</h3>

                    </div>
                    <div className="flex flex-col text-center card">
                        <h3>✅ Anonymous Support Community</h3>

                    </div>
                    <div className="flex flex-col text-center card">
                        <h3>✅ Verified Online Resources</h3>

                    </div>
                    <div className="flex flex-col text-center card">
                        <h3>✅ AI Support 24*7</h3>

                    </div>

                </div>
                <p>Join thousands taking control of their cycle today!</p>

            </section>

            <section id="community" className="min-h-screen flex flex-col items-center justify-center section">
                <h1 className="mb-6 text-center">A Safe Space to Talk</h1>
                <p className="md:text-xl mx-auto text-center px-8">No more <span className="line-through text-rose-500"><i>googling awkward period questions</i></span>. Join our anonymous support forum where real users share experiences and advice. Because you’re not alone in this journey.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
                    <div className="flex flex-col text-center card-highlight">
                        <h3>👩‍💻 Ask Anything, Get Support</h3>

                    </div>
                    <div className="flex flex-col text-center card-highlight">
                        <h3>🤫 Completely Anonymous</h3>

                    </div>
                    <div className="flex flex-col text-center card-highlight">
                        <h3>❤️ No Judgment, Just Community</h3>

                    </div>

                </div>
                <button className="btn-primary">Join the Community</button>
            </section>

            <footer className="footer">
                <p className="footer-content footer-logo">lunaflow</p>
                <p className="text-gray-700 footer-copy">Built for DUHacks by Anukiran & Himani</p>
                <p className="footer-copy">© {new Date().getFullYear()} Lunaflow. All rights reserved.</p>
            </footer>
        </>

    )
}