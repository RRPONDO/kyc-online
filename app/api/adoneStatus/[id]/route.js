import { NextRequest, NextResponse } from "next/server";
import Application from "@/app/(models)/Application";

export async function PUT( req,{ params }) {
  const { status } = await req.json();
  const id = params.id;
  //const id = "662623bf8a9d82814780a673";
  console.log(id);
  console.log(status);

//   if (!id) {
//     return res.status(400).json({ message: "Missing 'id' parameter" });
//   }

  try {
    const updatedPost = await Application.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    )
    .lean()
    .exec();

    // if (!updatedPost) {
    //   return res.status(404).json({ message: "Application not found" });
    // }
console.log(updatedPost);
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating post" });
    //return res.status(500).json({ message: "Error updating application" });
  }
}
