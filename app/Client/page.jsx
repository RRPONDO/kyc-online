import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Client = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }
  return (
    <div className="w-[800px] mx-auto">
      <h1>Compliance Declaration </h1>
      <br/>
      
      <p>I certify that to the best of my knowledge that the information supplied above is true and correct and I represent and warrant that I am duly authorised to disclose this information, including but not limited to any personal data and that such disclosure does not breach any applicable laws and regulations including but not limited to applicable data protection laws or state secrecy laws. I understand that if any of the information given is knowingly false or if I knowingly fail to disclose relevant information, this may constitute grounds for termination of the engagement to provide goods and/or services to Zuva Petroleum
I certify that I will promptly notify Zuva Petroleum in writing of any change in the corporate structure, beneficial owners and/or directors of the organisation and provide Zuva Petroleum with any information necessary to enable Zuva Petroleum to verify such changes. 
Zuva Petroleum (or one of its subsidiaries or affiliates) will collect the personal information of your directors, officers and employees (collectively, you or your) when you enter into a commercial relationship with us. Zuva Petroleum will use personal information to verify the identity of your directors, officers and employees and assess your company information to determine whether we will enter a commercial relationship with you. We may share your personal information with authorised third parties such as our technology providers, agents, consultants, and service providers such as accountants, lawyers and auditors. Zuva Petroleum is committed to protecting your privacy and will deal with your personal information in accordance with our Privacy Policy. 
</p>
    </div>
  );
};

export default Client;
