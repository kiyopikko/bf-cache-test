"use client";

import { getProjects } from "@/actions";
import { ProjectItem } from "@/components/Projects/ProjectItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";

export const Projects = () => {
  const fetchProjects = async ({ pageParam }: { pageParam: number }) => {
    const result = await getProjects(pageParam);
    window.history.replaceState({}, "", window.location.toString());
    return result;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["actions-projects"],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 5,
  });

  return status === "pending" ? (
    <p className="text-center py-4">Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <ul className="flex flex-col gap-3 p-3">
        {data.pages.map((group, i) => (
          <Fragment key={i}>
            {group.projects.map(
              (project: { id: string; name: string; createdAt: string }) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  parentPath="actions-projects"
                />
              )
            )}
          </Fragment>
        ))}
      </ul>
      <div className="flex justify-center px-3 pb-10">
        <button
          className="bg-zinc-800 text-white py-4 rounded-md w-full font-bold"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div className="text-center py-4">
        {isFetching && !isFetchingNextPage ? "Fetching..." : null}
      </div>
    </>
  );
};
