import "./styles/App.css";
import { useState } from "react";
import { exampleData } from "./examplePerson";
import Resume from "./components/resume/resume";
import Editor from "./components/editor/editor";

function App() {
  const [resumeData, setResumeData] = useState(exampleData);

  return (
    <>
      <Editor resumeData={resumeData} setResumeData={setResumeData} />
      <div className="resume-section">
        <Resume demoPerson={resumeData} />
      </div>
    </>
  );
}

export default App;
