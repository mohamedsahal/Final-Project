import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [password, setPassword] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleOnChangePassword() {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!password.oldPassword || !password.newPassword || !password.ConPassword) {
      message.error("Please fill in all the fields");
    } else if (password.oldPassword === password.newPassword) {
      message.error("New password cannot be the same as the old password");
    } else if (password.newPassword !== password.ConPassword) {
      message.error("Passwords do not match");
    } else if (!passwordRegex.test(password.newPassword)) {
      message.error("New password must be at least 8 characters long and contain a symbol and a number");
    } else {
      axios
        .put("http://localhost:8000/auth/change", password, {
          headers: { Authorization: token },
        })
        .then((res) => {
          toast.success(res.data.message);
          navigate("/Dashboard");
        })
        .catch((e) => {
          message.error(e.response.data.message);
        });
    }
  }

  return (
    <div className="m-auto w-1/2 mt-5 p-5 bg-white rounded-md">
      <h2 className="mb-8 text-center font-bold text-2xl">Change Password</h2>
      <p className="text-gray-500 pb-4">
        Make sure your new password is a strong password. Do mix letters, numbers, and special characters
      </p>
      <div className="my-2 space-y-2">
        <span>Enter old password</span>
        <input
          className="w-full border p-2 rounded-md"
          type="password"
          onChange={(e) =>
            setPassword({ ...password, oldPassword: e.target.value })
          }
        />
      </div>
      <div className="my-2 space-y-2">
        <span>Enter new password</span>
        <input
          className="w-full border p-2 rounded-md"
          type="password"
          onChange={(e) =>
            setPassword({ ...password, newPassword: e.target.value })
          }
        />
      </div>
      <div className="my-2 space-y-2">
        <span>Confirm new password</span>
        <input
          className="w-full border p-2 rounded-md"
          type="password"
          onChange={(e) =>
            setPassword({ ...password, ConPassword: e.target.value })
          }
        />
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="px-5 py-2.5 bg-blue-500 text-white rounded-md"
          onClick={handleOnChangePassword}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
