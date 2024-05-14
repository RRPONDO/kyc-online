import { getServerSession } from "next-auth";
import { options } from "../../app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { redirect } from "next/navigation";
import Application from "../(models)/Application";

const ClientMember = async () => {
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
          <h2 className="text-red">Complete registration</h2>
          <div className="ml-5">
            <div className="mb-3 mt-3">
              <Link
                href="/Client/P1Application"
                className="underline text-success font-normal"
              >
                Private Limited Company
              </Link>
            </div>
            <div className="mb-3">
              <Link href="/Client/P2Application" className="text-success underline font-normal">
                Public Limited Company
              </Link>
            </div>
            <div className="mb-3">
              <Link href="#" className="text-success underline font-normal">
              Private Business Corporation
              </Link>
            </div>
            <div className="mb-3">
              <Link href="#" className="text-success underline font-normal">
                Parastatal
              </Link>
            </div>
            <div className="mb-3">
              <Link href="#" className="text-success underline font-normal">
                Partnership
              </Link>
            </div>
            <div className="mb-3">
              <Link href="/Client/P3Application" className="text-success underline font-normal">
                Individual
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
              <h2>Your Documents:</h2>
              <div className="ml-5">

                <div>
                  <Link
                    href={applicantDetails.ids}
                    target="_blank"
                    className="text-blue-400 underline font-normal"
                  >
                    IDs of Directors
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
            <div className="skeleton h-[400px] w-full">
            <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="trucks.jpg" className="w-full h-[400px]" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src="lubes.jpg" className="w-full h-[400px]" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="ceo.jpg" className="w-full h-[400px]" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  
</div>
              {/* <p>If you have completed registration and you're on this page, click refresh page to check your application status.</p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientMember;
