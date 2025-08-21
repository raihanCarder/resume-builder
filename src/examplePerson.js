export const exampleData = {
  name: "Raihan",
  links: [
    { id: crypto.randomUUID(), value: "fakeemail@gmail.com" },
    { id: crypto.randomUUID(), value: "fakeLinkedin.com" },
    { id: crypto.randomUUID(), value: "fakegithub.com" },
  ],
  skills: [
    {
      id: crypto.randomUUID(),
      skill: "DSA pro",
    },
    { id: crypto.randomUUID(), skill: "Coding" },
    { id: crypto.randomUUID(), skill: "Js and React" },
    { id: crypto.randomUUID(), skill: "Problem Solving" },
    { id: crypto.randomUUID(), skill: "Time Management" },
    { id: crypto.randomUUID(), skill: "Data Analysis" },
    { id: crypto.randomUUID(), skill: "Public Speaking" },
    { id: crypto.randomUUID(), skill: "Team Collaboration" },
  ],
  schools: [
    {
      id: crypto.randomUUID(),
      name: "University of Toronto",
      timeThere: "2024-2028",
      program: "Honours bachelor of Science in Computer Science (Co-op)",
    },
  ],
  experience: [
    {
      id: crypto.randomUUID(),
      company: "Labubu Warehouse",
      jobTitle: "Skilled Doomscroller",
      lengthOfEmployment: "2023-2025",
      tasks: [
        { id: crypto.randomUUID(), task: "Labubus" },
        { id: crypto.randomUUID(), task: "New Jeans" },
      ],
    },
    {
      id: crypto.randomUUID(),
      company: "Dubai Choco",
      jobTitle: "Lightning Fast Runner",
      lengthOfEmployment: "2023-2035",
      tasks: [
        { id: crypto.randomUUID(), task: "Labubus" },
        { id: crypto.randomUUID(), task: "New Jeans" },
      ],
    },
  ],
};
