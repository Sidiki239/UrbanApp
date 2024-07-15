import { SafeAreaView, Alert, View,RefreshControl,Image,ScrollView ,Text } from 'react-native'
import React , {useState,useEffect} from 'react'
import { icons } from '../constants'
import CustomButton from '../components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from "../assets/logo/logo.png"
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
const image1 ={

uri:"https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png"

}
const image2 ={

  uri:"https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg"
  
  }

  const image3 ={

    uri:"https://image.pngaaa.com/730/4806730-middle.png"
    
    }
    const image4 ={

      uri:"https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-glyph-black-icon-png-image_691589.jpg"
      
      }
 
  //

function Profile({navigation}) {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        const storedToken = await AsyncStorage.getItem('token');

        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };

    fetchData();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      const storedToken = await AsyncStorage.getItem('token');

      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement des données', error);
    } finally {
      setRefreshing(false);
    }
  };
  const logOut = async () => {
    Alert.alert(
      'Déconnexion',
      'Vous allez être déconnecté.',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Se déconnecter',
          onPress: async () => {
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('loggedIn');
 
             navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'home' }],
              }) 
            );
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <SafeAreaView className="bg-[#ECF2FF] flex h-full">

    <ScrollView className="bg-[#ECF2FF] h-full"
       refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
    <View style={{elevation:1}} className="flex py-3 px-5 space-y-10 bg-white">
    <View className="flex justify-between items-start flex-row mb-0">
                 <View>
                   <Text className="font-pmedium text-md text-black">
                   BTracker
                   </Text>
                   <Text className="text-2xl font-bold text-black">
               Mon Profile      </Text>
                 </View>
                 <View className="mt-1.5">
                   <Image
                     source={logo}
                     className="w-9 h-10 "
                     resizeMode="contain"
                   />
                 </View>
               </View>
                  </View>
     

  <View style={{elevation:1}} className="w-[80%] mx-auto mt-8 mb-12 rounded-md px-5 py-4 flex bg-white justify-center items-center   ">


  <View className="w-16 h-16  mt-8  rounded-xl flex justify-center items-center">

  <Image
      source={image2}
      className="w-[180%] h-[170%] rounded-md"
      resizeMode="contain"
    />
    
  </View>
  <View className="mt-1 flex flex-row">

  </View>
<View className='w-full bg-green-40 px-3 py-6 mt-5'>
<Text className='text-black  from-neutral-200 text-xl mt-1'>Code : {userData?.username}</Text>
  <Text className='text-black  from-neutral-200 text-xl mt-1 '>Nom : {userData?.nom}</Text>
  <Text className='text-black   text-xl mt-1'>Prénom : {userData?.prenom} </Text>
  <Text className='text-black   text-xl mt-1 '>Date d'ajout : {moment(userData?.date_ajout).format('DD/MM/YYYY')}  </Text>

</View>
 
  <CustomButton  className="mt-1"
  style={{elevation:1}}
    title="Déconnexion"
    textStyles="text-white"
   handlePress={logOut}
    containerStyles=" bg-red-600 mt-8  px-3 py-2 rounded-md "
  //  isLoading={isSubmitting}
  />


</View>
    </ScrollView>
  </SafeAreaView>

  )
}

export default Profile

