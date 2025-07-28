const skillButtonClass = `
  px-4 py-2 rounded-lg border border-gray-200 text-[#32323F] 
  font-medium shadow transform transition duration-150 
  hover:translate-y-0.5 ease-in-out
`;

const programmingSkills = [
  'Python', 'Javascript', 'HTML', 'CSS', 'C#', 'Arduino', 'Unity', 'React'
];

const creativeSkills = [
  'Adobe Photoshop', 'Adobe Premiere', 'Canva', 'Blender', 'Aseprite', 'Procreate', 'Figma'
];

const SkillSection = ({ title, skills }) => (
  <div className="flex flex-col">
    <h2 className="text-2xl text-[#32323F] font-medium mb-3">{title}</h2>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <button key={skill} className={skillButtonClass}>
          {skill}
        </button>
      ))}
    </div>
  </div>
);

const SkillsWindow = () => (
  <div className="flex flex-row gap-x-8 h-full max-w-[60vw] p-6 overflow-x-hidden">
    <SkillSection title="Programming" skills={programmingSkills} />
    <SkillSection title="Creative Software" skills={creativeSkills} />
  </div>
);

export default SkillsWindow;
