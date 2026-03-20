import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" py-16 px-4 mx-auto relative animate-fade-in text-center max-w-225">
      <section className="py-16 px-4 mx-auto relative animate-fade-in text-center max-w-225 ">
        <div className="hero-content">
          <h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-extrabold leading-[1.15] mb-6 tracking-[-0.03em] ">
            Build Your
            <span className="inline-block bg-linear-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent pb-1">
              Developer Portfolio
            </span>{" "}
            in Minutes
          </h1>
          <p className="text-[clamp(1.1rem,2vw,1.4rem)] text-[(--secondary-color)] mb-12 max-w-175 mx-auto leading-[1.6]">
            Showcase your skills, projects, and experience with a stunning,
            customizable, and instantly deployable portfolio designed
            specifically for software engineers.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/create" className="btn btn-primary-glow btn-lg">
              Get Started for Free
            </Link>
            <a href="#features" className="btn btn-outline btn-lg">
              Explore Features
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;