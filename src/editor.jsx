import { useState } from "react";

export default function Editor({ resumeData, setResumeData }) {
  return (
    <div className="editor">
      <GeneralInfoSection data={resumeData} setResumeData={setResumeData} />
    </div>
  );
}

function GeneralInfoSection({ data, setResumeData }) {
  const [mode, setMode] = useState("none");

  const handleNameChange = (e) => {
    setResumeData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

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

  const addMode = () => {
    if (mode === "none") {
      setMode("add");
    } else {
      setMode("none");
    }
  };

  return (
    <>
      <h2 className="sub-title">General Information</h2>
      <div className="name-section">
        <p>Name:</p>
        <input type="text" value={data.name} onChange={handleNameChange} />
      </div>
      <h2 className="sub-title">Links:</h2>
      {mode !== "add" ? (
        data.links.map((link) => {
          return (
            <Link
              id={link.id}
              value={link.value}
              onDelete={deleteLink}
              onChange={handleLinkChange}
              mode={mode}
            />
          );
        })
      ) : (
        <p>aa</p>
      )}
      <button disabled={mode === "edit"} onClick={addMode}>
        Add Link
      </button>
      <button onClick={(e) => editMode(e)}>
        {mode === "add" ? "Exit" : "Edit Links"}
      </button>
    </>
  );
}

function Link({ id, value, onDelete, onChange, mode }) {
  return (
    <div key={id} className="editor-link-design">
      {mode === "edit" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
        />
      ) : (
        <p>{value}</p>
      )}
      <button
        className="delete-btn"
        id={id}
        onClick={() => onDelete(id)}
        disabled={mode === "edit"}
      >
        Delete
      </button>
    </div>
  );
}
