"use client";

import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  MailIcon,
} from "@/app/components/ui/icons";
import { Button, Input, Link, Image, Spacer } from "@nextui-org/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import NextImage from "next/image";
import { handleGoogleSignUp, signInAction } from "../actions";
import { useRouter } from "next/navigation";

const motivationalPhrases = [
  "Plataforma para gestionar tus entrenaientos y potenciar tu academia",
  "Transform your body, transform your life!",
  "Sweat, smile, and repeat!",
  "Your only limit is you.",
  "Make yourself proud.",
  "Strong body, strong mind!",
];

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

export type FormCredentialData = yup.InferType<typeof schema>;

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCredentialData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormCredentialData) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      const response = await signInAction(formData);

      if (response.error) {
        setError(response.error);
      }

      if (response.success) {
        router.push("/sport");
      }
    } catch (err: any) {
      console.error("Error al registrar:", err);
      setError(err?.message ?? "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSingInWithGoogle = async () => {
    try {
      const url = await handleGoogleSignUp();
      if (url) {
        router.push(url);
      }
    } catch (error) {
      console.error("Error during Google sign up:", error);
    }
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

      {/* Right side - Registration form with company logo */}
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
            radius="md"
            as={NextImage}
          />
        </div>
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Inicia sesión</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              placeholder="Ingresa tu Email"
              type="email"
              variant="bordered"
              {...register("email")}
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />

            {errors.email && (
              <p className="text-sm text-purple-500">{errors.email.message}</p>
            )}
            <Spacer y={1.5} />

            <Input
              id="password"
              label="Password"
              placeholder="Ingresa contraseña"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              {...register("password")}
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

            {error && <p className="text-danger">{error}</p>}

            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={isLoading}
            >
              Ingresar
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-900 px-4 text-gray-400">
                  O inicia sesión con
                </span>
              </div>
            </div>

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
        </div>
        <div className="mt-4 flex w-full flex-row gap-5 items-center justify-center">
          <p className="text-center text-sm text-gray-300">
            <Link
              href="/auth/forgot-password"
              className="font-semibold  text-primary "
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            No tienes una cuenta?{" "}
            <Link href="/auth/sign-up" className="font-semibold text-primary">
              Crea una aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
