import { getServerSession } from "next-auth";
import { options } from "/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { redirect } from "next/navigation";
import Application from "./(models)/Application";

const Home = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
    //redirect("/api/auth/signin");
  }

  if (session?.user?.role == "admin1") {
    redirect("/Admin/adone");
  }

  if (session?.user?.role == "admin2") {
    redirect("/Admin/adtwo");
  }

  const email = session?.user?.email;

  const applicantDetails = await Application.findOne({ email: email })
    .lean()
    .exec();

  return (
    <div className="flex flex-row gap-3">
      {/* <h1>Home Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p> */}
      <div className="basis-1/4 p-3">
        <div>
          Current status:{" "}
          {applicantDetails &&
            (applicantDetails.status === null
              ? "Nothing"
              : applicantDetails.status)}
        </div>

        <div className="flex flex-col border border-solid mt-3 p-3 bg-gray-200">
          <h2 className="">Complete registration</h2>
          <div className="ml-5">
            <div>
              <Link
                href="/Client/P1Application"
                className="underline text-success font-normal"
              >
                Private Ltd
              </Link>
            </div>
            <div>
              <Link href="#" className="text-success underline font-normal">
                Public Ltd
              </Link>
            </div>
            <div>
              <Link href="#" className="text-success underline font-normal">
                NGO
              </Link>
            </div>
            <div>
              <Link href="#" className="text-success underline font-normal">
                Parastatal
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="basis-3/4">
        {applicantDetails ? (
          <div className="flex flex-col">
            <div className="flex-row grid grid-cols-2 gap-3 border border-solid border-lime-700 p-3">
              <div className="">
                <table className="table-auto w-full text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th
                        colSpan="2"
                        className="text-lg font-bold border border-gray-300"
                      >
                        Customer / Supplier Information:
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Registered Name
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.regName}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Counterparty
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.counterparty}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Entity Type
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.entityType}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Registration Date
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.regDate}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Registration ID
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.regId}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Registration Address
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.regAddr}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Business Address
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.bsnsAddr}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Telephone
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.telephone}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Website
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.website}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table className="table-auto w-full text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th
                        colSpan="2"
                        className="text-lg font-bold border border-gray-300"
                      >
                        Banking Information:
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Bank Name
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.bankName}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Bank Address
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.bankAddr}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Country
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.country}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Account Number
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.accNum}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Swift Code
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.swiftCode}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        IBAN
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.iban}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="px-4 py-2 font-bold border border-gray-300">
                        Account Beneficiary
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantDetails.accBen}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-5">
              <h2>Your Company Docs:</h2>
              <div className="ml-5">
                <div>
                  <Link
                    href={applicantDetails.certOfInc}
                    target="_blank"
                    className="text-blue-400 underline font-normal"
                  >
                    Certificate of Incorporation
                  </Link>
                </div>
                <div>
                  <Link
                    href={applicantDetails.cr14}
                    target="_blank"
                    className="text-blue-400 underline font-normal"
                  >
                    CR14
                  </Link>
                </div>

                <div>
                  <Link
                    href={applicantDetails.cr6}
                    target="_blank"
                    className="text-blue-400 underline font-normal"
                  >
                    CR6
                  </Link>
                </div>

                <div>
                  <Link
                    href={applicantDetails.maa}
                    target="_blank"
                    className="text-blue-400 underline font-normal"
                  >
                    Memorandum & Articles of Association
                  </Link>
                </div>

                <div>
                  <Link
                    href={applicantDetails.ids}
                    target="_blank"
                    className="text-blue-400 underline font-normal"
                  >
                    IDs of Directors
                  </Link>
                </div>

                <div>
                  <Link
                    href={applicantDetails.proofOfRes}
                    target="_blank"
                    className="text-blue-400 underline font-normal"
                  >
                    Proof of Residence
                  </Link>
                </div>

                <div>
                  <Link
                    href={applicantDetails.taxClearance}
                    target="_blank"
                    className="text-blue-400 underline font-normal"
                  >
                    Tax Clearance
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // <p>Loading applicant details...</p>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <div className="skeleton w-64 h-16 rounded-full shrink-0"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-32"></div>
              </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
