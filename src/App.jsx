import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TaskSection from "./components/task/TaskSection";

function App() {
  return (
    <>
      <Header></Header>
      <HeroSection></HeroSection>
      <TaskSection></TaskSection>
      <Footer />
    </>
  );
}

export default App;
