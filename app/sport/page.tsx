import React from "react";
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    //console.log("No user found");
    return redirect("/auth/sign-in");
  }
  return <div>Home Sport</div>;
}
