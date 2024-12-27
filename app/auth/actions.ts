"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../utils/supabase/server";
import { encodedRedirect } from "../utils/utils";

export async function signInAction(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { success: false, error: error.message }; // encodedRedirect("error", "/auth/sign-in", error.message);
  }

  return { success: true, error: null }; // encodedRedirect("success", "/", "Inicio de sesión exitoso");

  //revalidatePath("/", "layout");
  //redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { success: false, error: error.message }; // encodedRedirect("error", "/auth/sign-up", error.message);
    //redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/sport");
}

export async function handleGoogleSignUp() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) throw error;
    console.log("Signed up with Google successfully:", data);

    return data.url;
    // Handle successful Google sign up
  } catch (error) {
    console.error("Error signing up with Google:", error);
  }
}
