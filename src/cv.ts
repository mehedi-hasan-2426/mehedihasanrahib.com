export const experience = [
  {
    when: "Nov 2024 – 2027, ongoing",
    title: "Ausbildung, Fachinformatiker für Anwendungsentwicklung",
    place: "RWE Supply & Trading GmbH, Essen",
    text: "Apprenticeship in a cloud platform team. Terraform on AWS, Azure DevOps pipelines, security scanning with TFLint and Trivy, IAM policies, monitoring and patch automation with Python and PowerShell.",
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
    group: "Cloud & Infrastructure",
    items: [
      { name: "AWS", use: "work" },
      { name: "Terraform", use: "work" },
      { name: "Docker", use: "work" },
      { name: "Vercel", use: "projects" },
    ],
  },
  {
    group: "Automation & CI/CD",
    items: [
      { name: "Azure DevOps", use: "work" },
      { name: "TFLint", use: "work" },
      { name: "Trivy", use: "work" },
      { name: "GitHub Actions", use: "projects" },
      { name: "Playwright", use: "projects" },
    ],
  },
  {
    group: "Programming",
    items: [
      { name: "Python", use: "work" },
      { name: "PowerShell", use: "work" },
      { name: "TypeScript", use: "projects" },
      { name: "Go", use: "projects" },
      { name: "Bash", use: "projects" },
    ],
  },
  {
    group: "Data",
    items: [
      { name: "SQL", use: "projects" },
      { name: "PostgreSQL", use: "projects" },
    ],
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
