import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const submit = async () => {
    const res = await fetch("http://localhost:8080/api/attendee/register", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ name, email })
    });

    const data = await res.text();
    setToken(data);
  };

  return (
    <div className="p-4">
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <button onClick={submit}>Register</button>
      <p>{token}</p>
    </div>
  );
}

export default Register;
