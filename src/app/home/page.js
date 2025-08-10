'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import '../globals.css'

export default function Home() {
  const [username, setUsername] = useState("");
  const [usn, setUsn] = useState("");
  const [bg, setBg] = useState("")
  const [userList, setUserList] = useState([])
  const router = useRouter();

  const signout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("usn");
    localStorage.removeItem("getdonars");
    router.push("/login");

  }
  const deleteuser = async () => {
    let usn = localStorage.getItem('usn')
    const url = "http://127.0.0.1:5000/deleteuser";
    try {
      let data = {
        "usn": usn,
      }
      const response = await fetch(url, { "method": "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      alert("User deleted successfully");
      router.push("/login");
    } catch (error) {
      console.error(error.message);
    }
  }
  async function showprofile(USN) {
    localStorage.setItem('otherusn', USN)
    router.push("/profile");
  }

  const fetchusers = async (e) => {
    e.preventDefault();
    if (bg == '') {
      alert("Please select blood group");
      return;
    }
    const url = "http://127.0.0.1:5000/getdonar";
    try {
      let data = {
        "bg": bg,
        "usn": usn

      }

      const response = await fetch(url, { "method": "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

     setUserList(json);
    localStorage.setItem('getdonars', JSON.stringify(json));

    } catch (error) {
      console.error(error.message);

    }

  }

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    const storedUsn = localStorage.getItem("usn");
    const storedDonars = localStorage.getItem('getdonars');

    if (!storedName || !storedUsn) {
      // ❌ Not logged in, redirect to login
      router.push("/login");
    } else {
      setUsername(storedName);
      setUsn(storedUsn);
      if (storedDonars) {
    setUserList(JSON.parse(storedDonars));
}

    }
  }, []);

  return (
    <div className="out">
      <div className="navbar">
        <div className="left">

          <h1>Welcome, {username} 😎!</h1>
          <div className="profile">
            <button onClick={() => router.push('/update')}> 🥴 Update Profile  </button>
            <button onClick={() => router.push('/view')}> 🤪 View Profile  </button>
            <button onClick={deleteuser}>Delete Account 😭</button>
          </div>
        </div>

        <button onClick={signout}>Signout 🫡</button>

      </div>
      <div className="search">
        <label>Select Blood Group : </label>
        <select onChange={(e) => setBg(e.target.value)}>
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
        <button onClick={fetchusers}>Search 🔍</button>
      </div>
   <div className="display">
  <h1>Donor's List</h1>
  <div>
    {userList.length === 0 ? (
      <p style={{ color: "lightgreen", textAlign: "center", width: "90vw", fontSize: 50, fontWeight: "bolder" }}>
        Donors not found
      </p>
    ) : (
      userList.map((user, index) => (
        <div className="card" key={user.usn}>
          <h2><p>Name :</p> {user.name}</h2>
          <h2><p>Gender :</p> {user.gender}</h2>
          <h2><p>Location :</p> {user.location}</h2>
          <button onClick={() => showprofile(user.usn)}>View Profile</button>
        </div>
      ))
    )}
  </div>
</div>

    </div>
  );
}
