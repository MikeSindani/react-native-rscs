"use client";

import { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

import { StoredImage } from "@/actions/images";

export function ImageViewer({ image }: { image: StoredImage }) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsZoomed(!isZoomed)}
      style={[styles.imageRow, isZoomed && styles.zoomedImageRow]}
    >
      <Image
        source={{ uri: `http://localhost:8081/images/${image.fileName}` }}
        style={{
          ...(isZoomed ? styles.zoomedImage : styles.image),
          aspectRatio: image.width / image.height,
        }}
      />
      <View
        style={isZoomed ? styles.zoomedInfoContainer : styles.infoContainer}
      >
        <Text style={styles.text}>{image.originalFileName.slice(0, 20)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ImagesList({ images }: { images: StoredImage[] }) {
  return (
    <View style={styles.rowContainer}>
      {images.map((image) => (
        <ImageViewer key={image.fileName} image={image} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  imageRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  zoomedImageRow: {
    flexDirection: "column",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 10,
  },
  image: {
    width: "33%",
  },
  zoomedImage: {
    width: "100%",
  },
  infoContainer: { width: "66%" },
  zoomedInfoContainer: { width: "100%", margin: "auto" },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
