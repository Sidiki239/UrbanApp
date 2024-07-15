import { useState } from "react";
import { View,ScrollView, SafeAreaView,Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView>
    <ScrollView>
    <View className={`space-y-2 ${otherStyles}`} style={{elevation:3}}>
      <Text className="text-base text-black font-pmedium">{title}</Text>

      <View style={{borderRadius:5}} className="w-full h-12 px-4 bg-black-100 border-2 border-black-200 focus:border-[#92c7f2] flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base h-10"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6 "
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default FormField;