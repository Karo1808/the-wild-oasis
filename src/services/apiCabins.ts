import supabase, { supabaseUrl } from "./supabase.ts";

export interface Cabin {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  id?: string;
  description: string;
}

export interface newCabin {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: File | string;
  id?: string;
  description: string;
  imageURL?: FileList;
}

export const getCabins = async (): Promise<Cabin[] | null> => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export const createEditCabin = async (
  newCabin: newCabin,
  id?: string
): Promise<Cabin | null> => {
  const hasImagePath = typeof newCabin.image === "string";

  let imageName = "";
  if (!hasImagePath && newCabin.image instanceof File) {
    imageName = `${Math.random()}-${newCabin.image.name}`;
  }

  const { imageURL, id: _, ...newCabinUpdated } = newCabin;

  const imagePath = hasImagePath
    ? newCabinUpdated.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let query: PostgrestQueryBuilder<any, any, unknown> = supabase.from("cabins");

  // Create
  if (id === undefined) {
    query = query.insert([{ ...newCabinUpdated, image: imagePath }]);
  }
  // Edit
  else {
    query = query.update({ ...newCabinUpdated, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be added");
  }

  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabinUpdated.image);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (storageError?.statusCode !== "400" && storageError) {
    await supabase
      .from("cabins")
      .delete()
      .eq("id", data?.id ?? "0");
    console.error(storageError);
    throw new Error(
      "Image could not be uploaded, and the cabin was not created"
    );
  }

  return data;
};

export const deleteCabin = async (
  id: string | null
): Promise<Cabin[] | null> => {
  try {
    if (id === null) throw new Error("ID does not exist");

    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be deleted");
    }

    if (!data) return null;

    return data;
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};
