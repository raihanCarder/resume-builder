import { Fragment } from "react";

export default function Resume({ demoPerson }) {
  return (
    <div className="resume">
      <TitleSection name={demoPerson.name} links={demoPerson.links} />
      <SkillSection skills={demoPerson.skills} />
      <EducationSection data={demoPerson.schools} />
      <ExperienceSection data={demoPerson.experience} />
    </div>
  );
}

function TitleSection({ name, links }) {
  return (
    <div className="title-section">
      <h1 className="title">{name}</h1>
      <div className="link-section">
        {links.map((link, index) => (
          <Fragment key={link.id}>
            {index > 0 && <p>|</p>}
            <TitleLink info={link.value} />
          </Fragment>
        ))}
      </div>
      <hr className="line" />
    </div>
  );
}

function TitleLink({ info }) {
  if (info === "") return null;

  return (
    <>
      <p className="link-text">{info}</p>
    </>
  );
}

function SkillSection({ skills }) {
  if (!skills.length) return null;
  return (
    <div>
      <h3 className="sub-title">Summary of Skills</h3>
      <hr className="line" />

      <ul className="list-padding">
        {skills.map((el) => {
          return (
            <li key={el.id} className="skill">
              {el.skill}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function EducationSection({ data }) {
  if (!data.length) return null;
  return (
    <>
      <h3 className="sub-title">Education</h3>
      <hr className="line" />
      <ul>
        {data.map((school) => {
          return (
            <div key={school.id} className="school-section">
              <div className="top-school-section">
                <p>{school.program}</p>
                <p>{school.timeThere}</p>
              </div>
              <p>{school.name}</p>
            </div>
          );
        })}
      </ul>
    </>
  );
}

function ExperienceSection({ data }) {
  return (
    <>
      <h3 className="sub-title">Experience</h3>
      <hr className="line" />
      <div className="experience-info">
        {data.map((data) => {
          return (
            <div className="job-information">
              <div className="top-of-job-info">
                <p className="bolded">{data.jobTitle}</p>
                <p>{data.lengthOfEmployment}</p>
              </div>
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
            </div>
          );
        })}
      </div>
    </>
  );
}
