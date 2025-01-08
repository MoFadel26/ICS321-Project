import { Span } from "next/dist/trace";
import { LoginForm } from "../UI/login-from";

export default async function LoginPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center -my-[5%]  items-center   p-5">
        <div className="flex flex-col items-center border border-cyan-400  rounded p-5">
          <span className="font-bold text-2xl m-10 ">
            Welcome to our system:
          </span>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
