import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
 
const Update = () => {
    const {id} = useParams();
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        age: "",
        phonenumber: "",
        occupation: "",
    });
 
    const location = useLocation();
    const navigate = useNavigate();
 
    const userId = location.pathname.split("/")[2];
 
    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
 
    useEffect(() => {
        axios.get("http://localhost:3001/userdetails/"+id)
        .then(res => {
            console.log(res)
            setUser(res.data[0]);
        })
        .catch(err => console.log(err))
    }, []);
 
    const handleClick = async (e) => {
        e.preventDefault();
 
        try {
            await axios.put(`http://localhost:3001/users/${userId}`, user);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
 
  return (
    <div className="container">
    <h1>Edit Form</h1>
        <form>
                <div className="mb-3 mt-3">
                    <label className="form-label"> ID:</label>
                    <input type="text" className="form-control" id="id" placeholder="Enter Your id" name="id" value={id} disabled />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label"> First Name:</label>
                    <input type="text" className="form-control" placeholder="Enter Your First Name" name="firstname" value={user.firstname} onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Last Name:</label>
                    <input type="text" className="form-control" id="lastname" placeholder="Enter your Last Name" name="lastname" value={user.lastname}  onChange={handleChange}/>
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Age:</label>
                    <input type="text" className="form-control" id="age" placeholder="Enter your Age" name="age" maxlength="2" value={user.age} onChange={handleChange}/>
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Phone Number:</label>
                    <input type="text" className="form-control" id="phonenumber" placeholder="Enter your phone number" name="phonenumber" maxlength="10" value={user.phonenumber} onChange={handleChange}/>
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Occupation:</label>
                    <input type="text" className="form-control" id="occupation" placeholder="Enter your occupation" name="occupation" value={user.occupation} onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Update</button>
        </form>
        <div className='container d-flex justify-content-center'>
            <Link to="/">See all users</Link>
        </div>
    </div>
  );
};
 
export default Update;