import { useState } from "react";

function Scan() {
  const [token, setToken] = useState("");

  const scan = async () => {
    const res = await fetch(`http://localhost:8080/api/attendee/scan?token=${token}`, {
      method: "POST"
    });

    alert(await res.text());
  };

  return (
    <div>
      <input onChange={e => setToken(e.target.value)} placeholder="Paste Token" />
      <button onClick={scan}>Scan</button>
    </div>
  );
}

export default Scan;
