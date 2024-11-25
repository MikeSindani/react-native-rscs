import { Suspense } from "react";
import { Text } from "react-native";
import Images from "@/components/images";

import { getImageList } from "@/actions/images";

export default function Index() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <Images>{getImageList()}</Images>
    </Suspense>
  );
}
