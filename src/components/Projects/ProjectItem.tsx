import { Project } from "@/types";
import Link from "next/link";

type Props = {
  project: Project;
};

export const ProjectItem = ({ project }: Props) => {
  const bgColor =
    Number(project.id) % 4 === 0
      ? "bg-orange-300"
      : Number(project.id) % 4 === 1
      ? "bg-orange-50"
      : Number(project.id) % 4 === 2
      ? "bg-orange-100"
      : Number(project.id) % 4 === 3
      ? "bg-orange-200"
      : "bg-orange-50";

  const linkText =
    Number(project.id) % 4 === 1
      ? "<Link>で遷移"
      : Number(project.id) % 4 === 2
      ? "<a>で遷移"
      : Number(project.id) % 4 === 3
      ? "example.comへ遷移"
      : "";

  const innerEl = (
    <li key={project.id} className={`border ${bgColor} p-4 rounded-md`}>
      <h2 className="text-black/80 font-bold">{project.name}</h2>
      <div className="grid grid-cols-2 gap-2 mt-1">
        <p className="text-black/60">{linkText}</p>
        <p className="text-black/60 text-sm text-right">{project.createdAt}</p>
      </div>
    </li>
  );

  return Number(project.id) % 4 === 1 ? (
    <Link href={`/projects/${project.id}`}>{innerEl}</Link>
  ) : Number(project.id) % 4 === 2 ? (
    <a href={`/projects/${project.id}`}>{innerEl}</a>
  ) : Number(project.id) % 4 === 3 ? (
    <a href="https://example.com">{innerEl}</a>
  ) : (
    innerEl
  );
};
