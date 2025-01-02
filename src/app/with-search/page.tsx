import { Projects } from "../projects/Projects";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Page = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  console.log(searchParams);
  return <Projects />;
};

export default Page;
