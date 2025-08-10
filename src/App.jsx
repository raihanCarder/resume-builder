import "./App.css";
import { useState } from "react";
import { exampleData } from "./examplePerson";
import Resume from "./resume";

function Editor({ resumeData, setResumeData }) {
  const handleNameChange = (e) => {
    setResumeData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  return (
    <div className="editor">
      <input type="text" value={resumeData.name} onChange={handleNameChange} />
    </div>
  );
}

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
