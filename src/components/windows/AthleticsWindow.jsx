const AthleticsWindow = () => (
  <div className="p-6 main-font max-w-[70vw]">
    <section className="flex flex-row items-center">
      <img className="w-80 border border-transparent rounded-[1rem]" src="images/meTracknationals.jpg" alt="Me Basketball"/>
      <div className="flex flex-col mt-4 p-4 ml-7"> 
        <h1 className="text-5xl font-medium mb-4 text-[#32323F]">Track and Field</h1>
        <p className="mb-2 ml-1">I specialize in sprints and jumps, competing in events such as the 100mh, long jump, and triple jump.</p>
        <ul className="flex flex-col list-disc list-inside pl-6 gap-2">
          <li>2024 Legion National Youth Track and Field Championships U16 Triple Jump Champion </li>
          <li>2024 Vancouver Thunderbirds U16 Male Athlete of the Year</li>
          <li>2025 BC Athletics U16 Performance Standard Award</li>
          <li>2x BCHS Track and Field Provincial Gold Medalist</li>
          <li>2025 Legion National Youth Track and Field Championships U18 Triple Jump Champion </li>
          <li>2025 Vancouver Thunderbirds U18 Male Athlete of the Year</li>
        </ul>
      </div>
    </section>
    <section className="flex flex-row mt-10">
        <div className="flex flex-col mt-8 mr-4"> 
          <h1 className="text-5xl font-medium mb-4 text-[#32323F]">Basketball</h1>
          <p className="mb-2 ml-1">I have been playing basketball for many years and have really enjoyed playing the game. 
            I play the guard position and have competed in and won various tournaments, competing in provincial level games numerous times during the school season, 
            and gold division tournaments during club ball. I've been able to have lots of fun and create long-lasting memories while playing basketball. 
            I also have a tournament t-shirt collection that is quite large.</p>     
        </div>
        <img className="w-80 border border-transparent rounded-[1rem]" src="images/meProvincialbasketball.jpg" alt="Me Basketball"/>
    </section>
  </div>
);
export default AthleticsWindow;