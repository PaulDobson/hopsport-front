"use server";

import { redirect } from "next/navigation";
import { Dictionary, groupBy } from "lodash";
import { headers } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import { encodedRedirect } from "@/app/utils/utils";
import {
  Database,
  Tables,
} from "@/app/server/repository/database/supabase-type";
import { SupabaseClient } from "@supabase/supabase-js";

export type SignUpResponse = {
  success: boolean;
  error?: string;
  data?: any;
  userProfile?: Tables<"profiles">;
  rolePermission?: Dictionary<any[]>;
};

export async function signIn(
  email: string,
  password: string
): Promise<SignUpResponse> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { success: false, error: error.message };
  }

  const userProfile = await fetchUserProfile(supabase, data.user?.id);
  if (!userProfile) {
    signOutAction();
    return { success: false, error: "Error fetching user profile" };
  }

  const rolePermission = await fetchRolesAndPermissions(supabase);
  if (!rolePermission) {
    signOutAction();
    return { success: false, error: "Error fetching roles and permissions" };
  }

  return {
    success: true,
    data: data.user!,
    userProfile: userProfile,
    rolePermission: rolePermission,
  }; // encodedRedirect("success", "/", "Inicio de sesión exitoso");
}

export async function signInAction(
  formDataProp: FormData
): Promise<SignUpResponse> {
  const supabase = await createClient();

  const formData = {
    email: formDataProp.get("email") as string,
    password: formDataProp.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(formData);
  if (error) {
    return { success: false, error: error.message };
  }

  const userProfile = await fetchUserProfile(supabase, data.user?.id);
  if (!userProfile) {
    signOutAction();
    return { success: false, error: "Error fetching user profile" };
  }
  const rolePermission = await fetchRolesAndPermissions(supabase);

  return { success: true, data: "Inicio de sesión exitoso" }; // encodedRedirect("success", "/", "Inicio de sesión exitoso");

  //revalidatePath("/", "layout");
  //redirect("/");
}

export async function createUser(
  email: string,
  password: string,
  invitationId: number
) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: `Error al crear el usuario: ${error.message}`,
    };
  }

  // La invitación existe y no ha sido aceptada aún
  /*updateInvitation(invitationId)
    .then((resp) => {
      console.log("Invitation updated", resp);
    })
    .catch((error) => {
      console.error("Error updating invitation", error);
    });*/

  return { success: true, message: "Usuario creado exitosamente" };
}

export async function verifyInvitation(email: string, accessCode: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("Invitation")
      .select()
      .eq("email", email)
      .eq("code", accessCode)
      .is("acepted", false)
      .is("acepted_at", null)
      .single();

    if (error) {
      return {
        success: false,
        message: `No se ha encontrado una invitación para ${email}, ponte en contacto con admin@hopsport.cl para obtener tu codigo de validación`,
      };
    }
    return { success: true, message: "Invitación verificada", id: data.id };
  } catch (error) {
    console.error("Error verifying invitation", error);
    return { success: false, message: "Invitación no encontrada", id: null };
  }
}

export async function handleGoogleSignUp() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.SUPABASE_URL}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) throw error;
    console.log("Signed up with Google successfully:", data);

    console.log(data);
    //await checkInvitation(session?.user?.email);

    return data.url;
    // Handle successful Google sign up
  } catch (error) {
    console.error("Error signing up with Google:", error);
  }
}

export async function checkInvitation(email: string | undefined) {
  const supabase = await createClient();
  if (!email) {
    console.error("No email provided");
    return false;
  }

  const { data, error } = await supabase
    .from("invitation")
    .select("*")
    .eq("email", email)
    .is("accepted", false)
    .is("acceptedAt", null)
    .single();

  if (error) {
    console.error("Error checking invitation:", error);
    return;
  }

  if (data) {
    // La invitación existe y no ha sido aceptada aún
  } else {
    console.log("No valid invitation found for this email");
    // Aquí puedes manejar el caso de un usuario sin invitación válida
    // Por ejemplo, cerrar la sesión o mostrar un mensaje
  }
}
async function updateInvitation(invitationId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Invitation")
    .update({ acepted: true, acceptedAt: new Date() })
    .eq("id", invitationId)
    .select();
  console.log(data, error);

  if (error) {
    console.error("Error al actualizar la invitación:", error);
    return {
      success: false,
      message: "Error al actualizar la invitación",
      error,
    };
  }

  if (!data || data.length === 0) {
    console.log("No se encontró la invitación para actualizar");
    return {
      success: false,
      message: "No se encontró la invitación para actualizar",
    };
  }

  console.log("Invitación actualizada:", data);
  return { success: true, message: "Invitación actualizada correctamente" };
}

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};
export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

const fetchRolesAndPermissions = async (
  supabase: SupabaseClient<any, "public", any>
): Promise<Dictionary<any[]> | undefined> => {
  let { data, error } = await supabase.from("role_permission_view").select("*");
  if (error) {
    console.error("Error fetching roles and permissions", error);
    return undefined;
  }

  //console.log("Roles and permissions", data);
  const roles = groupBy(data, "role_id");

  return roles ?? undefined;
};

const fetchUserProfile = async (
  supabase: SupabaseClient<any, "public", any>,
  uuid: string
): Promise<Tables<"profiles"> | undefined> => {
  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", uuid)
    .single();
  if (error) {
    console.error("Error fetching user profile", error);
    return undefined;
  }

  return profiles;
};
