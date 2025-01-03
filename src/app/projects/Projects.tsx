"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment } from "react";

export const Projects = () => {
  const fetchProjects = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch("/api/projects?cursor=" + pageParam);
    window.history.replaceState({}, "", window.location.toString());
    return res.json();
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
    queryKey: ["projects"],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 5,
  });

  console.log(data?.pages);

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <a href="https://example.com">example.com</a>
      <a href="/next">ハードナビゲーション</a>
      <Link href="/next">ソフトナビゲーション</Link>
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map(
            (project: { id: string; name: string; createdAt: string }) => (
              <p key={project.id}>
                {project.name}:{project.createdAt}
              </p>
            )
          )}
        </Fragment>
      ))}
      <div>
        <button
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
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
