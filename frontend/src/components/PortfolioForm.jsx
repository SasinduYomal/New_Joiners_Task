import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPortfolio, createPortfolio, updatePortfolio } from '../services/api';

const PortfolioForm = ({ isEdit }) => {
    const navigate = useNavigate();
    const { username } = useParams();

    const [formData, setFormData] = useState({
        username: '',
        fullname: '',           
        title: '',
        bio: '',
        profileImage: '',
        contact: { email: '', linkedin: '', github: '', website: '' },
        skills: [''],           
        projects: [{ name: '', description: '', technologies: '', githubLink: '', liveDemoLink: '' }], // ✅ Fixed: liveDemoLink
        experience: [{ company: '', role: '', duration: '', description: '' }]
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit && username) {
            setLoading(true);
            getPortfolio(username)
                .then(res => {
                    const data = res.data;

                    // Convert skills string back to array for the form UI
                    if (typeof data.skills === 'string') {
                        data.skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
                    }

                    setFormData(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to load portfolio: ' + (err.response?.data?.error || err.message));
                    setLoading(false);
                });
        }
    }, [isEdit, username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, contact: { ...prev.contact, [name]: value } }));
    };

    // Dynamic Skills
    const handleSkillChange = (index, value) => {
        const newSkills = [...formData.skills];
        newSkills[index] = value;
        setFormData(prev => ({ ...prev, skills: newSkills }));
    };
    const addSkill = () => setFormData(prev => ({ ...prev, skills: [...prev.skills, ''] }));
    const removeSkill = (index) => setFormData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));

    // Dynamic Projects
    const handleProjectChange = (index, field, value) => {
        const newProjects = [...formData.projects];
        newProjects[index][field] = value;
        setFormData(prev => ({ ...prev, projects: newProjects }));
    };
    const addProject = () => setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, { name: '', description: '', technologies: '', githubLink: '', liveDemoLink: '' }] // ✅ Fixed
    }));
    const removeProject = (index) => setFormData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));

    // Dynamic Experience
    const handleExpChange = (index, field, value) => {
        const newExp = [...formData.experience];
        newExp[index][field] = value;
        setFormData(prev => ({ ...prev, experience: newExp }));
    };
    const addExp = () => setFormData(prev => ({
        ...prev, experience: [...prev.experience, { company: '', role: '', duration: '', description: '' }]
    }));
    const removeExp = (index) => setFormData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const dataToSubmit = { ...formData };

            dataToSubmit.skills = dataToSubmit.skills.filter(Boolean).join(', ');

            if (isEdit) {
                await updatePortfolio(username, dataToSubmit);
            } else {
                await createPortfolio(dataToSubmit);
            }
            navigate(`/preview/${dataToSubmit.username}`);
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>{isEdit ? 'Edit Portfolio' : 'Create Portfolio'}</h2>
            {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleSubmit}>

                {/* Personal Info */}
                <div className="card">
                    <h3>Personal Information</h3>
                    <div className="flex gap-4">
                        <div style={{ flex: 1 }}>
                            <label>Username</label>
                            <input name='username' value={formData.username} onChange={handleChange} required disabled={isEdit} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Full Name</label>
                            <input name='fullname' value={formData.fullname} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div style={{ flex: 1 }}>
                            <label>Title</label>
                            <input name='title' value={formData.title} onChange={handleChange} />
                        </div>
                        <div style={{ flex: 1 }} className='profileImage'>
                            <label>Profile Image URL</label>
                            <input name='profileImage' value={formData.profileImage} onChange={handleChange} type="text" />
                        </div>
                    </div>
                    <label>Bio</label>
                    <textarea name='bio' value={formData.bio} onChange={handleChange} rows="4" />
                </div>

                {/* Contact Info */}
                <div className="card">
                    <h3>Contact Information</h3>
                    <div className="flex gap-4 flex-wrap">
                        <div style={{ flex: '1 1 45%' }}>
                            <label>Email</label>
                            <input name="email" value={formData.contact.email} onChange={handleContactChange} />
                        </div>
                        <div style={{ flex: '1 1 45%' }}>
                            <label>LinkedIn URL</label>
                            <input name="linkedin" value={formData.contact.linkedin} onChange={handleContactChange} />
                        </div>
                        <div style={{ flex: '1 1 45%' }}>
                            <label>GitHub URL</label>
                            <input name="github" value={formData.contact.github} onChange={handleContactChange} />
                        </div>
                        <div style={{ flex: '1 1 45%' }}>
                            <label>Personal Website</label>
                            <input name="website" value={formData.contact.website} onChange={handleContactChange} />
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="card">
                    <h3>Skills</h3>
                    {formData.skills.map((skill, index) => (
                        <div key={index} className="dynamic-list-item">
                            <input value={skill} onChange={(e) => handleSkillChange(index, e.target.value)} placeholder="e.g. React.js" />
                            {formData.skills.length > 1 && (
                                <button type="button" className="btn btn-danger" onClick={() => removeSkill(index)}>X</button>
                            )}
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary mt-2" onClick={addSkill}>+ Add Skill</button>
                </div>

                {/* Projects */}
                <div className="card">
                    <h3>Projects</h3>
                    {formData.projects.map((item, index) => (
                        <div key={index} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '15px' }}>
                            <div className="flex justify-between items-center mb-2">
                                <h4>Project {index + 1}</h4>
                                {formData.projects.length > 1 && (
                                    <button type="button" className="btn btn-danger" onClick={() => removeProject(index)}>Remove</button>
                                )}
                            </div>
                            <label>Project Name</label>
                            <input value={item.name} onChange={(e) => handleProjectChange(index, 'name', e.target.value)} required />

                            <label>Technologies (comma separated)</label>
                            <input value={item.technologies} onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)} placeholder="React, Node, MongoDB" />

                            <label>Description</label>
                            <textarea value={item.description} onChange={(e) => handleProjectChange(index, 'description', e.target.value)} rows="2" />

                            <div className="flex gap-4">
                                <div style={{ flex: 1 }}>
                                    <label>GitHub Link</label>
                                    <input value={item.githubLink} onChange={(e) => handleProjectChange(index, 'githubLink', e.target.value)} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label>Live Demo</label>
                                    {/* ✅ Fixed: was 'liveDemo', now matches backend field 'liveDemoLink' */}
                                    <input value={item.liveDemoLink} onChange={(e) => handleProjectChange(index, 'liveDemoLink', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary mt-2" onClick={addProject}>+ Add Project</button>
                </div>

                {/* Experience */}
                <div className="card">
                    <h3>Experience</h3>
                    {formData.experience.map((item, index) => (
                        <div key={index} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '15px' }}>
                            <div className="flex justify-between items-center mb-2">
                                <h4>Experience {index + 1}</h4>
                                {formData.experience.length > 1 && (
                                    <button type="button" className="btn btn-danger" onClick={() => removeExp(index)}>Remove</button>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <div style={{ flex: 1 }}>
                                    <label>Company</label>
                                    <input value={item.company} onChange={(e) => handleExpChange(index, 'company', e.target.value)} required />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label>Role</label>
                                    <input value={item.role} onChange={(e) => handleExpChange(index, 'role', e.target.value)} required />
                                </div>
                            </div>
                            <label>Duration</label>
                            <input value={item.duration} onChange={(e) => handleExpChange(index, 'duration', e.target.value)} placeholder="Jan 2022 - Present" required />

                            <label>Description</label>
                            <textarea value={item.description} onChange={(e) => handleExpChange(index, 'description', e.target.value)} rows="2" />
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary mt-2" onClick={addExp}>+ Add Experience</button>
                </div>

                <button type="submit" className="btn" style={{ backgroundColor: 'var(--primary-color)', color: '#fff', marginTop: '20px' }}>
                    {isEdit ? 'Update Portfolio' : 'Preview & Save Portfolio'}
                </button>
            </form>
        </div>
    );
};

export default PortfolioForm;
