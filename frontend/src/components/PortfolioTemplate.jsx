import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { getPortfolio } from '../services/api';

const PortfolioTemplate = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) return;
    getPortfolio(username)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load portfolio');
        setLoading(false);
      });
  }, [username]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)   return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!data)   return null;

  // ✅ skills is stored as a comma-separated string in the backend — split for display
  const skillsArray = data.skills
    ? data.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <header className="card backdrop-blur-md rounded-2xl p-10 text-center shadow-md">
        {data.profileImage && (
          <img
            src={data.profileImage}
            alt={data.fullname}
            className="w-36 h-36 mx-auto rounded-full border-4 border-blue-600 object-cover mb-4"
          />
        )}
        {/* ✅ Fixed: fullname (lowercase) */}
        <h1 className="text-4xl font-bold">{data.fullname}</h1>
        {data.title && (
          <h3 className="text-blue-600 font-medium mt-2">{data.title}</h3>
        )}

        {/* Contact icons */}
        {data.contact && (
          <div className="flex justify-center gap-4 mt-4 text-2xl">
            {data.contact.github   && <a href={data.contact.github}   target="_blank" rel="noreferrer"><FaGithub /></a>}
            {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>}
            {data.contact.email    && <a href={`mailto:${data.contact.email}`}><FaEnvelope /></a>}
            {data.contact.website  && <a href={data.contact.website}  target="_blank" rel="noreferrer"><FaGlobe /></a>}
          </div>
        )}
      </header>

      {/* About */}
      {data.bio && (
        <section className="card backdrop-blur-md rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-2">About Me</h2>
          <p>{data.bio}</p>
        </section>
      )}

      {/* Skills */}
      {skillsArray.length > 0 && (
        <section className="card  backdrop-blur-md rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {/* ✅ Fixed: split string into array before mapping */}
            {skillsArray.map((skill, idx) => (
              <span key={idx} className="bg-#1f2328 px-3 py-1 rounded-full text-sm">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="card  backdrop-blur-md rounded-2xl p-6 shadow-md">
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
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section className="card  backdrop-blur-md rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-2">Projects</h2>
          <div className="card space-y-4 mt-4">
            {data.projects.map((proj, idx) => (
              <div key={idx} className="card p-4 rounded-lg">
                <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                  <h3 className="font-semibold">{proj.name}</h3>
                  <div className="flex gap-2">
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noreferrer"
                        className="text-sm px-2 py-1 bg-#1f2328 rounded flex items-center gap-1">
                        <FaGithub /> Code
                      </a>
                    )}
                    {/* ✅ Fixed: liveDemoLink (was liveDemo) */}
                    {proj.liveDemoLink && (
                      <a href={proj.liveDemoLink} target="_blank" rel="noreferrer"
                        className="text-sm px-2 py-1 bg-blue-600 text-white rounded flex items-center gap-1">
                        <FaGlobe /> Live
                      </a>
                    )}
                  </div>
                </div>

                {/* ✅ Fixed: technologies is a string (was techStack array) */}
                {proj.technologies && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {proj.technologies.split(',').map(t => t.trim()).filter(Boolean).map((tech, i) => (
                      <span key={i} className="text-blue-600 font-bold text-sm">#{tech}</span>
                    ))}
                  </div>
                )}

                <p>{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default PortfolioTemplate;
