import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';

const PortfolioTemplate = () => {
  // Static demo data
  const data = {
    fullName: "John Doe",
    title: "Full Stack Developer",
    profileImage: "https://via.placeholder.com/150",
    contact: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      email: "johndoe@example.com",
      website: "https://johndoe.com",
    },
    bio: "Passionate developer with experience in building modern web applications.",
    skills: ["React", "Node.js", "Tailwind CSS", "MongoDB"],
    experience: [
      { role: "Frontend Developer", company: "ABC Corp", duration: "Jan 2022 - Present", description: "Worked on React projects and optimized UI." },
      { role: "Intern", company: "XYZ Ltd", duration: "Jun 2021 - Dec 2021", description: "Assisted in backend development using Node.js." },
    ],
    projects: [
      { name: "Portfolio Website", techStack: ["React", "Tailwind"], description: "Built a personal portfolio website.", githubLink: "#", liveDemo: "#" },
      { name: "Task Manager", techStack: ["Node.js", "MongoDB"], description: "Developed a task management app.", githubLink: "#", liveDemo: "#" },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md rounded-2xl p-10 text-center shadow-md">
        <img
          src={data.profileImage}
          alt={data.fullName}
          className="w-36 h-36 mx-auto rounded-full border-4 border-blue-600 object-cover mb-4"
        />
        <h1 className="text-4xl font-bold">{data.fullName}</h1>
        <h3 className="text-blue-600 font-medium mt-2">{data.title}</h3>
        <div className="flex justify-center gap-4 mt-4 text-2xl">
          <a href={data.contact.github}><FaGithub /></a>
          <a href={data.contact.linkedin}><FaLinkedin /></a>
          <a href={`mailto:${data.contact.email}`}><FaEnvelope /></a>
          <a href={data.contact.website}><FaGlobe /></a>
        </div>
      </header>

      {/* About */}
      <section className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-2">About Me</h2>
        <p>{data.bio}</p>
      </section>

      {/* Skills */}
      <section className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {data.skills.map((skill, idx) => (
            <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{skill}</span>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-2">Experience</h2>
        <div className="space-y-4 mt-4">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold">{exp.role}</h3>
              <h4 className="text-gray-500">{exp.company} | {exp.duration}</h4>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-2">Projects</h2>
        <div className="space-y-4 mt-4">
          {data.projects.map((proj, idx) => (
            <div key={idx} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                <h3 className="font-semibold">{proj.name}</h3>
                <div className="flex gap-2">
                  {proj.githubLink && <a href={proj.githubLink} className="text-sm px-2 py-1 bg-gray-300 rounded flex items-center gap-1"><FaGithub /> Code</a>}
                  {proj.liveDemo && <a href={proj.liveDemo} className="text-sm px-2 py-1 bg-blue-600 text-white rounded flex items-center gap-1"><FaGlobe /> Live</a>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {proj.techStack.map((tech, i) => (
                  <span key={i} className="text-blue-600 font-bold text-sm">#{tech}</span>
                ))}
              </div>
              <p>{proj.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default PortfolioTemplate;