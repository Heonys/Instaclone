"use client";
import ColorButton from "./ui/ColorButton";
import { ClientSafeProvider, signIn } from "next-auth/react";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

const Signin = ({ providers, callbackUrl }: Props) => {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <div key={id}>
          <ColorButton text={`Sign In with ${name}`} onClick={() => signIn(id, { callbackUrl })} size="lg" />
        </div>
      ))}
    </>
  );
};

export default Signin;
