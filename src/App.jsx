import { useState } from "react";
import "./App.css";
import { Fragment } from "react";

function TitleSection({ name, links }) {
  return (
    <>
      <h1>{name}</h1>
      <div className="link-section">
        {links.map((link, index) => (
          <Fragment key={link.id}>
            {index > 0 && <p>|</p>}
            <TitleLink info={link.value} />
          </Fragment>
        ))}
      </div>
      <hr className="line" />
    </>
  );
}

function TitleLink({ info }) {
  if (info === "") return null;

  return (
    <>
      <p>{info}</p>
    </>
  );
}

function SkillSection({ skills }) {
  if (!skills.length) return null;
  return (
    <div>
      <h3 className="sub-title">Summary of Skills</h3>
      <hr className="line" />

      <ul>
        {skills.map((el) => {
          return (
            <li key={el.id} className="skill">
              {el.skill}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function EducationSection({ data }) {
  if (!data.length) return null;
  return (
    <>
      <h3 className="sub-title">Education</h3>
      <hr className="line" />
    </>
  );
}

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

function Resume({ demoPerson }) {
  return (
    <div className="resume">
      <TitleSection name={demoPerson.name} links={demoPerson.links} />
      <SkillSection skills={demoPerson.skills} />
      <EducationSection data={demoPerson.schools} />
    </div>
  );
}

function App() {
  const [resumeData, setResumeData] = useState({
    name: "Raihan",
    links: [
      { id: crypto.randomUUID(), value: "email@" },
      { id: crypto.randomUUID(), value: "FakeLinked" },
      { id: crypto.randomUUID(), value: "Gith" },
    ],
    skills: [
      { id: crypto.randomUUID(), skill: "Labubus" },
      { id: crypto.randomUUID(), skill: "Matcha" },
      { id: crypto.randomUUID(), skill: "Feminism" },
    ],
    schools: [
      {
        id: crypto.randomUUID(),
        name: "Uoft",
        timeThere: "2024-2028",
        program: "CS",
        desc: [],
      },
    ],
  });

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
