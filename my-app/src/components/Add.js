import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
const Add = () => {
  const [users, setUser] = useState({
    firstname: "",
    lastname: "",
    age: "",
    phonenumber: "",
    occupation: "",
  });
 
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/create", users);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <div className="container">
    <h2 className='w-100 d-flex justify-content-center p-3'>Add New User</h2>
        <div className='row'>
            <div className='col-md-12'>
                <h3>Add Your Detail</h3>
                <form>
                    <div className="mb-3 mt-3">
                        <label className="form-label"> First Name:</label>
                        <input type="text" className="form-control" id="firstname" placeholder="Enter Your First Name" name="firstname" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label"> Last Name:</label>
                        <input type="text" className="form-control" id="lastname" placeholder="Enter Your Last Name" name="lastname" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Age</label>
                        <input type="text" className="form-control" id="age" placeholder="Enter your age" name="age" maxlength="2" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phonenumber" placeholder="Enter your phone number" name="phonenumber" maxlength="10" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Occupation</label>
                        <input type="text" className="form-control" id="occupation" placeholder="Enter your occupation" name="occupation" onChange={handleChange} required/>
                    </div>
                      
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add User</button>
                    <Link to="/">See all users</Link>
                </form>
            </div>
        </div>
</div>
  );
};
 
export default Add;