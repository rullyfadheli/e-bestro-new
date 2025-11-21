"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // if (!email || !password) {
  //   return "Please input required fields";
  // }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(data);
  console.log(error);
  if (error) {
    return redirect("/error");
  }

  revalidatePath("/");
  return redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return "Please input required fields";
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return redirect("/error");
  }

  revalidatePath("/");
  return redirect("/dashboard");
}
