import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const applicationSchema = new Schema(
  {
    email: String,
    counterparty: String,
    entityType: String,
    regName: String,
    regDate: String,
    regCountry: String,
    regId: String,
    regAddr: String,
    bsnsAddr: String,
    telephone: String,
    website: String,

    bankName: String,
    bankAddr: String,
    country: String,
    accNum: String,
    swiftCode: String,
    iban: String,
    accBen: String,

    certOfInc: String,
    cr14: String,
    cr6: String,
    maa: String,
    ids: String,
    proofOfRes: String,
    taxClearance: String,

    benOwnership: String,
    resolutionAuth: String,

    status: String,
    status1: String,
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema);

export default Application;