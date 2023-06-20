import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const TicketSchema = new mongoose.Schema({

  "user_feedback": String,
  "user_rating": Number,
  "ticket_type": String,
  "ticket_id": Number,
  "workorder_no": Number,
  "ticket_no": String,
  "created_on": String,
  "ticket_status": String,
  "ticket_status_id": Number,
  "ResolutionTime": String,
  "ClosureDate": String,
  "CriticalityNumber": String,
  "cc_ratings": String,   //
  "cc_remarks": String,
  "job_Card_Image": String,   //
  "defective_Piece_Image": String,
  "defective_Piece_Text": String,
  "workorder_schedule_time_slot": String,
  "TargetTimeSlot": Number,
  "LanguageId": Number,
  "TargetCompletionDate": String,
  "rescheduleRequest": Array,
  "serviceType": Array,
  "ticketInstallationList": Array,
  "events":
  {
    "service_type_no": Number,
    "event_id": Number,
    "ticket_no": String,
    "service_job_no": String,
    "assign_to": String,
    "assign_to_level": Number,
    "created_on": String,
    "created_by": String,
    "created_by_name": String,
    "event_type_id": Number,
    "complaint_no": Number,  //
    "workorder_schedule_date": String,
    "event_description": String,
    "secondary_tech_name": String,
    "event_type": {
      "event_type_id": Number,
      "edit_event_types": String,
    },
    "assign_to_level_detail": String,
  },

  "smr": String,
  "warranty_status": Number,
  "modified_on": String,
  "ticket_closure_option_id": Number,
  "assign_to": String,
  "remarks": String,
  "technicians": Array,
  "machine": {
    "MACHINENO": String,
    "PRODUCT": String,
    "VIN_KEY": Number,
    "MODEL_NAME": String,
    "SERIES": String,
    "ENGINENO": String,
    "VARIANT_CODE": String,
    "HMR": Number,
    "STATE": String,
    "DISTRICT": String,
    "TEHSIL": String,
    "village": String,
  },

  "assign_to_dealer": [
    {
      "dealer_id": Number,
      "DealerType": String,
      "DealerCode": String,
      "DealerName": String,
      "parent_id": Number,
      "ActivationDate": Number,
      "IsAgreementSigned": String,
      "IsActive": String,
      "CreatedDate": String,
      "CreatedBy": String,
      "ModifiedDate": String,
      "ModifiedBy": String,
      "PAN_NO": String,
      "ERP_VehPriceListCode": String,
      "ERP_PartsPriceListCode": String,
      "ERP_VehSplPriceListCode": String,
      "DepotPlantCode": String,
      "DealerLocation": String,
      "GST_NO": String,
      "IsDMSActivated": String,
      "DealerCategoryForBI": String,
      "CIN_NO": String,
      "DealerPhoneNo": String,
      "DealerEmail": String,
      "ERPCBUCode": String,
      "CDSF_Flag": String,
      "Loan_Agreement_Date": String,
    }
  ],
  "customer": {
    "first_name": String,
    "last_name": String,
    "middle_name": String,
    "state": String,
    "district": String,
    "tehsil": String,
    "Customer_Key": Number,
    "ContactTitle": String,
    "Mobile_No": String,
    "Alternate_No": String,
    "Last_Verification_Date": String,
    "Email_id": String,
    "FatherName": String,
    "Qualification": String,
    "village": String,
    "Pin_ID": Number,
    "Address_1": String,
    "Address_2": String,
    "Address_3": String,
    "Geo_Location": String,
    "DateOfBirth": String,
    "Division": String,
    "CustomerGroup_Id": Number,
    "CustomerCategory_Id": Number,
    "Usage_Type_id": Number,
    "Bill_To_Organization": String,
    "Organization_Name": String,
    "IsMarried": String,
    "GSTIN": String,
    "PAN_NO": String,
    "AADHAR_CARD_NO": String,
    "DL_NO": String,
    "ANNUAL_INCOME": String,
    "Occupation": String,
    "Other_Occupation": String,
    "Fleet_Size": String,
    "LAND_SIZE": String,
    "Is_Privilege_Customer": String,
    "ERPCustomerCode": String,
    "IsApplicable": String,
    "OEMRefID": Number,
    "Group_Type_Id": Number,
    "Group_Name": String,
    "CreatedBy": String,
    "CreatedDate": String,
    "ModifiedBy": String,
    "ModifiedDate": String,
    "CreatedBy_bu_id": Number,
    "Effective_Start_Date": String,
    "Effective_End_Date": String,
    "LoadID": Number,
    "LoadDate": String,
    "Customer_Sub_Type": Number,
  },
  "serviceJobs": Array,
  "complaints": Array,
}
);

const EmployeeSchema = new mongoose.Schema({
  "SMP_Emp_KEY": Number,
  "branch_Id": Number,
  "EmpCode": String,
  "IsDefultSalesman": String,
  "IsActive": String,
  "emp_designation_Id": Number,
  "emp_department_Id": Number,
  "ContactTitle": String,
  "FirstName": String,
  "MiddleName": String,
  "LastName": String,
  "NickName": String,
  "MobileNumber": String,
  "Email": String,
  "BirthDate": String,
  "Gender": String,
  "BloodGroup": String,
  "MaritalStatus": String,
  "AnnivarsaryDate": String,
  "EmgContactName": String,
  "EmgContactNo": String,
  "Qualification1": String,
  "JoiningDate": String,
  "ConfirmationDate": String,
  "LeavingDate": String,
  "Salary": Number,
  "BankAcNo": String,
  "BankName": String,
  "BankBranch": String,
  "PFNo": String,
  "ESINo": String,
  "PANNo": String,
  "CreatedBy": String,
  "CreatedDate": String,
  "ModifiedBy": String,
  "ModifiedDate": String,
  "Remarks": String,
  "Driving_Licence_No": String,
  "Driving_Licence_Type": String,
  "Driving_Licence_ExpiryDate": String,
  "DrivingFileName": String,
  "DrivingFileType": String,
  "EmpPhotoFileName": String,
  "EmpPhotoFileType": String,
  "EmpAdharCardFileName": String,
  "EmpAdharCardFileType": String,
  "AlternateMobileNo": String,
  "IsAuthForDiscount": String,
  "InsurancePolicyNo": String,
  "twoWhlLicenseNo": String,
  "fourWhlLicenseNo": String,
  "Qualification2": String,
  "OEM_EmpRef_ID": Number,
  "ifsc_code": String,
  "Cancelled_cheque_name": String,
  "Cancelled_cheque_type": String,
  "Pan_details_name": String,
  "Pan_details_type": String,
  "isEmpVerified": String,
  "isEmpBankAccVerified": String,
  "isEmpIfscVerified": String,
  "isEmpBankNameVerified": String,
  "isEmpCancelledChequeImgVerified": String,
  "isEmpPanImgVerified": String,
  "__typename": String    //
});

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
    select: false
  },

  profile: {
    public_id: String,
    url: String
  },

  verified: {
    type: Boolean,
    default: false
  },

  otp: Number,
  otp_expiry: Date,
  resetPasswordOtp: Number,
  resetPasswordOtp: Date,

  feedback: {
    message: String,
    rating: Number
  },

  report: String,

  findAllEmployees: [EmployeeSchema], // Manpower schema as a sub-document
  getTicket: [TicketSchema] // Ticket schema as a sub-document
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  })
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 })

export const User = mongoose.model('User', userSchema)
export const Worker = mongoose.model('Worker', manpowerSchema)
export const Tickets = mongoose.model('Tickets', ticketSchema)
