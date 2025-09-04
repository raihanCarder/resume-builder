import { useState } from "react";
import ErrorMessage from "../errorMsg";

export default function EducationSection({ data, setResumeData }) {
  const [mode, setMode] = useState("view");
  const [editId, setEditId] = useState("");

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
        {mode === "view" && (
          <ViewSchoolingInfo
            data={data}
            deleteEducation={deleteEducation}
            setMode={setMode}
            setEditId={setEditId}
          />
        )}

        {mode === "add" && (
          <AddSchoolingInfo setResumeData={setResumeData} setMode={setMode} />
        )}

        {mode === "edit" && (
          <EditSchoolInfo
            data={data}
            setResumeData={setResumeData}
            editId={editId}
            setMode={setMode}
          />
        )}
      </div>
    </div>
  );
}

function EditSchoolInfo({ data, setResumeData, editId, setMode }) {
  const educationItem = data.schools.find((item) => item.id === editId);
  const [schoolInfo, setSchoolInfo] = useState({
    schoolName: educationItem.name,
    startEnd: educationItem.timeThere,
    program: educationItem.program,
  });
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchoolInfo((prev) => ({ ...prev, [name]: value }));
  };

  const submitChanges = (e) => {
    e.preventDefault();

    if (!schoolInfo.schoolName || !schoolInfo.startEnd || !schoolInfo.program) {
      setShowErrors(true);
      return;
    }

    setResumeData((prev) => ({
      ...prev,
      schools: prev.schools.map((s) =>
        s.id === editId
          ? {
              ...s,
              name: schoolInfo.schoolName,
              timeThere: schoolInfo.startEnd,
              program: schoolInfo.program,
            }
          : s
      ),
    }));

    setMode("view");
  };

  return (
    <>
      <form
        action=""
        method="post"
        className="add-education-form"
        onSubmit={submitChanges}
      >
        <div className="input-design">
          <label htmlFor="edit-name-input">School Name:</label>
          <input
            type="text"
            name="schoolName"
            id="edit-name-input"
            value={schoolInfo.schoolName}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="input-design">
          <label htmlFor="edit-start-end-input">Start-End:</label>
          <input
            type="text"
            name="startEnd"
            id="edit-start-end-input"
            value={schoolInfo.startEnd}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-design">
          <label htmlFor="edit-program-input">Program:</label>
          <input
            type="text"
            name="program"
            id="edit-program-input"
            value={schoolInfo.program}
            onChange={(e) => handleChange(e)}
          />
        </div>

        {!schoolInfo.schoolName && showErrors && (
          <ErrorMessage msg="Error: School name input empty" />
        )}
        {!schoolInfo.startEnd && showErrors && (
          <ErrorMessage msg="Error: Start-End dates input empty" />
        )}
        {!schoolInfo.program && showErrors && (
          <ErrorMessage msg="Error: Program input empty" />
        )}

        <button type="submit">Add Changes</button>
        <button onClick={() => setMode("view")} type="button">
          Exit Edit Mode
        </button>
      </form>
    </>
  );
}

function ViewSchoolingInfo({ data, deleteEducation, setMode, setEditId }) {
  return (
    <>
      {data.schools.map((item) => {
        return (
          <div className="school-info" key={item.id}>
            <div className="school-top-section">
              <p>{item.name}</p>
              <p>{item.timeThere}</p>
            </div>
            <p>{item.program}</p>
            <div className="school-btn-section">
              <button
                onClick={() => {
                  setMode("edit");
                  setEditId(item.id);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteEducation(item.id)}>Delete</button>
            </div>
          </div>
        );
      })}
      <button onClick={() => setMode("add")}>Add Education</button>
    </>
  );
}

function AddSchoolingInfo({ setResumeData, setMode }) {
  const [schoolInfo, setSchoolInfo] = useState({
    schoolName: "",
    startEnd: "",
    program: "",
  });

  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchoolInfo((prev) => ({ ...prev, [name]: value }));
  };

  const addToEducation = (e) => {
    e.preventDefault();

    let errors = 0;

    if (!schoolInfo.schoolName || !schoolInfo.startEnd || !schoolInfo.program)
      errors = 1;

    setShowErrors(true);

    if (errors === 0) {
      setResumeData((prev) => ({
        ...prev,
        schools: [
          ...prev.schools,
          {
            id: crypto.randomUUID(),
            name: schoolInfo.schoolName,
            timeThere: schoolInfo.startEnd,
            program: schoolInfo.program,
          },
        ],
      }));
      setMode("view");
    }
  };

  return (
    <>
      <form
        action=""
        method="post"
        className="add-education-form"
        onSubmit={addToEducation}
        noValidate
      >
        <div className="input-design">
          <label htmlFor="school-name-input">School Name:</label>
          <input
            type="text"
            name="schoolName"
            onChange={(e) => handleChange(e)}
            id="school-name-input"
            placeholder="ex: University of Toronto..."
          />
        </div>

        <div className="input-design">
          <label htmlFor="start-end-input">Start-End:</label>
          <input
            type="text"
            name="startEnd"
            id="start-end-input"
            onChange={(e) => handleChange(e)}
            placeholder="ex: 2024 - Present"
          />
        </div>
        <div className="input-design">
          <label htmlFor="program-input">Program:</label>
          <input
            type="text"
            name="program"
            id="program-input"
            placeholder="ex: Computer Science"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {!schoolInfo.schoolName && showErrors && (
          <ErrorMessage msg="Error: School name input empty" />
        )}
        {!schoolInfo.startEnd && showErrors && (
          <ErrorMessage msg="Error: Start-End dates input empty" />
        )}
        {!schoolInfo.program && showErrors && (
          <ErrorMessage msg="Error: Program input empty" />
        )}

        <button type="submit">Add Education</button>
        <button onClick={() => setMode("view")} type="button">
          Exit
        </button>
      </form>
    </>
  );
}
