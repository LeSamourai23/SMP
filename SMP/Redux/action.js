import axios from "axios";

const serverUrl = "https://smp-server.up.railway.app/api/v1";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${serverUrl}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFailure", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${serverUrl}/me`);
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFailure", payload: error.response.data.message });
  }
};

export const loadTicket = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${serverUrl}/me`);

    dispatch(refreshTicketDetails(data.user.ticket));

  } catch (error) {

  }
}

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    await axios.get(`${serverUrl}/logout`);
    dispatch({ type: "logoutSuccess" });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};

export const sendFeedback = () => async (dispatch) => {
  try{
    dispatch({type : "sendFeedback"})

    const { data } = await axios.post(
      `${serverUrl}/sendFeedback`,
      {

      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "sendFeedbackSuccess", payload: data.message });
  } catch (error) {
    
  }
}

export const addManpower = (FirstName, MiddleName, LastName, designation, MobileNumber, branch, EmpCode) => async (dispatch) => {
  try {
    dispatch({ type: "addTaskRequest" });

    const { data } = await axios.post(
      `${serverUrl}/addManpower`,
      {
        EmpCode,
        FirstName,
        MiddleName,
        LastName,
        branch,
        designation,
        MobileNumber
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "addManpowerSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "addManpowerFailure", payload: error.response.data.message });
  }
};


export const deleteManpower = (ECode) => async (dispatch) => {
  try {
    dispatch({ type: "deleteManpowerRequest" });

    const { data } = await axios.delete(
      `${serverUrl}/deleteManpower`,
      {
        ECode
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "deleteTaskSuccess", payload: data.message });

  } catch (error) {
    dispatch({
      type: "deleteTaskFailure",
      payload: error.response.data.message,
    });
    console.log(error)
  }
};



export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "updatePasswordRequest" });

      const { data } = await axios.put(
        `${serverUrl}/updatepassword`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "updatePasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const verify = (otp) => async (dispatch) => {
  try {
    dispatch({ type: "verificationRequest" });

    const { data } = await axios.post(
      `${serverUrl}/verify`,
      { otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "verificationSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "verificationFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgetPasswordRequest" });

    const { data } = await axios.post(
      `${serverUrl}/forgotPassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "forgetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "forgetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (otp, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordRequest" });

    const { data } = await axios.put(
      `${serverUrl}/resetpassword`,
      { otp, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "resetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};