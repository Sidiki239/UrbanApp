import { useState,useEffect } from "react";
import { StatusBar } from "react-native";
import { View, Text, Image, ScrollView ,SafeAreaView } from "react-native";
import logo from "../assets/logo/logo.png"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from "../components/CustomButton";
function  Home() {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          navigation.navigate('layout');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du token', error);
      }
    };

    fetchData();
  }, [navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement des données', error);
    } finally {
      setRefreshing(false);
    }
  };
const handlePress = () =>{
navigation.replace("signin")
//#ECF2FF #072d4c bg-[#ECF2FF]
}
  return (
    <SafeAreaView  className="bg-[#ECF2FF] h-full">

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
        <Text className="text-6xl  text-[#072d4c] font-semibold   ">BTracker</Text>
         

          <Image
            source={logo}
            className="w-[180px]  h-[200px] mt-10"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-xl text-black font-normal text-center">
              Faciliter la relève quotidienne {"\n"}
              des compteurs avec{" "}
              <Text className="text-[#072d4c] font-bold">BTracker</Text>
            </Text>
          </View>
         <CustomButton
         title="Continuer"
         handlePress={handlePress}
         containerStyles="mt-16 py-2 px-10 w-[90%] mt-20"
         />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;