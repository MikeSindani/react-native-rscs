"use client";
import { useCallback, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { EncodingType } from "expo-file-system";
import { readAsStringAsync } from "expo-file-system";
import { launchImageLibraryAsync } from "expo-image-picker";

import Button from "@/components/button";
import ImageList from "@/components/images-list";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { postImage, getImageList } from "@/actions/images";

function useImages() {
  const [images, setImages] = useState<React.ReactNode>();

  const onPickImage = useCallback(async () => {
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
      });

      if (result?.assets?.[0]?.uri) {
        const image = await readAsStringAsync(result?.assets?.[0]?.uri, {
          encoding: EncodingType.Base64,
        });
        await postImage({
          image,
          name: result?.assets?.[0]?.fileName || "",
          width: result?.assets?.[0]?.width || 0,
          height: result?.assets?.[0]?.height || 0,
        });
        setImages(await getImageList());
      }
    } catch (err) {}
  }, []);

  return {
    images,
    onPickImage,
  };
}

export default function Images({ children }: { children: React.ReactNode }) {
  const { images, onPickImage } = useImages();

  return (
    <View style={styles.container}>
      {images || children}

      <View style={styles.buttonContainer}>
        <Button onClick={onPickImage} style={styles.blue}>
          <View style={styles.buttonContent}>
            <IconSymbol name="plus" size={28} color="white" />
            <Text style={styles.buttonText}>Add Image</Text>
          </View>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
  },
  buttonContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  blue: {
    backgroundColor: "#007AFF",
  },
  buttonContainer: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
