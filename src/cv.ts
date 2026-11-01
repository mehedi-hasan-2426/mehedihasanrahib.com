export const experience = [
  {
    when: "Nov 2024 – 2027, ongoing",
    title: "Ausbildung, Fachinformatiker für Anwendungsentwicklung",
    place: "RWE Supply & Trading GmbH, Essen",
    text: "Training in application development, with practical experience in cloud systems and automation.",
  },
];

export const education = [
  {
    when: "Nov 2024 – 2027, ongoing",
    title: "Berufsschule for the Ausbildung",
    place: "Heinz-Nixdorf-Berufskolleg, Essen",
    text: "Software development, databases and SQL, networks, Linux and business studies. IHK exam part 1 passed.",
  },
  {
    when: "2021 – 2023",
    title: "Biotechnology studies, discontinued",
    place: "Hochschule Niederrhein",
    text: "",
  },
  {
    when: "2019 – 2020",
    title: "Studienkolleg",
    place: "Hochschule Anhalt",
    text: "",
  },
];

export type Use = "work" | "projects";

export const skills: { group: string; items: { name: string; use: Use }[] }[] = [
  {
    group: "Development",
    items: [
      { name: "TypeScript", use: "projects" },
      { name: "Python", use: "work" },
      { name: "Go", use: "projects" },
      { name: "Java", use: "projects" },
      { name: "React", use: "projects" },
      { name: "Next.js", use: "projects" },
      { name: "Astro", use: "projects" },
      { name: "Tailwind CSS", use: "projects" },
    ],
  },
  {
    group: "Cloud & Infrastructure",
    items: [
      { name: "AWS", use: "work" },
      { name: "Terraform", use: "work" },
      { name: "Docker", use: "work" },
      { name: "Linux", use: "projects" },
    ],
  },
  {
    group: "Automation & Delivery",
    items: [
      { name: "Azure DevOps", use: "work" },
      { name: "GitHub Actions", use: "projects" },
      { name: "PowerShell", use: "work" },
      { name: "Bash", use: "projects" },
      { name: "Vercel", use: "projects" },
    ],
  },
  {
    group: "Data",
    items: [
      { name: "SQL", use: "projects" },
      { name: "PostgreSQL", use: "projects" },
      { name: "SQLite", use: "projects" },
    ],
  },
  {
    group: "Testing & Quality",
    items: [
      { name: "Playwright", use: "projects" },
      { name: "pytest", use: "projects" },
      { name: "CodeQL", use: "projects" },
    ],
  },
  {
    group: "Monitoring",
    items: [{ name: "Elastic Stack", use: "work" }],
  },
];

export const languages = ["Bengali", "English", "German"];

export const learning = [
  {
    title: "AWS Certified Cloud Practitioner",
    text: "Preparing for the exam with the question trainer I built for it.",
  },
  {
    title: "IHK final exam, part 2",
    text: "Software design, object-oriented programming, SQL and algorithms, due in 2027.",
  },
  {
    title: "Go",
    text: "Writing the BeaconForge service in Go to learn its tooling and testing.",
  },
];
