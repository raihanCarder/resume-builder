import "./styles/App.css";
import { useState } from "react";
import { exampleData } from "./examplePerson";
import Resume from "./resume";
import Editor from "./editor";

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
