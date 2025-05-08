import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TaskSection from "./components/task/TaskSection";

function HomePage() {
  return (
    <main className="container  mx-auto mt-10 flex flex-col gap-10 px-4 md:mt-20 md:px-0">
      <h1 className="text-center text-4xl font-bold text-[#F4F5F6] md:text-4xl">
        Task Management
      </h1>
      <p className="text-center text-2xl text-[#A7B2C1] md:text-base">
      Your Personal Task Manager for Seamless Success.
      </p>
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
      <a
        href="/tasks"
        className="rounded-md bg-[#F5BF42] px-3.5 py-2.5 w-2/6 flex justify-center items-center text-md text-black font-semibold"
      >
        Add Task
      </a>
      </div>
    
      <HeroSection />
    </main>
  );
}

function App() {
  return (
    
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TaskSection />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
