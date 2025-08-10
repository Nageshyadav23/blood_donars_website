'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function Profile() {

    const route = useRouter()
    const[userDetails,setUserDetails]=useState({})

    const handleOtherusn=async()=>{
        localStorage.removeItem('otherusn')
        route.back();
    }

     function calAge(dob){
        let age=0
        const userdob=dob.split('-').map(Number)
        const today = new Date();
        const day =today.getDate()
        const month = today.getMonth() +1 // months are 0-based
        const year = today.getFullYear();
        age+=year-userdob[2]
        if(userdob[1]>month){
            age-=1;
        }
        if(userdob[1]==month && userdob[0]>day){

 age-=1;
        }
        return age;
    }


useEffect(() => {
  const fetchData = async () => {
    
     const url = "http://127.0.0.1:5000/viewprofile";
  try {
    // let usn=(localStorage.getItem('otherusn')=='')?(localStorage.getItem('otherusn')):(localStorage.getItem('usn'))
    let data = {

      "usn":localStorage.getItem('otherusn')
    }
    const response = await fetch(url,{"method":"POST",headers: { "Content-Type": "application/json" },body:JSON.stringify(data)});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    setUserDetails(json)
  } catch (error) {
    console.error(error.message); 
  }
  };

  fetchData();
}, []);

    return (
        <>
            <div className="navbar">
                <button onClick={handleOtherusn}><img src="/icons/home.png" alt="Home Icon" style={{ width: 30, height: 30, filter: "invert(1)", cursor: "pointer" }} /></button>
                <h1>View Profile</h1>
            </div>
            <div className="viewdetails">
                <div className="up_row2">
                    <label>Username : </label>
                    <p>{userDetails.name || '-'}</p>
                     </div>
                    {/* <div className="up_row2">
                        <label>Usn : </label>
                        <p>{userDetails.usn}</p>
                    </div> */}
                    <div className="up_row2">
                        <label>Blood Group : </label>
                        <p>{userDetails.bg || '-'}</p>
                    </div>
                    <div className="up_row2">
                        <label>Age : </label>
                        <p>{userDetails.dob ? calAge(userDetails.dob) : ''}</p>

                    </div>
                    <div className="up_row2">
                        <label>Gender : </label>
                        <p>{userDetails.gender || '-'}</p>
                    </div>
                    {/* <div className="up_row2">
                        <label>Role : </label>
                        <p>{userDetails.role}</p>
                    </div> */}
                    <div className="up_row2">
                        <label>Location : </label>
                        <p>{userDetails.location || '-'}</p>
                    </div>
                    <div className="up_row2">
                        <label>Contact : </label>
                        <p>{userDetails.contact || '-'}</p>
                    </div>
               

            </div></>
    )
}