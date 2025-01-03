import Link from "next/link";

type Params = Promise<{ projectId: string }>;

const Page = async (props: { params: Params }) => {
  const params = await props.params;
  return (
    <div className="p-3">
      <div className="p-3 border rounded-md flex flex-col gap-3">
        <h1 className="font-bold text-2xl">Project {params.projectId}</h1>
        <p>
          <Link className="text-blue-500 underline" href="/projects">
            Linkで戻る
          </Link>
        </p>
        <p>
          <a className="text-blue-500 underline" href="/projects">
            aで戻る
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
