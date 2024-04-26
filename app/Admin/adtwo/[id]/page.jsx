import Application from "../../../(models)/Application";
import { notFound } from "next/navigation";

import AppsForm from "../components/AppsForm";

const AppDetailPage = async ({ params }) => {
  //   const application = await prisma.application.find({
  //     where: { id: params.id },
  //   });

  const application = await Application.findOne({ _id: params.id })
    .lean()
    .exec();
  if (!application) {
    notFound();
  }

  //const id = "662623bf8a9d82814780a673";

  return (
    <div>
      <div className="m-5">
        <AppsForm id={application._id.toString()} />
      </div>
      <div className="grid grid-cols-2 gap-4 m-5">
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
                  {application.regName}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Counterparty
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.counterparty}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Entity Type
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.entityType}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Registration Date
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.regDate}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Registration ID
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.regId}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Registration Address
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.regAddr}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Business Address
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.bsnsAddr}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Telephone
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.telephone}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Website
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.website}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="">
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
                  {application.bankName}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Bank Address
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.bankAddr}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Country
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.country}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Account Number
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.accNum}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Swift Code
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.swiftCode}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  IBAN
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.iban}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 font-bold border border-gray-300">
                  Account Beneficiary
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {application.accBen}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="border border-solid m-5">
          <h2>Company Documents:</h2>
          <ul className="list-disc list-inside text-lg font-bold mb-4">
            <li>
              <a
                href={application.certOfInc}
                className="text-blue-500 font-normal"
                target="blank"
              >
                Certificate Of Incorpration
              </a>
            </li>

            <li>
              <a
                href={application.cr14}
                className="text-blue-500 font-normal"
                target="blank"
              >
                CR14
              </a>
            </li>
            <li>
              <a
                href={application.cr6}
                className="text-blue-500 font-normal"
                target="blank"
              >
                CR6
              </a>
            </li>
            <li>
              <a
                href={application.maa}
                className="text-blue-500 font-normal"
                target="blank"
              >
                Memorandum & Articles of Association:
              </a>
            </li>
            <li>
              <a
                href={application.ids}
                className="text-blue-500 font-normal"
                target="blank"
              >
                IDs of Directors
              </a>
            </li>

            <li>
              <a
                href={application.proofOfRes}
                className="text-blue-500 font-normal"
                target="blank"
              >
                Proof of Residence
              </a>
            </li>

            <li>
              <a
                href={application.taxClearance}
                className="text-blue-500 font-normal"
                target="blank"
              >
                Tax Clearance
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppDetailPage;
