import React from "react";
import { Text } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const Loading = () => {
  return (
    <View className={"flex justify-center items-center"}>
      <Text className={"text-white"}>Loading...</Text>
    </View>
  );
};

export default Loading;
