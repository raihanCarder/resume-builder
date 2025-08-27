import GeneralInfoSection from "./editorGenInfo";
import SkillSection from "./editorSkills";
import LinkSection from "./editorLinks";

export default function Editor({ resumeData, setResumeData }) {
  return (
    <div className="editor">
      <GeneralInfoSection data={resumeData} setResumeData={setResumeData} />
      <LinkSection data={resumeData} setResumeData={setResumeData} />
      <SkillSection data={resumeData} setResumeData={setResumeData} />
    </div>
  );
}
