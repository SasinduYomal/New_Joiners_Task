import React from 'react';

const PortfolioForm = () => {
  return (
    <form className="space-y-8 max-w-225 mx-auto p-6">

      {/* Personal Info */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-8 space-y-4 shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Username" className="w-full border px-3 py-2 rounded-lg"/>
          <input type="text" placeholder="Full Name" className="w-full border px-3 py-2 rounded-lg"/>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Professional Title" className="w-full border px-3 py-2 rounded-lg"/>
          <input type="text" placeholder="Profile Image URL" className="w-full border px-3 py-2 rounded-lg"/>
        </div>
        <textarea placeholder="Bio" rows="4" className="w-full border px-3 py-2 rounded-lg"/>
      </div>

      {/* Contact Info */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-8 space-y-4 shadow-md flex flex-wrap gap-4">
        <input type="email" placeholder="Email" className="flex-1 min-w-50 border px-3 py-2 rounded-lg"/>
        <input type="text" placeholder="LinkedIn URL" className="flex-1 min-w-50 border px-3 py-2 rounded-lg"/>
        <input type="text" placeholder="GitHub URL" className="flex-1 min-w-50 border px-3 py-2 rounded-lg"/>
        <input type="text" placeholder="Personal Website" className="flex-1 min-w-50 border px-3 py-2 rounded-lg"/>
      </div>

      {/* Skills */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-8 space-y-4 shadow-md">
        <input type="text" placeholder="Skill 1" className="w-full border px-3 py-2 rounded-lg"/>
        <input type="text" placeholder="Skill 2" className="w-full border px-3 py-2 rounded-lg"/>
      </div>

      {/* Submit */}
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-lg">
        Save Portfolio
      </button>
    </form>
  );
};

export default PortfolioForm;