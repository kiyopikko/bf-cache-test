import Link from "next/link";

const Page = () => {
  return (
    <div>
      次のページ
      <Link href="/projects">ページ遷移</Link>
    </div>
  );
};

export default Page;
