"use server";
import fs from "node:fs";
import path from "node:path";

import { View, Text } from "react-native";
import ImagesList from "@/components/images-list";

export interface StoredImage {
  fileName: string;
  originalFileName: string;
  width: number;
  height: number;
}

const IMAGES_JSON_PATH = path.join(".", "images.json");

export const getImages = async (): Promise<StoredImage[]> => {
  const jsonContent = fs.readFileSync(IMAGES_JSON_PATH, "utf8");
  return JSON.parse(jsonContent) || [];
};

export const getImageList = async (): Promise<React.ReactNode> => {
  const images = await getImages();
  return (
    <View>
      <Text>Images</Text>
      <ImagesList images={images} />
    </View>
  );
};

export const postImage = async ({
  name: originalFileName,
  image,
  width,
  height,
}: {
  name: string;
  image: string;
  width: number;
  height: number;
}) => {
  try {
    const buffer = Buffer.from(image, "base64");

    const dir = path.join(process.cwd(), "public", "images");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = originalFileName.split(".").pop() || "jpg";
    const name = `${randomString}.${fileExtension}`;

    const filePath = path.join(dir, name);
    fs.writeFileSync(filePath, buffer);

    const images = await getImages();

    images.push({
      fileName: name,
      originalFileName,
      width,
      height,
    });

    fs.writeFileSync(IMAGES_JSON_PATH, JSON.stringify(images, null, 2));

    return { success: true };
  } catch (error) {
    console.error("Error saving image:", error);
    return { success: false, error: "Failed to save image" };
  }
};
