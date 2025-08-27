import { useState } from "react";

export default function SkillSection({ data, setResumeData }) {
  const [mode, setMode] = useState("view");

  const exitMode = (e) => {
    e.preventDefault();
    setMode("view");
  };

  const skillData = data.skills;
  return (
    <div className="editor-skills">
      <h2 className="sub-title">Skills:</h2>
      {mode === "view" && <ViewSkills skills={skillData} setMode={setMode} />}
      {mode === "edit" && (
        <EditSkills
          data={data}
          setResumeData={setResumeData}
          exitMode={exitMode}
        />
      )}
      {mode === "add" && (
        <AddSkill
          setResumeData={setResumeData}
          setMode={setMode}
          exitMode={exitMode}
        />
      )}
    </div>
  );
}

function ViewSkills({ skills, setMode }) {
  return (
    <>
      <div className="editor-skill-section">
        {skills.map((item) => {
          return (
            <>
              <input
                key={item.id}
                type="text"
                value={item.skill}
                className="disabled-link"
                disabled={true}
              />
            </>
          );
        })}
      </div>
      <div className="editor-button-section">
        <button type="button" onClick={() => setMode("add")}>
          Add Skill
        </button>
        <button type="button" onClick={() => setMode("edit")}>
          Edit Skills
        </button>
      </div>
    </>
  );
}

function AddSkill({ setResumeData, setMode, exitMode }) {
  const [skill, setSkill] = useState("");

  const addSkill = (e) => {
    e.preventDefault();

    if (!skill) {
      setMode("view");
      return; // don't add empty skill
    }

    setResumeData((prev) => {
      return {
        ...prev,
        skills: [...prev.skills, { id: crypto.randomUUID(), skill }], // Must make new array to not mutate state
      };
    });
    setMode("view");
  };

  return (
    <>
      <form action="" method="post" className="form-skill">
        <input
          type="text"
          placeholder="Enter new Skill Here"
          onChange={(e) => setSkill(e.target.value)}
          className="input-skill"
        />
        <div className="editor-form-button-section">
          <button
            type="submit"
            onClick={(e) => {
              addSkill(e);
            }}
          >
            Add Skill
          </button>
          <button type="button" onClick={(e) => exitMode(e)}>
            Exit
          </button>
        </div>
      </form>
    </>
  );
}

function EditSkills({ data, setResumeData, exitMode }) {
  const handleSkillChange = (id, newValue) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) =>
        s.id === id ? { ...s, skill: newValue } : s
      ),
    }));
  };

  return (
    <>
      {data.skills.map((item) => {
        return (
          <>
            <input
              key={item.id}
              type="text"
              value={item.skill}
              onChange={(e) => handleSkillChange(item.id, e.target.value)}
            />
          </>
        );
      })}
      <button type="button" onClick={(e) => exitMode(e)}>
        Exit
      </button>
    </>
  );
}
