import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operators/authAPI';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const [formData, setFormData] = useSelector({
        password:"",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading} = useSelector ((state) => state.auth);

    const {password, confirmPassword} = formData;

    const handleChange = (e) => {
        setFormData( (prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at[-1];
        dispatch(resetPassword(password, confirmPassword, token));
    }

  return (
    <div>
      {
        loading ? (
            <div>
                Loading...
            </div>
        ) : (
            <div>
                <h1>Choose New Password</h1>
                <p>Almost done. Enter your new password and youre all set.</p>
                <form onSubmit={handleOnSubmit}>
                    <label>
                        <p>New Password</p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                        <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {
                                showPassword ? <AiOutlineEye fontSize={24} /> : <AiOutlineEyeInvisible fontSize={24} />
                            }
                        </span>
                    </label>
                    <label>
                        <p>Confirm New Password</p>
                        <input
                            required
                            type={confirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                        <span
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {
                                showConfirmPassword ? <AiOutlineEye fontSize={24} /> : <AiOutlineEyeInvisible fontSize={24} />
                            }
                        </span>
                    </label>
                    <button type="submit">Reset Password</button>
                </form>

                <div>
                    <Link to="/login">
                        <p>Back to Login</p>
                    </Link>
                </div>

            </div>
        )
      }
    </div>
  )
}

export default UpdatePassword
