'use client'
import { useState } from "react"
import '../globals.css'

export default function Register() {
    const [name, setName] = useState("")
    const [usn, setUsn] = useState("")

    const register_user = async (e) => {
        e.preventDefault()
        if(!name || !usn) {
            alert("Please fill in all fields")
            return;
        }
        try {
            let data = {
                "name": name,
                "usn": usn
            }
            let url = 'http://127.0.0.1:5000/register'
            const response = await fetch(url, {"method": "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)});
            console.log(response);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            setName("")
            setUsn("")

           alert("account created successfully")

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
  
        <div className="bg">
            <div className="con">
                <h1>Register</h1>
                <div className="row">
                    <label>Username:</label>
                    <input type="text" placeholder="   Enter your name.." value={name} onChange={(e) => setName(e.target.value)}  required/>
                </div>
                <div className="row">
                    <label>Usn:</label>
                    <input type="text" placeholder="   Enter your usn.. " value={usn} onChange={(e) => setUsn(e.target.value)} required />
                </div>
                <button onClick={register_user}>Create account</button>
                <p> Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    
     
    )
}