import PartApplicationForm from "@/app/(components)/PartApplicationForm";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const P6Application = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  return (
    <div className="card bg-base-100 shadow-xl mx-auto p-3">
      <PartApplicationForm />
    </div>
  );
};

export default P6Application;
