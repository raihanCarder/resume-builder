import GeneralInfoSection from "./editorGenInfo";
import SkillSection from "./editorSkills";
import LinkSection from "./editorLinks";
import EducationSection from "./editorEducation";
import ExperienceSection from "./editorExperience";

export default function Editor({ resumeData, setResumeData }) {
  return (
    <div className="editor">
      <details>
        <summary>General Info</summary>
        <GeneralInfoSection data={resumeData} setResumeData={setResumeData} />
      </details>{" "}
      <details>
        <summary>Link Information</summary>
        <LinkSection data={resumeData} setResumeData={setResumeData} />
      </details>{" "}
      <details>
        <summary>Skills Information</summary>
        <SkillSection data={resumeData} setResumeData={setResumeData} />
      </details>{" "}
      <details>
        <summary>Education Information</summary>
        <EducationSection data={resumeData} setResumeData={setResumeData} />
      </details>{" "}
      <details>
        <summary>Experience Information</summary>
        <ExperienceSection data={resumeData} setResumeData={setResumeData} />
      </details>{" "}
    </div>
  );
}
