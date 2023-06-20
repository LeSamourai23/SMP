import { User, Tickets, Worker } from "../models/Schema.js"
import { sendToken } from "../utils/sendToken.js"
import { sendMail } from "../utils/sendMail.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const profile = req.files.profile.tempFilePath;

        let user = await User.findOne({ email })

        if (user) {
            return res  
                .status(400)
                .json({success: false, message: "User Already Exists"})
        }

        const myCloud= await cloudinary.v2.uploader.upload(profile, {folder: "SMP"})

        fs.rmSync("./tmp", { recursive: true})

        const otp= Math.floor(Math.random() * 1000000)

        user = await User.create({
            name, 
            email, 
            password, 
            profile:{
              public_id: myCloud.public_id,
              url: myCloud.secure_url
            }, 
            otp, 
            otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000)})

        await sendMail(email, "Verify your account", `Your OTP is ${otp}`) 

        sendToken(res, user, 201, "An E-Mail with an OTP has been sent to your address, please verify your account");
    } catch(error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const verify = async (req, res) => {
    try {
      const otp = Number(req.body.otp);
  
      const user = await User.findById(req.user._id);
  
      if (user.otp !== otp || user.otp_expiry < Date.now()) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid OTP or has been Expired" });
      }
  
      user.verified = true;
      user.otp = null;
      user.otp_expiry = null;
  
      await user.save();
  
      sendToken(res, user, 200, "Account Verified");
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res  
                .status(400)
                .json({success: false, message: "Invalid Email"})
        }

        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            return res  
                .status(400)
                .json({success: false, message: "Invalid Email or Password"})
        }

        sendToken(res, user, 201, "Login Successful");

    } catch(error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    try{

        res
            .status(200)
            .cookie("token", null, {
                expires: new Date(Date.now())
            })
            .json({ success: true, message: "Logged Out Successfully" })

    } catch(error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const addTicket = async (req, res) => {
  try {
    // Find the user in the database
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Extract the ticket details from the request body
    const {
      user_feedback,
      user_rating,
      ticket_type,
      ticket_id,
      workorder_no,
      ticket_no,
      created_on,
      ticket_status,
      ticket_status_id,
      ResolutionTime,
      ClosureDate,
      CriticalityNumber,
      cc_ratings,
      cc_remarks,
      job_Card_Image,
      defective_Piece_Image,
      defective_Piece_Text,
      workorder_schedule_time_slot,
      TargetTimeSlot,
      LanguageId,
      TargetCompletionDate,
      rescheduleRequest,
      serviceType,
      ticketInstallationList,
      events: {
        service_type_no,
        event_id,
        ticket_no: event_ticket_no,
        service_job_no,
        assign_to,
        assign_to_level,
        created_on: event_created_on,
        created_by,
        created_by_name,
        event_type_id,
        complaint_no,
        workorder_schedule_date,
        event_description,
        secondary_tech_name,
        event_type: {
          event_type_id: event_event_type_id,
          edit_event_types,
        },
        assign_to_level_detail,
      },
      smr,
      warranty_status,
      modified_on,
      ticket_closure_option_id,
      assign_to: ticket_assign_to,
      remarks,
      technicians,
      machine: {
        MACHINENO,
        PRODUCT,
        VIN_KEY,
        MODEL_NAME,
        SERIES,
        ENGINENO,
        VARIANT_CODE,
        HMR,
        STATE,
        DISTRICT,
        TEHSIL,
        MachineVillage,
      },
      assign_to_dealer: [
        {
          dealer_id,
          DealerType,
          DealerCode,
          DealerName,
          parent_id,
          ActivationDate,
          IsAgreementSigned,
          IsActive,
          Dealer_CreatedDate,
          Dealer_CreatedBy,
          Dealer_ModifiedDate,
          Dealer_ModifiedBy,
          Dealer_PAN_NO,
          ERP_VehPriceListCode,
          ERP_PartsPriceListCode,
          ERP_VehSplPriceListCode,
          DepotPlantCode,
          DealerLocation,
          GST_NO,
          IsDMSActivated,
          DealerCategoryForBI,
          CIN_NO,
          DealerPhoneNo,
          DealerEmail,
          ERPCBUCode,
          CDSF_Flag,
          Loan_Agreement_Date,
        },
      ],
      customer: {
        first_name,
        last_name,
        middle_name,
        state,
        district,
        tehsil,
        Customer_Key,
        ContactTitle,
        Mobile_No,
        Alternate_No,
        Last_Verification_Date,
        Email_id,
        FatherName,
        Qualification,
        village,
        Pin_ID,
        Address_1,
        Address_2,
        Address_3,
        Geo_Location,
        DateOfBirth,
        Division,
        CustomerGroup_Id,
        CustomerCategory_Id,
        Usage_Type_id,
        Bill_To_Organization,
        Organization_Name,
        IsMarried,
        GSTIN,
        PAN_NO,
        AADHAR_CARD_NO,
        DL_NO,
        ANNUAL_INCOME,
        Occupation,
        Other_Occupation,
        Fleet_Size,
        LAND_SIZE,
        Is_Privilege_Customer,
        ERPCustomerCode,
        IsApplicable,
        OEMRefID,
        Group_Type_Id,
        Group_Name,
        CreatedBy,
        CreatedDate,
        ModifiedBy,
        ModifiedDate,
        CreatedBy_bu_id,
        Effective_Start_Date,
        Effective_End_Date,
        LoadID,
        LoadDate,
        Customer_Sub_Type,
      },
      serviceJobs,
      complaints,
      __typename,
    } = req.body;

    // Create a new ticket object
    const newTicket = new Tickets({
      user_feedback,
      user_rating,
      ticket_type,
      ticket_id,
      workorder_no,
      ticket_no,
      created_on,
      ticket_status,
      ticket_status_id,
      ResolutionTime,
      ClosureDate,
      CriticalityNumber,
      cc_ratings,
      cc_remarks,
      job_Card_Image,
      defective_Piece_Image,
      defective_Piece_Text,
      workorder_schedule_time_slot,
      TargetTimeSlot,
      LanguageId,
      TargetCompletionDate,
      rescheduleRequest,
      serviceType,
      ticketInstallationList,
      events: {
        service_type_no,
        event_id,
        event_ticket_no,
        service_job_no,
        assign_to,
        assign_to_level,
        event_created_on,
        created_by,
        created_by_name,
        event_type_id,
        complaint_no,
        workorder_schedule_date,
        event_description,
        secondary_tech_name,
        event_type: {
          edit_event_types,
        },
        assign_to_level_detail,
      },
      smr,
      warranty_status,
      modified_on,
      ticket_closure_option_id,
      assign_to: ticket_assign_to,
      remarks,
      technicians,
      machine: {
        MACHINENO,
        PRODUCT,
        VIN_KEY,
        MODEL_NAME,
        SERIES,
        ENGINENO,
        VARIANT_CODE,
        HMR,
        STATE,
        DISTRICT,
        TEHSIL,
        MachineVillage,
      },
      assign_to_dealer: [
        {
          dealer_id,
          DealerType,
          DealerCode,
          DealerName,
          parent_id,
          ActivationDate,
          IsAgreementSigned,
          IsActive,
          CreatedDate,
          CreatedBy,
          ModifiedDate,
          ModifiedBy,
          PAN_NO,
          ERP_VehPriceListCode,
          ERP_PartsPriceListCode,
          ERP_VehSplPriceListCode,
          DepotPlantCode,
          DealerLocation,
          GST_NO,
          IsDMSActivated,
          DealerCategoryForBI,
          CIN_NO,
          DealerPhoneNo,
          DealerEmail,
          ERPCBUCode,
          CDSF_Flag,
          Loan_Agreement_Date,
        },
      ],
      customer: {
        first_name,
        last_name,
        middle_name,
        state,
        district,
        tehsil,
        Customer_Key,
        ContactTitle,
        Mobile_No,
        Alternate_No,
        Last_Verification_Date,
        Email_id,
        FatherName,
        Qualification,
        village,
        Pin_ID,
        Address_1,
        Address_2,
        Address_3,
        Geo_Location,
        DateOfBirth,
        Division,
        CustomerGroup_Id,
        CustomerCategory_Id,
        Usage_Type_id,
        Bill_To_Organization,
        Organization_Name,
        IsMarried,
        GSTIN,
        PAN_NO,
        AADHAR_CARD_NO,
        DL_NO,
        ANNUAL_INCOME,
        Occupation,
        Other_Occupation,
        Fleet_Size,
        LAND_SIZE,
        Is_Privilege_Customer,
        ERPCustomerCode,
        IsApplicable,
        OEMRefID,
        Group_Type_Id,
        Group_Name,
        CreatedBy,
        CreatedDate,
        ModifiedBy,
        ModifiedDate,
        CreatedBy_bu_id,
        Effective_Start_Date,
        Effective_End_Date,
        LoadID,
        LoadDate,
        Customer_Sub_Type,
      },
      serviceJobs,
      complaints,
      __typename,
    });

    // Add the new ticket to the user's tickets array
    user.tickets.push(newTicket);

    // Save the updated user object
    await user.save();

    res.status(200).json({ success: true, message: 'Ticket added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const removeTicket = async (req, res) => {
    try {
      const ticketNumber = req.body.ticketNumber; // Assuming the ticket number is passed in the request body

      // Find the user in the database
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Find the index of the ticket to be removed
      const ticketIndex = user.tickets.findIndex(ticket => ticket.ticketNumber === ticketNumber);

      console.log(ticketIndex)
  
      if (ticketIndex === -1) {
        return res.status(404).json({ error: 'Ticket not found.' });
      }
  
      // Remove the ticket from the user's tickets array
      user.tickets.splice(ticketIndex, 1);
  
      // Save the updated user object
      await user.save();
  
      res.status(200).json({ success: true, message: 'Ticket removed successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { ticketNumber, step } = req.body;

    // Find the user in the database
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Find the ticket to be updated
    const ticket = user.tickets.find(ticket => ticket.ticket.ticketNumber === ticketNumber);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found.' });
    }

    // Update the ticket status based on the step
    switch (step) {
      case 1:
        ticket.currentStatus.status = 'Allocated';
        break;
      case 2:
        ticket.currentStatus.status = 'Converted to Workorder';
        break;
      case 3:
        ticket.currentStatus.status = 'Escalated';
        break;
      case 4:
        ticket.currentStatus.status = 'Completed';
        ticket.currentStatus.Open = 'Closed';
        break;
      default:
        return res.status(400).json({ error: 'Invalid step' });
    }

    // Save the updated user object
    await user.save();

    res.status(200).json({ success: true, message: 'Ticket status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendFeedback = async (req, res) => {
  const { userId, feedbackData } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const feedbackData = {
      message,
      rating
    }

    user.feedback.push(feedbackData);

    await user.save();

    return res.status(200).json({ message: 'Feedback added successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const reportBug = async (req, res) => {
  const { userId, reportData } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.report.push(reportData);

    await user.save();

    return res.status(200).json({ message: 'Report added successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const addManpower = async (req, res) => {
  try {
      // Find the user in the database
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
    // Extract the worker details from the request body
    const {
      name,
      post,
      phoneNumber,
      employeeID,
      branch
      //photo
    } = req.body;

    // Create a new worker object
    const newWorker = new Worker({
      name,
      post,
      phoneNumber, 
      employeeID,
      branch
    });

      // Add the new ticket to the user's tickets array
      user.manpower.push(newWorker);

      // Save the updated user object
      await user.save();
  
      res.status(200).json({ success: true, message: "Worker added successfully" });

  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    sendToken(res, user, 201, `Welcome back ${user.name}`);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name } = req.body;
    const profile = req.files.profile.tempFilePath;

    if (name) user.name = name;
    if (profile) {
       await cloudinary.v2.uploader.destroy(user.profile.public_id);

      const mycloud = await cloudinary.v2.uploader.upload(profile);

      fs.rmSync("./tmp", { recursive: true });

      user.profile = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      }; 
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Profile Updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Old Password" });
    }

    user.password = newPassword;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password Updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    const otp = Math.floor(Math.random() * 1000000);

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const message = `Your OTP for reseting the password ${otp}. If you did not request for this, please ignore this email.`;

    await sendMail(email, "Request for Reseting Password", message);

    res.status(200).json({ success: true, message: `OTP sent to ${email}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordOtp: otp,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Otp Invalid or has been Expired" });
    }
    user.password = newPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordExpiry = null;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: `Password Changed Successfully` });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};






