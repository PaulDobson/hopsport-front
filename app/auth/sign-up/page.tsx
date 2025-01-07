"use client";

import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  FingerPrintIcon,
  MailIcon,
} from "@/app/components/ui/icons";
import { Button, Input, Link, Image, Spacer } from "@nextui-org/react";
import { useEffect, useState, useTransition } from "react";
import NextImage from "next/image";
import {
  createUser,
  handleGoogleSignUp,
  verifyInvitation,
} from "@/app/auth/actions";
import { useRouter } from "next/navigation";

const motivationalPhrases = [
  "Plataforma para gestionar tus entrenaientos y potenciar tu academia",
  "Transform your body, transform your life!",
  "Sweat, smile, and repeat!",
  "Your only limit is you.",
  "Make yourself proud.",
  "Strong body, strong mind!",
];

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmPasswordVisible, setConfirmPasswordIsVisible] =
    useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [invitationId, setInvitationId] = useState(-1);
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();

  const toggleVisibilityConfirmPassword = () =>
    setConfirmPasswordIsVisible(!isConfirmPasswordVisible);

  const handleVerifyInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        const result = await verifyInvitation(email, accessCode);
        console.log("Invitation verification result", result);
        if (result.success) {
          setInvitationId(result.id);
          setStep(2);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Error al verificar la invitación");
      }
    });
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    setError("");

    if (!isFormValid()) {
      setError("Las contraseñas no coinciden");
      return;
    }
    startTransition(async () => {
      try {
        console.log("Creating user with email", invitationId);
        const result = await createUser(email, password, invitationId);

        if (result.success) {
          router.push("/sport");
        } else {
          setError(result.message);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.error("Error al crear el usuario", error);
        setError("Error al crear el usuario" + JSON.stringify(error));
      } finally {
        setIsLoading(false);
      }
    });
  };

  const handleSingInWithGoogle = async () => {
    startTransition(async () => {
      try {
        const url = await handleGoogleSignUp();
        if (url) {
          router.push(url);
        }
      } catch (error) {
        console.error("Error during Google sign up:", error);
      }
    });
  };

  const validatePassword = (value: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
    setPassword(value);
  };

  const validateConfirmPassword = (value: string) => {
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const isFormValid = () => {
    if (
      !passwordError &&
      !confirmPasswordError &&
      password === confirmPassword
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side - Gradient background with motivational phrases */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 to-blue-900 p-8 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-8">Bienvenido a Hops Sport </h1>
        <div className="space-y-4">
          {motivationalPhrases.map((phrase, index) => (
            <p key={index} className="text-xl italic">
              &quot;{phrase}&quot;
            </p>
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
        {/* Company Logo */}
        <div className="mb-8">
          <Image
            src="/hops_logo.png"
            alt="Hops sport logo"
            width={260}
            height={200}
            className="object-contain"
            isBlurred
            as={NextImage}
            radius="md"
            priority
          />
        </div>
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Crea tu cuenta</h2>
          <span className="text-gray-600">
            {step === 1
              ? "Ingrese su email y código de acceso"
              : "Cree su contraseña"}
          </span>
          {step === 1 ? (
            <form className="space-y-4" onSubmit={handleVerifyInvitation}>
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />

              <Input
                label="Codigo de invitación"
                placeholder="Ingresa tu código de acceso"
                type="text"
                variant="bordered"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                required
                endContent={
                  <FingerPrintIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />

              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isPending}
              >
                {isPending ? "Verificando..." : "Verificar Invitación"}
              </Button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleCreateUser}>
              <Input
                label="Password"
                placeholder="Crea tu contraseña"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                required
                color={passwordError ? "danger" : "default"}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
              <Input
                label="Confirm Password"
                placeholder="Confirma tu contraseña"
                type={isConfirmPasswordVisible ? "text" : "password"}
                variant="bordered"
                value={confirmPassword}
                onChange={(e) => validateConfirmPassword(e.target.value)}
                required
                errorMessage={confirmPasswordError}
                color={confirmPasswordError ? "danger" : "default"}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibilityConfirmPassword}
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />

              <Button
                color="primary"
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Registrar
              </Button>
            </form>
          )}

          <Spacer y={1.5} />
          {error && (
            <p className="flex text-danger w-full justify-center">{error}</p>
          )}
          {signUpError && (
            <p className="mt-4 w-full justify-start text-center text-red-500">
              {signUpError}
            </p>
          )}

          {/* Social Login */}
          {step === 2 ? (
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                {/*}
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-900 px-4 text-gray-400">
                    O registrate con tus redes sociales
                  </span>
                </div>
                */}
              </div>
              {/*}
              <div className="mt-6 flex justify-center gap-4">
                <div className="mt-6 flex justify-center gap-4">
                  <Button
                    onPress={handleSingInWithGoogle}
                    className="flex items-center gap-2 rounded-full border border-gray-700 px-6 py-2 transition-colors hover:bg-gray-800"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                      />
                      <path
                        fill="#34A853"
                        d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                      />
                    </svg>
                    <span className="text-sm text-gray-300">Google</span>
                  </Button>
                  <button className="flex items-center gap-2 rounded-full border border-gray-700 px-6 py-2 transition-colors hover:bg-gray-800">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm text-gray-300">Facebook</span>
                  </button>
                </div>
              </div>
          */}
            </div>
          ) : (
            <></>
          )}
        </div>
        <p className="mt-8 text-center text-sm text-gray-600">
          ya tienes una cuenta?{" "}
          <Link href="/auth/sign-in" className="font-semibold text-primary">
            Inicia sesión aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
