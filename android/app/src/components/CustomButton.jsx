import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  background,
  isLoading,
}) => {
   // //#ECF2FF  #072d4c

  //#ECF2FF #072d4c bg-[#ECF2FF] #92c7f2
  return (
    <TouchableOpacity style={{elevation:2}}
      onPress={handlePress}
      activeOpacity={1}
     
      className={`bg-[#072d4c] rounded-md  border-black  min-h-[40px] flex flex-row mt-12 justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-white font-bold text-xl ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;