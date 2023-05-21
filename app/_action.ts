"use server";

import { revalidatePath } from "next/cache";
import { createData } from "~/lib/mongodb/client";

export async function create(formData: FormData) {
  const { title, url } = Object.fromEntries(formData.entries());
  await createData({
    title,
    url,
  });

  revalidatePath("/");
}
