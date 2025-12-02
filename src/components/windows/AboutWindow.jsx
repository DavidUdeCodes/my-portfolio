const AboutWindow = () => (
  <div className="p-6 main-font max-w-[66vw] flex gap-12">
    <img className="w-60 h-fit border rounded-[1rem] border-transparent" src="images/meChill.jpg" alt="Me Basketball"/>
    <div className="flex flex-col flex-1 justify-center">
      <div className="mb-4"> 
        <h1 className="text-5xl font-medium mb-2 text-[#32323F]">David Ude</h1>
        <p className="ml-1 tracking-widest">Developer | Designer | Athlete</p>
      </div>
      <div className="font-light"> 
        <p className="mb-4">Hello, I'm a grade 11 student currently attending Pacific Academy</p>
        <ul className="flex flex-col list-disc list-inside pl-6 gap-2">
          <li>I play multiple instruments such as the acoustic guitar, bass guitar, piano, and drums.</li>
          <li>I also play sports, mainly basketball and track and field, and I train with the Vancouver Thunderbirds track club</li>
          <li>In my spare time, I enjoy computer programming, creating various types of digital art, and watching sports.</li>
        </ul>
      </div>
    </div>
  </div>
);
export default AboutWindow;