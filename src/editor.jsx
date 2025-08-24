import { useState } from "react";

export default function Editor({ resumeData, setResumeData }) {
  return (
    <div className="editor">
      <GeneralInfoSection data={resumeData} setResumeData={setResumeData} />
      <LinkSection data={resumeData} setResumeData={setResumeData} />
      <SkillSection data={resumeData} setResumeData={setResumeData} />
    </div>
  );
}

function SkillSection({ data, setResumeData }) {
  const [mode, setMode] = useState("view");

  const skillData = data.skills;
  return (
    <div className="editor-skills">
      <h2 className="sub-title">Skills:</h2>
      {mode === "view" && <ViewSkills skills={skillData} setMode={setMode} />}
      {mode === "edit" && <ExitSkills data={data} />}
      {mode === "add" && (
        <AddSkill setResumeData={setResumeData} setMode={setMode} />
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

function AddSkill({ setResumeData, setMode }) {
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

  const exitMode = (e) => {
    e.preventDefault();
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

function ExitSkills({ data }) {}

function LinkSection({ data, setResumeData }) {
  const [mode, setMode] = useState("none");
  const [newLink, setNewLink] = useState("");

  const count = data.links.length;

  const handleLinkChange = (id, newValue) => {
    setResumeData((prev) => ({
      ...prev,
      links: prev.links.map((l) =>
        l.id === id ? { ...l, value: newValue } : l
      ),
    }));
  };

  const deleteLink = (id) => {
    setResumeData((prev) => ({
      ...prev,
      links: prev.links.filter((item) => item.id !== id),
    }));
  };

  const editMode = (e) => {
    if (mode === "none") {
      setMode("edit");
      e.target.textContent = "Stop Editing";
    } else {
      setMode("none");
      e.target.textContent = "Edit Links";
    }
  };

  const addLink = () => {
    const value = newLink.trim();
    if (!value) return;
    setResumeData((prev) => ({
      ...prev,
      links: [...prev.links, { id: crypto.randomUUID(), value }],
    }));
    setNewLink("");
    setMode("none");
  };

  const addMode = () => {
    if (mode === "none") {
      setMode("add");
    } else {
      setMode("none");
    }
  };

  return (
    <div className="editor-link-section">
      <h2 className="sub-title">Links:</h2>
      {mode !== "add" ? (
        data.links.map((link) => {
          return (
            <Link
              key={link.id}
              id={link.id}
              value={link.value}
              onDelete={deleteLink}
              onChange={handleLinkChange}
              mode={mode}
            />
          );
        })
      ) : (
        <input value={newLink} onChange={(e) => setNewLink(e.target.value)} />
      )}
      <div className="editor-links-btns">
        <button
          disabled={mode === "edit" || count >= 3}
          className="link-btns-styling"
          onClick={mode === "none" ? addMode : (e) => addLink(e)}
        >
          {count >= 3 ? "Max Amount of Links" : "Add Link"}
        </button>
        <button onClick={(e) => editMode(e)}>
          {mode === "add" ? "Exit" : "Edit Links"}
        </button>
      </div>
    </div>
  );
}

function GeneralInfoSection({ data, setResumeData }) {
  const handleNameChange = (e) => {
    setResumeData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  return (
    <>
      <h2 className="sub-title">General Information:</h2>
      <div className="name-section">
        <p>Name:</p>
        <input type="text" value={data.name} onChange={handleNameChange} />
      </div>
    </>
  );
}

function Link({ id, value, onDelete, onChange, mode }) {
  return (
    <div className="editor-link-design">
      {mode === "edit" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
        />
      ) : (
        <input
          type="text"
          value={value}
          className="disabled-link"
          disabled={true}
        />
      )}
      <button
        className="delete-btn"
        onClick={() => onDelete(id)}
        disabled={mode === "edit"}
      >
        Delete
      </button>
    </div>
  );
}
