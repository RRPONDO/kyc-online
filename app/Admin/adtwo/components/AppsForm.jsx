"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AppsForm = ({ id }) => {
  const router = useRouter();
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/adoneStatus/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });
      //const resData = await res.json();
      if (res.ok) {
        console.log(res);
        console.log("successful");
        //toast.success("Application successfully submitted");
        //put toast notification for successful register:
        router.push("/Admin/adtwo");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      //toast.error("Application already submitted.");

      //setError("Application already submitted.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <h4>Approve or Reject Customer KYC:</h4>
          <select
            defaultValue="option1"
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="option1">Review & update decision:</option>
            <option value="APPROVED">Approve</option>
            <option value="REJECTED">Reject</option>
          </select>

          <button className="btn btn-success items-center w-[100px] text-stone-100">
            <span>Update</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppsForm;
