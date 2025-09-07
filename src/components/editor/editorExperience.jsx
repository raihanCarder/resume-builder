import { useState } from "react";
import ErrorMessage from "../errorMsg";

export default function ExperienceSection({ data, setResumeData }) {
  const [mode, setMode] = useState("view");
  const [currId, setCurrId] = useState("");

  return (
    <>
      <h2 className="sub-title">Experience:</h2>
      {mode === "view" && (
        <ViewExperience
          data={data}
          setMode={setMode}
          setResumeData={setResumeData}
          setCurrId={setCurrId}
        />
      )}
      {mode === "add" && (
        <AddExperience setResumeData={setResumeData} setMode={setMode} />
      )}
      {mode === "edit" && (
        <EditExperience
          setResumeData={setResumeData}
          setMode={setMode}
          currId={currId}
          data={data}
        />
      )}
    </>
  );
}

function EditExperience({ setResumeData, setMode, currId, data }) {
  const findExpItem = data.experience.find((item) => item.id === currId);
  const [expItem, setExpItem] = useState({
    jobTitle: findExpItem.jobTitle,
    company: findExpItem.company,
    lengthOfEmployment: findExpItem.lengthOfEmployment,
    tasks: findExpItem.tasks,
  });
  const [viewErrors, setViewErrors] = useState(false);

  const handleExpChanges = (e) => {
    const { name, value } = e.target;
    setExpItem((prev) => ({ ...prev, [name]: value }));
  };

  const addChanges = (e) => {
    e.preventDefault();
    setViewErrors(true);
    if (!expItem.company || !expItem.jobTitle || !expItem.lengthOfEmployment)
      return;
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id !== currId
          ? item
          : {
              ...item,
              jobTitle: expItem.jobTitle,
              company: expItem.company,
              lengthOfEmployment: expItem.lengthOfEmployment,
              tasks: expItem.tasks,
            }
      ),
    }));
    setMode("view");
  };

  return (
    <>
      <form
        action=""
        method="post"
        noValidate
        className="edit-exp-form"
        onSubmit={addChanges}
      >
        <h2 className="sub-title">General Info</h2>

        <div className="edit-exp-input-content">
          <div className="exp-info">
            <label htmlFor="">Job Title:</label>
            <input
              type="text"
              value={expItem.jobTitle}
              name="jobTitle"
              onChange={(e) => handleExpChanges(e)}
            />
          </div>
          <div className="exp-info">
            <label htmlFor="">Company:</label>
            <input
              type="text"
              value={expItem.company}
              name="company"
              onChange={(e) => handleExpChanges(e)}
            />
          </div>
          <div className="exp-info">
            <label htmlFor="">Length of Employment:</label>
            <input
              type="text"
              value={expItem.lengthOfEmployment}
              name="lengthOfEmployment"
              onChange={(e) => handleExpChanges(e)}
            />
          </div>
        </div>

        <TasksSection data={expItem} setData={setExpItem} />
        <DisplayErrorMessages data={expItem} viewErrors={viewErrors} />

        <div className="add-exp-btns">
          <button type="submit">Add Changes</button>
          <button type="button" onClick={() => setMode("view")}>
            Exit
          </button>
        </div>
      </form>
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

  const [viewErrors, setViewErrors] = useState(false);

  const handleExpChanges = (e) => {
    const { name, value } = e.target;
    setExperienceData((prev) => ({ ...prev, [name]: value }));
  };

  const addExpData = (e) => {
    e.preventDefault();
    setViewErrors(true);
    if (
      !experienceData.company ||
      !experienceData.jobTitle ||
      !experienceData.lengthOfEmployment
    )
      return;

    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: crypto.randomUUID(),
          company: experienceData.company,
          jobTitle: experienceData.jobTitle,
          lengthOfEmployment: experienceData.lengthOfEmployment,
          tasks: experienceData.tasks,
        },
      ],
    }));
    setMode("view");
  };

  return (
    <div className="view-experience-container">
      <form
        action=""
        noValidate
        method="post"
        className="add-exp-form"
        onSubmit={addExpData}
      >
        <h2>General info:</h2>
        <div className="exp-info">
          <label htmlFor="exp-input-jobTitle">Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            id="exp-input-jobTitle"
            placeholder="ex: Software Dev"
            onChange={(e) => handleExpChanges(e)}
          />
        </div>
        <div className="exp-info">
          <label htmlFor="exp-input-company">Company Name:</label>
          <input
            type="text"
            name="company"
            id="exp-input-company"
            placeholder="ex: Ubisoft"
            onChange={(e) => handleExpChanges(e)}
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
            onChange={(e) => handleExpChanges(e)}
          />
        </div>
        <TasksSection data={experienceData} setData={setExperienceData} />
        <DisplayErrorMessages data={experienceData} viewErrors={viewErrors} />
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

function DisplayErrorMessages({ data, viewErrors }) {
  return (
    <>
      {viewErrors && !data.company && (
        <ErrorMessage msg="Error: Company name empty " />
      )}

      {viewErrors && !data.jobTitle && (
        <ErrorMessage msg="Error: Job Title empty " />
      )}
      {viewErrors && !data.lengthOfEmployment && (
        <ErrorMessage msg="Error: Length of Employment empty " />
      )}
    </>
  );
}

function TasksSection({ data, setData }) {
  const [taskData, setTaskData] = useState("");

  const handleTaskInputChange = (value) => {
    setTaskData(value);
  };

  const addTask = () => {
    if (!taskData) return;
    setData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { id: crypto.randomUUID(), task: taskData }],
    }));
    setTaskData("");
  };

  const delTask = (id) => {
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((item) => item.id !== id),
    }));
  };

  return (
    <>
      <h2>Tasks:</h2>
      <div className="add-exp-tasks">
        <ul className="task-manager">
          {data.tasks.map((item) => (
            <li key={item.id} className="task add-exp-task-design">
              <div className="task-content">
                <p>{item.task}</p>
                <button type="button" onClick={() => delTask(item.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
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
    </>
  );
}

function ViewExperience({ data, setMode, setResumeData, setCurrId }) {
  return (
    <div className="view-experience-container">
      {data.experience.map((item) => {
        return (
          <ExperienceCard
            data={item}
            key={item.id}
            setResumeData={setResumeData}
            setCurrId={setCurrId}
            setMode={setMode}
          />
        );
      })}
      <button type="button" onClick={() => setMode("add")}>
        Add Experience
      </button>
    </div>
  );
}

function ExperienceCard({ data, setResumeData, setCurrId, setMode }) {
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
        <button
          type="button"
          onClick={() => {
            setMode("edit");
            setCurrId(data.id);
          }}
        >
          Edit
        </button>
        <button type="button" onClick={() => deleteItem(data.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
