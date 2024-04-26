import React from "react";
import Application from "../../(models)/Application";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";

import Link from "next/link";

export default async function adone() {
  const session = await getServerSession(options);

  const applications = await Application.find({ status: "PENDING_APPROVAL" })
    .lean()
    .exec();

  return (
    <div className="w-full border-separate border border-gray-300">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th colSpan={6} className="text-left text-2xl bg-gray-100 py-4">
              All pending applications:
            </th>
          </tr>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2 border">Name</th>
            <th className="text-left px-4 py-2 border">Date Submitted</th>
            <th className="text-left px-4 py-2 border">Counterparty</th>
            <th className="text-left px-4 py-2 border">Status</th>
            <th className="text-left px-4 py-2 border">Reg Country</th>
            <th className="text-left px-4 py-2 border">#</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              <td className="px-4 py-2 border">{application.regName}</td>
              <td className="px-4 py-2 border">
                {application.createdAt?.toDateString()}
              </td>
              <td className="px-4 py-2 border">{application.counterparty}</td>
              <td className="px-4 py-2 border">{application.status}</td>
              <td className="px-4 py-2 border">{application.regCountry}</td>
              <td className="px-4 py-2 border">
                <Link
                  className="text-info"
                  href={`/Admin/adone/${application._id}`}
                >
                  View details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
