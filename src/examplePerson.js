export const exampleData = {
  name: "Raihan",
  links: [
    { id: crypto.randomUUID(), value: "email@" },
    { id: crypto.randomUUID(), value: "FakeLinked" },
    { id: crypto.randomUUID(), value: "Gith" },
  ],
  skills: [
    { id: crypto.randomUUID(), skill: "Labubus" },
    { id: crypto.randomUUID(), skill: "Matcha" },
    { id: crypto.randomUUID(), skill: "Feminism" },
  ],
  schools: [
    {
      id: crypto.randomUUID(),
      name: "Uoft",
      timeThere: "2024-2028",
      program: "Honours bachelor of Labubus",
    },
  ],
  experience: [
    {
      id: crypto.randomUUID(),
      company: "Labubu Warehouse",
      jobTitle: "Job",
      lengthOfEmployment: "2023-2035",
      tasks: [
        { id: crypto.randomUUID(), task: "Labubus" },
        { id: crypto.randomUUID(), task: "New Jeans" },
      ],
    },
  ],
};
