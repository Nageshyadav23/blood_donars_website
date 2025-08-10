'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Update() {
    const [dob, setDob] = useState('')
    const [role, setRole] = useState('')
    const [gender, setGender] = useState('')
    const [location, setLocation] = useState('')
    const [contact, setContact] = useState('')
    const [bg, setBg] = useState('')

    const route = useRouter()
    // const storedName = localStorage.getItem("username");
    const storedUsn = localStorage.getItem("usn");

    const updateprofile=async()=>{
        if(!dob||!role||!gender||!location||!bg||contact.length<10){
            alert("Please fill all the fields correctly");
            return;
        }
        const url = "http://127.0.0.1:5000/updateprofile";
  try {
    let data = {
    "usn":storedUsn,
    "dob":dob,
    "gender":gender,
    "role":role,
    "bg":bg,
    "location":location,
    "contact":contact
}
    const response = await fetch(url,{"method":"POST",headers: { "Content-Type": "application/json" },body:JSON.stringify(data)});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    alert("Profile Updated");
    route.push("/home");
  } catch (error) {
    console.error(error.message);
  }

    }
    return (
        <>
            <div className="navbar">
                <button onClick={() => route.push('/home')}><img src="/icons/home.png" alt="Home Icon" style={{ width: 30, height: 30, filter: "invert(1)", cursor: "pointer" }} /></button>
                <h1>Update Profile</h1>
            </div>
            <div className="updateform">
                <div className="up_row">
                    <label>DOB:</label>
                    <input type="text" placeholder=" DD-MM-YYYY" value={dob} onChange={(e) => setDob(e.target.value)} required />
                </div>
                <div className="up_row">
                    <label>Gender:</label>
                    <select onChange={(e)=>setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                 <div className="up_row">
                    <label>Blood Group:</label>
                    <select onChange={(e)=>setBg(e.target.value)}>
                <option value="">select blood group</option>
                <option value="A+ve">A+ve</option>
                <option value="A-ve">A-ve</option>
                 <option value="B+ve">B+ve</option>
                <option value="B-ve">B-ve</option>
                 <option value="AB+ve">AB+ve</option>
                <option value="AB-ve">AB-ve</option>
                 <option value="O+ve">O+ve</option>
                <option value="O-ve">O-ve</option>

            </select>
                </div>
                <div className="up_row">
                    <label>Role:</label>
                    <select onChange={(e)=>setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="donar">Donar</option>
                        <option value="notdonar">Not Donar</option>
                    </select>
                </div>
                  <div className="up_row">
                    <label>Location:</label>
                    <select onChange={(e)=>setLocation(e.target.value)}>
                        <option value="">Select Location</option>
                        <option value="bangalore urban">Bangalore Urban</option>
                        <option value="bangalore rural">Bangalore Rural</option>
                         <option value="other">Other</option>
                    </select>
                </div>
                <div className="up_row">
                    <label>Phone Number:</label>
                    <input type="text" placeholder="Enter Phone Number" value={contact} onChange={(e)=>setContact(e.target.value)}/>
                </div>
                <button onClick={updateprofile}>Update Changes</button>

            </div>
        </>
    )
}