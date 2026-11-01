export interface Project {
  slug: string;
  name: string;
  summary: string;
  status: string;
  stack: string[];
  repo: string;
  live?: string;
  problem: string;
  built: string[];
  checks: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "sprungbrett-deutsch",
    name: "Sprungbrett Deutsch",
    summary: "German practice for A2 learners. Exercises check answers right away, and guests can try it without an account.",
    status: "Live",
    stack: ["Next.js", "TypeScript", "NextAuth", "Neon Postgres", "Vercel"],
    repo: "https://github.com/mehedi-hasan-2426/sprungbrett-deutsch",
    live: "https://sprung.mehedihasanrahib.de",
    problem: "Learners preparing for A2 need short daily practice with instant feedback, not a pile of PDFs.",
    built: [
      "12 weekly units with vocabulary, grammar, reading, speaking, writing and quizzes",
      "Google sign-in for approved accounts plus a guest mode that keeps progress in the browser",
      "Progress sync to Postgres with session ownership, origin checks and versioned saves",
      "Flashcards with spaced repetition and a writing area with model texts and self-assessment",
    ],
    checks: ["Unit and content tests", "Playwright tests on desktop and phone", "Strict CSP checked on every build", "CodeQL and secret scanning in CI"],
    featured: true,
  },
  {
    slug: "patchpulse",
    name: "PatchPulse",
    summary: "Patch compliance reporting and alerting for an EC2 fleet.",
    status: "Learning project",
    stack: ["Python", "Terraform", "AWS"],
    repo: "https://github.com/mehedi-hasan-2426/patchpulse",
    problem: "Teams patching many servers need one clear view of which hosts are behind and an alert when that matters.",
    built: ["Policy rules for patch compliance", "Reports and an HTML page from fleet data", "Terraform modules and per-environment configuration"],
    checks: ["pytest suite for policy, report and page output", "Runs on synthetic fleet data only"],
  },
  {
    slug: "beaconforge",
    name: "BeaconForge",
    summary: "A local DORA metrics service with durable ingestion and project isolation.",
    status: "Work in progress",
    stack: ["Go", "Python", "Docker"],
    repo: "https://github.com/mehedi-hasan-2426/beaconforge",
    problem: "DORA metrics are only useful when you can see which events they are based on and what is missing.",
    built: ["HTTP API with an OpenAPI description", "Durable event ingestion separated per project", "Explicit evidence coverage so gaps stay visible"],
    checks: ["Go and Python tests", "Container build"],
  },
  {
    slug: "aws-ccp-trainer",
    name: "AWS CCP Trainer",
    summary: "Practice the AWS Certified Cloud Practitioner exam in the browser, with an explanation behind every option.",
    status: "Learning project",
    stack: ["TypeScript", "Web"],
    repo: "https://github.com/mehedi-hasan-2426/aws-ccp-trainer",
    problem: "Knowing why the wrong answers are wrong is what makes exam practice stick.",
    built: ["987 practice questions", "An explanation for every answer option"],
    checks: ["Question data validated in tests"],
  },
  {
    slug: "bash-scripting-lab",
    name: "Bash Scripting Lab",
    summary: "Short Bash lessons, then exercises you run and test yourself.",
    status: "Learning project",
    stack: ["Bash"],
    repo: "https://github.com/mehedi-hasan-2426/bash-scripting-lab",
    problem: "Shell scripting is learned by running scripts, not by reading about them.",
    built: ["Lessons from shell basics upwards", "Six exercises, from a greeting card to a file organizer"],
    checks: ["Each exercise ships with tests"],
  },
];

export const timeline = [
  {
    when: "Nov 2024 – Dec 2026",
    title: "Ausbildung, Fachinformatiker für Anwendungsentwicklung",
    place: "RWE Supply & Trading GmbH, Essen",
    text: "Apprenticeship in a cloud platform team. Terraform on AWS, Azure DevOps pipelines, security scanning with TFLint and Trivy, IAM policies, monitoring and patch automation with Python and PowerShell.",
  },
  {
    when: "2024 – 2026",
    title: "Berufsschule",
    place: "Heinz-Nixdorf-Berufskolleg, Essen",
    text: "Software development, databases and SQL, networks, Linux and business studies. IHK exam part 1 passed; part 2 in progress.",
  },
];
