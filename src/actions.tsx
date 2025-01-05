"use server";

export const getProjects = async (cursor: number) => {
  const now = new Date().toLocaleTimeString();

  const projects = Array.from({ length: 4 }, (_, i) => ({
    id: `${Number(cursor) * 4 + i + 1}`,
    name: `Project ${Number(cursor) * 4 + i + 1}`,
    createdAt: now,
  }));

  return {
    projects,
    nextCursor: Number(cursor) + 1,
  };
};
