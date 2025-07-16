/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Link from "next/link";
import InterviewGeneratorForm from "@/components/interview-generator-form";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <div className="w-full flex gap-5 items-center">
        <Link
          href="/"
          className="!w-fit !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !font-bold !px-5 cursor-pointer"
        >
          Home
        </Link>

        <h3>Interview generation</h3>
      </div>

      <InterviewGeneratorForm userId={user?.id!} />
    </>
  );
};

export default Page;
