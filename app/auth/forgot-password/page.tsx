import Link from "next/link";
import { SmtpMessage } from "./smtp-message";
import { FormMessage, Message } from "@/app/components/form-message";
import { Button, Input } from "@nextui-org/react";
import { MailIcon } from "@/app/components/ui/icons";
import { forgotPasswordAction } from "@/app/auth/actions";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/auth/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Input
            label="Email"
            placeholder="Ingresa tu Email"
            type="email"
            variant="bordered"
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Button type="submit" formAction={forgotPasswordAction}>
            Reset Password
          </Button>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
