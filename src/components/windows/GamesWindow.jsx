const GamesWindow = () => (
  <div className="flex flex-col items-center justify-center h-full max-w-[60vw] p-6">
    <div className="flex flex-wrap justify-center gap-4">
      {[  
        {
          href: "https://itz-prince-dev.itch.io/drift",
          src: "https://img.itch.zone/aW1nLzg3MzMxMDMucG5n/315x250%23c/fV9MK6.png",
          alt: "drift"
        },
        {
          href: "https://itz-prince-dev.itch.io/dungeon-dash",
          src: "https://img.itch.zone/aW1nLzU0NzYyNTQucG5n/315x250%23c/0LwX%2FX.png",
          alt: "dungeon dash"
        },
        {
          href: "https://itz-prince-dev.itch.io/think-fast",
          src: "https://img.itch.zone/aW1nLzU2OTc2MDQucG5n/315x250%23c/0M%2B7Zs.png",
          alt: "think fast"
        },
        {
          href: "https://itz-prince-dev.itch.io/traffic-trouble",
          src: "https://img.itch.zone/aW1nLzU1ODQ5NTQucG5n/315x250%23c/6qMM%2Bf.png",
          alt: "traffic trouble"
        },
        {
          href: "https://itz-prince-dev.itch.io/tower-defense-game",
          src: "https://img.itch.zone/aW1nLzU0NzcyOTEucG5n/315x250%23c/hfLqwy.png",
          alt: "wave defenders"
        }
      ].map((game, index) => (
        <a
          key={index}
          href={game.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-55 transform transition-transform duration-300 hover:scale-105"
        >
          <img src={game.src} alt={game.alt} className="border border-transparent rounded-lg w-full" />
        </a>
      ))}
    </div>
    <h1 className="mt-6">Click on an image to visit the project</h1>
   </div> 
);
export default GamesWindow;
