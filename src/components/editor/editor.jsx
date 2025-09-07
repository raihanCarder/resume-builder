import GeneralInfoSection from "./editorGenInfo";
import SkillSection from "./editorSkills";
import LinkSection from "./editorLinks";
import EducationSection from "./editorEducation";
import ExperienceSection from "./editorExperience";
import { exampleData } from "../../examplePerson";

export default function Editor({ resumeData, setResumeData }) {
  const clearData = () => {
    setResumeData({
      name: "",
      links: [],
      skills: [],
      schools: [],
      experience: [],
    });
  };

  const showSampleData = () => {
    setResumeData(exampleData);
  };

  return (
    <div className="editor">
      <div className="editor-btn-section">
        <button type="button" onClick={() => showSampleData()}>
          Show Sample Info
        </button>
        <button type="button" onClick={() => clearData()}>
          Clear Sample Info
        </button>
      </div>
      <details>
        <summary>General Info</summary>
        <GeneralInfoSection data={resumeData} setResumeData={setResumeData} />
      </details>
      <details>
        <summary>Link Information</summary>
        <LinkSection data={resumeData} setResumeData={setResumeData} />
      </details>
      <details>
        <summary>Skills Information</summary>
        <SkillSection data={resumeData} setResumeData={setResumeData} />
      </details>
      <details>
        <summary>Education Information</summary>
        <EducationSection data={resumeData} setResumeData={setResumeData} />
      </details>
      <details>
        <summary>Experience Information</summary>
        <ExperienceSection data={resumeData} setResumeData={setResumeData} />
      </details>
    </div>
  );
}
