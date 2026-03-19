import React from "react";

const PortfolioForm = () => {
  return (
    <div className="container">
      <form className="">
        {/* Personal Info */}
        <div className="card">
          <h3>Personal Information</h3>
          <div className="flex gap-4">
            <div style={{ flex: 1 }}>
              <label>Username</label>
              <input type="text" />
            </div>
            <div style={{ flex: 1 }}>
              <label>Full Name</label>
              <input type="text" />
            </div>
          </div>
          <div className="gap-4">
            <div style={{ flex: 1 }}>
              <label>Professional Title</label>
              <input type="text" />
            </div>
            <div style={{ flex: 1 }}>
              <label>Profile Image URL</label>
              <input type="text" />
            </div>
          </div>
          <label>Bio</label>
          <textarea rows="4" />
        </div>

        {/* Contact Info */}
        <div className="card">
          <h3>Contact Information</h3>
          <div className="flex gap-4 flex-wrap">
            <div style={{ flex: "1 1 45%" }}>
              <label>Email</label>
              <input type="email" />
              <label>LinkedIn URL</label>
              <input type="linkedin" />
              <label>Github URL</label>
              <input type="github" />
              <label>Personal Website</label>
              <input type="website" />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="card">
          <h3>Skills</h3>
          <div>
            <label>Skills</label>
            <input type="text" />
          </div>
        </div>
        {/* Projects */}
        <div className="card">
          <h3>Projects</h3>
          <div>
            <label>Project Name</label>
            <input type="text" />
            <label>Tech Stack</label>
            <input type="text" />
            <label>Project Description</label>
            <textarea rows="3" />
            <div className="flex gap-4">
              <div style={{ flex: 1 }}>
                <label>GitHub URL</label>
                <input type="text" />
              </div>
              <div style={{ flex: 1 }}>
                <label>Live Demo URL</label>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
        {/* Experience */}
        <div className="card">
          <h3>Experience</h3>
          <div>
            <div className="flex gap-4">
              <div style={{ flex: 1 }}>
                <label>Company Name</label>
                <input type="text" />
              </div>
              <div style={{ flex: 1 }}>
                <label>Position</label>
                <input type="text" />
              </div>
            </div>
            <label>Duration</label>
            <input type="text" placeholder="Jan 2022 - Present" />
            <label>Description</label>
            <textarea rows="3" />
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn">
          Save Portfolio
        </button>
      </form>
    </div>
  );
};

export default PortfolioForm;
