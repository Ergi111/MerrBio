import React, { BaseSyntheticEvent } from "react";
import { useSignIn } from "../../services/useSignIn";

export const SignIn = () => {
  const { signIn } = useSignIn();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    signIn(email, password)
      .then((user) => {
        console.log("User signed in:", user);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};
