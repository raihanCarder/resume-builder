export default function Editor({ resumeData, setResumeData }) {
  return (
    <div className="editor">
      <GeneralInfoSection data={resumeData} setResumeData={setResumeData} />
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

  const deleteLink = (id) => {
    setResumeData((prev) => ({
      ...prev,
      links: prev.links.filter((item) => item.id !== id),
    }));
  };

  return (
    <>
      <h2 className="sub-title">General Information</h2>
      <div className="name-section">
        <p>Name:</p>
        <input type="text" value={data.name} onChange={handleNameChange} />
      </div>
      <h2 className="sub-title">Links:</h2>
      {data.links.map((link) => {
        return <Link id={link.id} value={link.value} onDelete={deleteLink} />;
      })}
      <button>Add Link</button>
    </>
  );
}

function Link({ id, value, onDelete }) {
  return (
    <div key={id} className="editor-link-design">
      <p>{value}</p>
      <button className="delete-btn" id={id} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}
