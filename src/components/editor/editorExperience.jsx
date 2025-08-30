import { useState } from "react";

export default function ExperienceSection({ data, setResumeData }) {
  const [mode, setMode] = useState("view");
  return (
    <>
      <h2 className="sub-title">Experience:</h2>
      {mode === "view" && (
        <ViewExperience
          data={data}
          setMode={setMode}
          setResumeData={setResumeData}
        />
      )}
      {mode === "add" && (
        <AddExperience setResumeData={setResumeData} setMode={setMode} />
      )}
    </>
  );
}

function AddExperience({ setResumeData, setMode }) {
  return (
    <>
      <form action="" noValidate method="post">
        <button type="submit">Add Experience</button>
        <button type="button" onClick={() => setMode("view")}>
          Exit
        </button>
      </form>
    </>
  );
}

function ViewExperience({ data, setMode, setResumeData }) {
  return (
    <div className="view-experience-container">
      {data.experience.map((item) => {
        return (
          <ExperienceCard
            data={item}
            key={item.id}
            setResumeData={setResumeData}
          />
        );
      })}
      <button type="button" onClick={() => setMode("add")}>
        Add Experience
      </button>
    </div>
  );
}

function ExperienceCard({ data, setResumeData }) {
  const deleteItem = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="experience-card">
      <p className="bold">{data.jobTitle}</p>
      <p>{data.lengthOfEmployment}</p>
      <p>{data.company}</p>
      <ul className="list-padding">
        {data.tasks.map((item) => {
          return (
            <li key={item.id} className="task">
              {item.task}
            </li>
          );
        })}
      </ul>
      <div className="bottom-of-experience-card">
        <button type="button">Edit</button>
        <button type="button" onClick={() => deleteItem(data.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
