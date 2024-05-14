"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { FileText, Pencil, Plus, SquarePlus } from "lucide-react";
//import toast, { Toaster } from "react-hot-toast";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function PvtApplicationForm() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Client/P1Application");
    },
  });

  //const [email, setEmail] = useState("");
  const [counterparty, setCounterparty] = useState("");
  //const [entityType, setEntity] = useState("");

  const [regName, setRegName] = useState("");
  const [regDate, setRegDate] = useState("");
  const [regId, setRegId] = useState("");
  const [regCountry, setRegCountry] = useState("");
  const [regAddr, setRegAddress] = useState("");
  const [bsnsAddr, setBsnsAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [website, setWebsite] = useState("");

  const [bankName, setBankName] = useState("");
  const [bankAddr, setBankAddress] = useState("");
  const [country, setCountry] = useState("");
  const [accNum, setAccNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [iban, setIban] = useState("");
  const [accBen, setAccountBeneficiary] = useState("");

  const [certOfInc, setCertOfInc] = useState("");
  const [cr14, setCr14] = useState("");
  const [cr6, setCr6] = useState("");
  const [maa, setMaa] = useState("");
  const [ids, setIds] = useState("");
  const [proofOfRes, setProofRes] = useState("");
  const [taxClearance, setTaxClearance] = useState("");

  const[benOwnership,setBenOwnership] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!regName || !regAddr || !counterparty || !bankName) {
      setError("All fields are required.");
    }

    try {
      const formattedRegDate = new Date(regDate).toISOString();
      const status = "PENDING_APPROVAL";
      const email = session?.user?.email;
      const entityType = "private_company";

      const res = await fetch("../api/Application", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          counterparty,
          entityType,
          regName,
          regDate: formattedRegDate,
          regId,
          regCountry,
          regAddr,
          bsnsAddr,
          telephone,
          website,

          bankName,
          bankAddr,
          country,
          accNum,
          swiftCode,
          iban,
          accBen,

          certOfInc,
          cr14,
          cr6,
          maa,
          ids,
          proofOfRes,
          taxClearance,

          benOwnership,

          status,
        }),
      });
      //const resData = await res.json();
      if (res.ok) {
        //toast.success("Application successfully submitted");
        //put toast notification for successful register:
        router.refresh();
        router.push("/ClientMember");
      }
    } catch (error) {
      //toast.error("Invalid Entry");
      console.log(error);

      //setError("Application already submitted.");
    }
  };

  return (
    <>
      {/* <Toaster /> */}
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <h1 className="my-5 p-2 border border-slate-400">
              Fill in all the required fields below.
            </h1>
          </div>

          <div className="flex flex-col w-full lg:flex-row">
            <div className="grid flex-grow card rounded-box mb-3">
              <div className="flex flex-col gap-3 my-5 mx-2">
               
                <select
                  onChange={(e) => setCounterparty(e.target.value)}
                  className="select select-bordered w-[92%]"
                  required
                >
                 
                  <option value="Supplier">Supplier</option>
                  <option value="Customer">Customer</option>
                </select>
                
              </div>
            </div>

            <div className="grid flex-grow card   rounded-box mb-3">
              <div className="flex flex-col gap-3 my-5 mx-5"></div>
            </div>
          </div>

          <div className="flex flex-col w-full lg:flex-row">
            <div className="grid flex-grow card bg-base-300 rounded-box">
              <div className="flex flex-col gap-3 my-5 mx-5">
                <h1>Customer or Supplier Information:</h1>
                <label for="regName">Registered Name:</label>
                <input
                  onChange={(e) => setRegName(e.target.value)}
                  type="text"
                  id="regName"
                  placeholder="Registered Name"
                  className="input input-bordered input-sm w-full"
                />
                <label for="regDate">Registered Date:</label>
                <input
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setRegDate(date.toISOString());
                  }}
                  type="date"
                  id="regDate"
                  placeholder="Registered Date"
                  className="input input-bordered input-sm w-full"
                />

                <input
                  onChange={(e) => setRegId(e.target.value)}
                  type="text"
                  placeholder="Registration ID"
                  className="input input-bordered input-sm w-full "
                />

                <input
                  onChange={(e) => setRegCountry(e.target.value)}
                  type="text"
                  placeholder="Country of Registration"
                  className="input input-bordered input-sm w-full "
                />

                <input
                  onChange={(e) => setRegAddress(e.target.value)}
                  type="text"
                  placeholder="Registered Address"
                  className="input input-bordered input-sm w-full"
                />
                <input
                  onChange={(e) => setBsnsAddress(e.target.value)}
                  type="text"
                  placeholder="Business Address"
                  className="input input-bordered input-sm w-full"
                />
                <input
                  onChange={(e) => setTelephone(e.target.value)}
                  type="text"
                  placeholder="Telephone Number"
                  className="input input-bordered input-sm w-full"
                />
                <input
                  onChange={(e) => setWebsite(e.target.value)}
                  type="text"
                  placeholder="Website Address"
                  className="input input-bordered input-sm w-full"
                />
              </div>
            </div>

            <div className="divider lg:divider-horizontal"></div>

            <div className="grid flex-grow card bg-base-300 rounded-box">
              <div className="flex flex-col gap-3 my-5 mx-5">
                <h1>Bank Information:</h1>
                <input
                  onChange={(e) => setBankName(e.target.value)}
                  type="text"
                  placeholder="Bank Name"
                  className="input input-bordered input-sm w-full"
                />
                <input
                  onChange={(e) => setBankAddress(e.target.value)}
                  type="text"
                  placeholder="Bank Address"
                  className="input input-bordered input-sm w-full"
                />

                <input
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  placeholder="Country"
                  className="input input-bordered input-sm w-full "
                />

                <input
                  onChange={(e) => setAccNumber(e.target.value)}
                  type="text"
                  placeholder="Account number"
                  className="input input-bordered input-sm w-full"
                />
                <input
                  onChange={(e) => setSwiftCode(e.target.value)}
                  type="text"
                  placeholder="Swift code"
                  className="input input-bordered input-sm w-full"
                />
                <input
                  onChange={(e) => setIban(e.target.value)}
                  type="text"
                  placeholder="IBAN"
                  className="input input-bordered input-sm w-full"
                />
                <input
                  onChange={(e) => setAccountBeneficiary(e.target.value)}
                  type="text"
                  placeholder="Account Beneficiary"
                  className="input input-bordered input-sm w-full"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">


            <div>
              <div className="grid flex-grow card bg-base-300 rounded-box my-3 py-4 px-4">
                <p>IDs of Directors:</p>
                {ids && (
                  <button
                    onClick={() => setIds("")}
                    type="button"
                    className="flex space-x-2  bg-slate-400 rounded-md shadow text-slate-50  py-2 px-4 w-[200px]"
                  >
                    <Pencil className="w-5 h-5" />
                    <span>Change File</span>
                  </button>
                )}
                {ids ? (
                  <a target="_blank" href={ids}>
                    <FileText />
                    <span>View File</span>
                  </a>
                ) : (
                  <UploadButton
                    endpoint="fileUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res[0].url);
                      setIds(res[0].url);
                      //alert("Upload Completed");
                    }}
                    onUploadError={(error) => {
                      // Do something with the error.
                      console.log(`ERROR! ${error.message}`);
                    }}
                  />
                )}
              </div>
            </div>

            

          </div>

          <div className="bg-base-300 rounded-box my-3 w-[150px] py-4 px-4">
            <button className="btn btn-success text-white">
              <SquarePlus />
              Submit
            </button>
          </div>
          {error && <div className="p-2 text-red-500 font-bold">{error}</div>}
        </div>
      </form>
    </>
  );
}
