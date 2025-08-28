export default function EducationSection({ data, setResumeData }) {
  const deleteEducation = (id) => {
    setResumeData((prev) => ({
      ...prev,
      schools: prev.schools.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="editor-education-section">
      <h2 className="sub-title">Education:</h2>
      <div className="editor-education-content">
        {data.schools.map((item) => {
          return (
            <div className="school-info" key={item.id}>
              <div className="school-top-section">
                <p>{item.name}</p>
                <p>{item.timeThere}</p>
              </div>
              <p>{item.program}</p>
              <div className="school-btn-section">
                <button>Edit</button>
                <button onClick={() => deleteEducation(item.id)}>Delete</button>
              </div>
            </div>
          );
        })}
        <button>Add Education</button>
      </div>
    </div>
  );
}
