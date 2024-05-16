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

    if (counterparty === '') {
      alert('Please select a counterparty type.');
      return; // Exit function if not selected
    }
    if (!regName || !regAddr || !bankName) {
      //setError("All fields are required.");
      alert('All fields are required');
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
        router.push("/");
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
                {/* <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  defaultValue={session?.user?.email}
                  readOnly
                  placeholder="Company Email:"
                  className="input input-bordered input-sm w-[92%]"
                /> */}

                <select
                  onChange={(e) => setCounterparty(e.target.value)}
                  className="select select-bordered w-[92%]"
                  required
                >
                  <option disabled selected>
                    Type of Counterparty:
                  </option>
                  <option value="Supplier">Supplier</option>
                  <option value="Customer">Customer</option>
                </select>

                {/* <select
                  onChange={(e) => setEntity(e.target.value)}
                  className="select select-bordered w-[92%]"
                >
                  <option disabled selected>
                    Entity Type:
                  </option>
                  <option value="private_company">Private Ltd</option>
                  <option value="public_company">Public Ltd</option>
                  <option value="NGO">NGO</option>
                  <option value="parastatal">Parastatal</option>
                  <option value="Government">Government</option>
                </select> */}
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

                {/* <select
                  onChange={(e) => setRegCountry(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option disabled selected>
                    Country of Registration
                  </option>
                  <option value="Zimbabwe">Zimbabwe</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malawi">USA</option>
                  <option value="UK">UK</option>
                </select> */}

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

                {/* <select
                  onChange={(e) => setCountry(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option disabled selected>
                    Country
                  </option>
                  <option value="Zimbabwe">Zimbabwe</option>
                  <option value="South Africa">South Africa</option>
                  <option value="UK">UK</option>
                </select> */}

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
                <p>Certificate of Incorporation:</p>
                {certOfInc && (
                  <button
                    onClick={() => setCertOfInc("")}
                    type="button"
                    className="flex space-x-2  bg-slate-400 rounded-md shadow text-slate-50  py-2 px-4 w-[200px]"
                  >
                    <Pencil className="w-5 h-5" />
                    <span>Change File</span>
                  </button>
                )}
                {certOfInc ? (
                  <a target="_blank" href={certOfInc}>
                    <FileText />
                    <span>View File</span>
                  </a>
                ) : (
                  <UploadButton
                    endpoint="fileUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res[0].url);
                      setCertOfInc(res[0].url);
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

            <div>
              <div className="grid flex-grow card bg-base-300 rounded-box my-3 py-4 px-4">
                <p>CR14:</p>
                {cr14 && (
                  <button
                    onClick={() => setCr14("")}
                    type="button"
                    className="flex space-x-2  bg-slate-400 rounded-md shadow text-slate-50  py-2 px-4 w-[200px]"
                  >
                    <Pencil className="w-5 h-5" />
                    <span>Change File</span>
                  </button>
                )}
                {cr14 ? (
                  <a target="_blank" href={cr14}>
                    <FileText />
                    <span>View File</span>
                  </a>
                ) : (
                  <UploadButton
                    endpoint="fileUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res[0].url);
                      setCr14(res[0].url);
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

            <div>
              <div className="grid flex-grow card bg-base-300 rounded-box my-3 py-4 px-4">
                <p>CR6:</p>
                {cr6 && (
                  <button
                    onClick={() => setCr6("")}
                    type="button"
                    className="flex space-x-2  bg-slate-400 rounded-md shadow text-slate-50  py-2 px-4 w-[200px]"
                  >
                    <Pencil className="w-5 h-5" />
                    <span>Change File</span>
                  </button>
                )}
                {cr6 ? (
                  <a target="_blank" href={cr6}>
                    <FileText />
                    <span>View File</span>
                  </a>
                ) : (
                  <UploadButton
                    endpoint="fileUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res[0].url);
                      setCr6(res[0].url);
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

            <div>
              <div className="grid flex-grow card bg-base-300 rounded-box my-3 py-4 px-4">
                <p>Memorandum & Articles:</p>
                {maa && (
                  <button
                    onClick={() => setMaa("")}
                    type="button"
                    className="flex space-x-2  bg-slate-400 rounded-md shadow text-slate-50  py-2 px-4 w-[200px]"
                  >
                    <Pencil className="w-5 h-5" />
                    <span>Change File</span>
                  </button>
                )}
                {maa ? (
                  <a target="_blank" href={maa}>
                    <FileText />
                    <span>View File</span>
                  </a>
                ) : (
                  <UploadButton
                    endpoint="fileUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res[0].url);
                      setMaa(res[0].url);
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
            <div>
              <div className="grid flex-grow card bg-base-300 rounded-box my-3 py-4 px-4">
                <p>Proof of Residence:</p>
                {proofOfRes && (
                  <button
                    onClick={() => setProofRes("")}
                    type="button"
                    className="flex space-x-2  bg-slate-400 rounded-md shadow text-slate-50  py-2 px-4 w-[200px]"
                  >
                    <Pencil className="w-5 h-5" />
                    <span>Change File</span>
                  </button>
                )}
                {proofOfRes ? (
                  <a target="_blank" href={proofOfRes}>
                    <FileText />
                    <span>View File</span>
                  </a>
                ) : (
                  <UploadButton
                    endpoint="fileUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res[0].url);
                      setProofRes(res[0].url);
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

            <div>
              <div className="grid flex-grow card bg-base-300 rounded-box my-3 py-4 px-4">
                <p>Tax Clearance:</p>
                {taxClearance && (
                  <button
                    onClick={() => setTaxClearance("")}
                    type="button"
                    className="flex space-x-2  bg-slate-400 rounded-md shadow text-slate-50  py-2 px-4 w-[200px]"
                  >
                    <Pencil className="w-5 h-5" />
                    <span>Change File</span>
                  </button>
                )}
                {taxClearance ? (
                  <a target="_blank" href={taxClearance}>
                    <FileText />
                    <span>View File</span>
                  </a>
                ) : (
                  <UploadButton
                    endpoint="fileUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res[0].url);
                      setTaxClearance(res[0].url);
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

            <div>
              <div className="grid flex-grow card bg-base-300 rounded-box my-3 py-4 px-4">
                <p>Beneficiary Ownership:</p>
                {benOwnership && (
                  <button
                    onClick={() => setBenOwnership("")}
                    type="button"
                    className="flex space-x-2  bg-slate-400 rounded-md shadow text-slate-50  py-2 px-4 w-[200px]"
                  >
                    <Pencil className="w-5 h-5" />
                    <span>Change File</span>
                  </button>
                )}
                {benOwnership ? (
                  <a target="_blank" href={benOwnership}>
                    <FileText />
                    <span>View File</span>
                  </a>
                ) : (
                  <UploadButton
                    endpoint="fileUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res[0].url);
                      setBenOwnership(res[0].url);
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

          <div class="flex items-center mb-4">
            <input id="terms" type="checkbox" value="" required className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="terms" class="flex items-center text-sm font-medium text-gray-900 dark:text-gray-300 ml-2">
            I agree to the &nbsp;
            <a href="/Client" target="_blank" class="text-blue-600 underline hover:text-blue-800">Compliance Declaration</a>.
          </label>
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
