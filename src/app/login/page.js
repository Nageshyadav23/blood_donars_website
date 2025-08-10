'use client'
import { useState } from "react"
import { useRouter } from "next/navigation";
import '../globals.css'

export default function Login() {
    const [name, setName] = useState("")
    const [usn, setUsn] = useState("")
    const router=useRouter()

    const login_user = async (e) => {
        e.preventDefault()
        if (!name || !usn) {
            alert("Please fill in both fields");
            return;
        }
        
        try {
            let data = {
                "name": name,
                "usn": usn
            }
            let url = 'http://127.0.0.1:5000/login'
            const response = await fetch(url, { "method": "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
            console.log(response);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
                  const json = await response.json();
   

            setName("")
            setUsn("")
        if (json.status === 200 && response.status===200) {
            alert("Login Success");
            localStorage.setItem("username", data.name);
            localStorage.setItem("usn", data.usn);
            router.push("/home");
        } else {
            alert("Login Failed, invalid credentials");
        }
      
            // console.log(response);
            
        } catch (error) {
            console.error(error.message);
             alert("Login Failed, invalid credentials")
        }
    }


    return (
        <div className="bg">
            <div className="con">
                <h1>Login</h1>
                <div className="row">
                    <label>Username:</label>
                    <input type="text" placeholder="   Enter your name.." value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="row">
                    <label>Usn:</label>
                    <input type="text" placeholder="   Enter your usn.. " value={usn} onChange={(e) => setUsn(e.target.value)} required />
                </div>
                <button onClick={login_user}>Login</button>
                <p> If u don't have an account? <a href="/register">Register</a></p>
            </div>
        </div>
    )
}