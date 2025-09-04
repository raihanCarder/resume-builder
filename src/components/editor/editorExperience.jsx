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
  const [experienceData, setExperienceData] = useState({
    company: "",
    jobTitle: "",
    lengthOfEmployment: "",
    tasks: [],
  });

  const [taskData, setTaskData] = useState("");

  const handleTaskInputChange = (value) => {
    setTaskData(value);
  };

  const addTask = () => {
    if (!taskData) return;
    setExperienceData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { id: crypto.randomUUID(), task: taskData }],
    }));
    setTaskData("");
  };

  const delTask = (id) => {
    setExperienceData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="view-experience-container">
      <form action="" noValidate method="post" className="add-exp-form">
        <h2>General info:</h2>
        <div className="exp-info">
          <label htmlFor="exp-input-jobTitle">Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            id="exp-input-jobTitle"
            placeholder="ex: Software Dev"
          />
        </div>
        <div className="exp-info">
          <label htmlFor="exp-input-company">Company Name:</label>
          <input
            type="text"
            name="company"
            id="exp-input-company"
            placeholder="ex: Ubisoft"
          />
        </div>
        <div className="exp-info">
          <label htmlFor="exp-input-len-employmeny">
            Length of Employment:
          </label>
          <input
            type="text"
            name="lengthOfEmployment"
            id="exp-input-len-employmeny"
            placeholder="ex: 2023-2046"
          />
        </div>
        <h2>Tasks:</h2>
        <div className="add-exp-tasks">
          <ul className=" task-manager">
            {experienceData.tasks.map((item) => {
              return (
                <div key={item.id} className="task-content">
                  <li className="task add-exp-task-design">{item.task}</li>
                  <button type="button" onClick={() => delTask(item.id)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </ul>
          <div className="add-task-input-btn">
            <input
              type="text"
              onChange={(e) => handleTaskInputChange(e.target.value)}
              value={taskData}
              placeholder="Task Information Here"
            />
            <button type="button" onClick={() => addTask()}>
              Add Task
            </button>
          </div>
        </div>

        <div className="add-exp-btns">
          <button type="submit">Add Experience</button>
          <button type="button" onClick={() => setMode("view")}>
            Exit
          </button>
        </div>
      </form>
    </div>
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
