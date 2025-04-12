import { useRegisterUser } from "../../services/useRegisterUser";
import { useState } from "react";
// import { getFirestore, doc, setDoc } from "firebase/firestore"; // If using Firestore

export const SignUp = () => {
  const { register, loading } = useRegisterUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    register(email, password);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>
    </div>
  );
};
