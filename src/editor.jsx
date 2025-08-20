import { useState } from "react";

export default function Editor({ resumeData, setResumeData }) {
  return (
    <div className="editor">
      <GeneralInfoSection data={resumeData} setResumeData={setResumeData} />
      <LinkSection data={resumeData} setResumeData={setResumeData} />
    </div>
  );
}

function LinkSection({ data, setResumeData }) {
  const [mode, setMode] = useState("none");
  const [newLink, setNewLink] = useState("");

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
      <button
        disabled={mode === "edit"}
        onClick={mode === "none" ? addMode : (e) => addLink(e)}
      >
        Add Link
      </button>
      <button onClick={(e) => editMode(e)}>
        {mode === "add" ? "Exit" : "Edit Links"}
      </button>
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
      <h2 className="sub-title">General Information</h2>
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
        <p>{value}</p>
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
