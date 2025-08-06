// import { useState } from "react";
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
      <ol>{skills.map(() => {})}</ol>
    </div>
  );
}

function Editor() {
  return <div>Editor</div>;
}

function Resume({ demoPerson }) {
  return (
    <div className="resume">
      <TitleSection name={demoPerson.name} links={demoPerson.links} />
      <hr className="line" />
      <SkillSection skills={demoPerson.skills} />
      <hr className="line" />
    </div>
  );
}

function App() {
  // const [resumeData, setResumeData] = useState({});

  const person = {
    name: "Raihan",
    links: [
      { id: crypto.randomUUID(), value: "email@" },
      { id: crypto.randomUUID(), value: "FakeLinked" },
      { id: crypto.randomUUID(), value: "Gith" },
    ],
    skills: ["Cook and Clean", "Loves Matcha", "Loves Beebadoobee"],
  };

  return (
    <>
      <Editor />
      <div className="resume-section">
        <Resume demoPerson={person} />
      </div>
    </>
  );
}

export default App;
