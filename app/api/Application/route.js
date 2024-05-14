import Application from "@/app/(models)/Application";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req){
    try {
        const {
            email,
    counterparty,
    entityType,
    regName,
    regDate,
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
    status1,
        } = await req.json();
       // const userData = body.formData;

       console.log(email,cr14);

        //Confirm data exists
        if (!email || !regName) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        // check for duplicate emails
        const duplicate = await Application.findOne({ email: email })
            .lean()
            .exec();

        if (duplicate) {
            return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
        }
        
        await Application.create({
            email,
            counterparty,
            entityType,
            regName,
            regDate,
            regCountry,
            regId,
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
            status1,
            
        });
        return NextResponse.json({ message: "User Created." }, { status: 201 });    

    } catch (error) {
        console.log(error)    
        return NextResponse.json({ message: "Error", error }, { status: 500 });    
    }
}