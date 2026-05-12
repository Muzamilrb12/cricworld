export default function AboutPage() {
  const sections = [
    {
      title: "The Vision of CricWorld",
      content: "CricWorld was born out of a passion for the gentleman's game. Our vision is to create the most immersive, data-driven, and community-focused cricket platform in the world. We believe that every boundary, every wicket, and every strategic decision on the field deserves a platform that captures the essence of the game. Our team is dedicated to bringing you the fastest live scores, the deepest analytics, and the most engaging fan experiences. We are not just a score-keeping app; we are a celebration of cricket. From the dusty streets of Karachi to the grand stadiums of London, cricket is a language we all speak, and CricWorld is its digital home."
    },
    {
      title: "Our Technological Backbone",
      content: "Building a real-time sports platform requires state-of-the-art technology. CricWorld utilizes Next.js 16 for high-performance server-side rendering, ensuring that you get the latest match updates within milliseconds. Our backend is powered by Supabase, providing a robust and scalable architecture for handling millions of concurrent users. We use advanced web scraping pipelines and official API integrations to ensure that our data is always authentic and up-to-date. Our glassmorphic UI is designed to be both beautiful and functional, providing a premium experience across all devices. We are constantly pushing the boundaries of what is possible in sports technology, from AI-powered match predictions to real-time player performance metrics."
    },
    {
      title: "History and Milestones",
      content: "The journey of CricWorld began in 2024 as a small project by a group of cricket enthusiasts. Over the past two years, we have grown into a global platform serving fans in over 50 countries. Significant milestones include the launch of our live commentary engine in 2025, the introduction of the fan engagement suite in early 2026, and our recent expansion into comprehensive women's cricket coverage. Every line of code we write and every feature we release is a testament to our commitment to the game. We have faced challenges, from scaling during major tournaments like the IPL and World Cup to ensuring data accuracy under pressure, but our dedication to quality has never wavered."
    },
    {
      title: "The Fan Experience First",
      content: "At the heart of CricWorld is the fan. We understand the thrill of a last-ball finish and the tension of a rain-curtailed match. That's why we've built features that put you in the middle of the action. Our Live Chat allows you to celebrate with fellow fans, our Prediction Game tests your cricket IQ, and our Notification system ensures you never miss a moment. We are constantly listening to your feedback to improve the platform. Whether it's adding a new stat, improving the layout, or introducing a new league, the fan's voice is our North Star. We believe that cricket is nothing without its supporters, and we are here to amplify your passion."
    },
    {
      title: "Data and Analytics Mastery",
      content: "Cricket is a game of numbers. Averages, strike rates, economy rates—these are the building blocks of cricket strategy. CricWorld takes these numbers and turns them into insights. Our Player Detail pages provide a 360-degree view of a player's career, while our Match Analytics offer deep dives into team form and head-to-head records. We believe that data should be accessible and easy to understand. Our interactive charts and points tables are designed to give you a clear picture of the tournament standings and qualification scenarios. We are moving towards a future where data-driven storytelling is the core of sports journalism, and CricWorld is leading the way."
    },
    {
      title: "Inclusivity in Cricket",
      content: "CricWorld is committed to covering all aspects of the game. We provide extensive coverage of Men's, Women's, and Under-19 cricket across all formats—Test, ODI, and T20. We believe that every player deserves recognition, and every match is important. Our expansion into the Women's World Cup and major domestic leagues like the WBBL and WPL is a core part of our mission. We are also dedicated to making our platform accessible to everyone, with a responsive design that works on everything from high-end desktops to entry-level smartphones. Cricket is a global game, and CricWorld is a global platform."
    },
    {
      title: "Editorial Excellence",
      content: "Beyond the numbers, cricket is about stories. Our news and editorial team works around the clock to bring you the latest happenings from the world of cricket. From match reports and player interviews to investigative pieces on the state of the game, we strive for editorial excellence. We believe in providing accurate, unbiased, and insightful content that adds value to your cricket knowledge. Our commentary team brings the game to life with ball-by-ball descriptions that capture the drama and tension of every match. We are more than just a data provider; we are a source of truth for the cricket community."
    },
    {
      title: "Global Reach, Local Passion",
      content: "While we serve a global audience, we understand the local passion that drives the game. Whether it's the intense rivalry of the Ashes or the high-octane drama of the PSL and IPL, we capture the unique flavor of every tournament. Our platform is designed to be customizable, allowing you to follow your favorite teams and players closely. We are building a community where fans from different cultures and backgrounds can come together and share their love for the game. CricWorld is a bridge that connects the global cricket community, celebrating the diversity and unity that the sport brings."
    },
    {
      title: "The Future Roadmap",
      content: "We are just getting started. The future of CricWorld includes AI-driven personalized news feeds, augmented reality match experiences, and a deeper integration with fantasy sports. We are exploring ways to use blockchain for fan rewards and NFTs for digital collectibles. Our goal is to stay at the cutting edge of innovation, always looking for new ways to enhance your cricket experience. We are investing in research and development to bring you features that were previously unimaginable. The game of cricket is evolving, and CricWorld is evolving with it, ensuring that we remain the number one destination for cricket fans worldwide."
    },
    {
      title: "Commitment to Integrity",
      content: "Integrity is at the core of everything we do. From the accuracy of our data to the security of your personal information, we take our responsibilities seriously. We adhere to the highest standards of data protection and ethical journalism. Our platform is built on trust, and we work hard every day to earn and maintain that trust. We are committed to transparency in our operations and are always open to feedback on how we can do better. At CricWorld, we believe that the spirit of the game should be reflected in our platform, with fairness, respect, and a commitment to excellence as our guiding principles."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-4 text-accent">About CricWorld</h1>
          <p className="text-xl text-muted-foreground font-medium">The ultimate destination for the global cricket community.</p>
        </div>

        <div className="space-y-16">
          {sections.map((section, idx) => (
            <div key={idx} className="glass p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-6 flex items-center gap-4">
                <span className="text-accent text-lg">0{idx + 1}</span>
                {section.title}
              </h2>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                <p>{section.content}</p>
                <p>
                  As we continue to expand, our focus remains on providing the most accurate and engaging content. 
                  Every day, our data scientists and engineers analyze millions of data points to improve our 
                  algorithms. We believe that the intersection of sports and technology is a frontier with 
                  endless possibilities. From predictive modeling to real-time streaming optimizations, 
                  CricWorld is at the forefront of this digital revolution. We invite you to join us on this 
                  journey as we redefine how cricket is consumed and celebrated.
                </p>
                <p>
                  Our commitment to excellence is reflected in every update we push and every new feature 
                  we introduce. We are building for the long term, creating a legacy that will serve 
                  future generations of cricket fans. Thank you for being a part of the CricWorld story.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 glass rounded-[3rem] border border-accent/20 bg-accent/5 text-center">
          <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Join the Revolution</h3>
          <p className="text-lg text-muted-foreground mb-8">Experience the future of cricket today with CricWorld Premium.</p>
          <div className="flex justify-center gap-6">
            <button className="px-10 py-4 bg-accent text-background font-black uppercase italic tracking-widest rounded-2xl hover:scale-105 transition-transform">
              Get Started
            </button>
            <button className="px-10 py-4 glass text-white font-black uppercase italic tracking-widest rounded-2xl hover:bg-white/10 transition-transform">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
