import { useState ,useEffect } from "react";
import CustomButton from "../components/CustomButton";
import {SafeAreaView,TextInput,Modal ,View, Text, ScrollView, Dimensions, Alert,TouchableOpacity, Image, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import { icons } from "../constants";

function Signin({navigation}) {


  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

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
const [loading , setLoading] = useState(false)
const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({ username: '', password: '' });
  // //#ECF2FF  #072d4c

  //#ECF2FF #072d4c bg-[#ECF2FF]
  const [showPassword, setShowPassword] = useState(false);
 
   const handleInputChange = (name, value) => {
     setFormData({
       ...formData,
       [name]: value,
     });
   };
const [message, setMessage] = useState(1)
const handleSubmit = () => {
  setLoading(true);
  if (formData.username === '' || formData.password === '') {
    setMessage(1)
    setModalOpen(true)
    setLoading(false);
  } else {
    axios.post('https://urban-backend-theta.vercel.app/api/user/loginUser', formData)
      .then(async (res) => {
        if (res.data.error === 'Invalid Credentials') {
          setLoading(false);
          setModalOpen(true)
          setMessage(2)
         } else {
          const userData = res.data;
          if (userData.userType !== 'releveur') {
            setLoading(false);
            setModalOpen(true)
            setMessage(3)
          } else {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            await AsyncStorage.setItem('token', userData.token);
            await AsyncStorage.setItem('loggedIn', 'true');
            navigation.replace('layout');
            setLoading(false);
          }
        }
      })
      .catch((error) => {
        setModalOpen(true)
        setMessage(4);
        setLoading(false);
        //console.error(error);
      });
  }
};
  return (
    <SafeAreaView
    className={`bg-[#ECF2FF] flex-1 h-full ${modalOpen ? 'blur-2xl' : ''}`}
    style={{ elevation: 3 }}>
      <ScrollView>
        <View
          className="w-[full] flex  h-full px-4 my-1 mt-8 top-10"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}>
        <View className="text-left w-auto  ">
          <Text className="text-6xl  text-[#072d4c] font-bold">BTracker</Text>
          </View>
          <Text className="text-2xl font-semibold text-[#072d4c] mt-10 font-psemibold">
          Connexion
          </Text>
          <View style={{elevation:1}} className="w-full h-12  mt-9 bg-black-100 border-1 border-white focus:border-[#92c7f2] flex flex-row items-center">
          <TextInput style={{borderWidth:1,borderRadius:0}}
            className="flex-1 text-[#072d4c] border-[#072d4c]   bg-white  pl-4  font-psemibold text-xl  "
            placeholder="Code Releveur"
            value={formData.username}
            placeholderTextColor="#7B7B8B"
            keyboardType="default"
            onChangeText={(e) => setFormData({ ...formData, username: e })}
          />
          </View>
          <View style={{borderRadius:0,elevation:1}} className="w-full h-12 border-[#072d4c]     mt-9 bg-black-100  focus:border-[#92c7f2] flex flex-row items-center">
          <TextInput style={{borderWidth:1,borderRadius:0}}
            className="flex-1 text-[#072d4c]  bg-white rounded-sm   pl-4  font-psemibold text-xl "
            value={formData.password}
            placeholder="Mot de passe"
            placeholderTextColor="#7B7B8B"
            onChangeText={(e) => setFormData({ ...formData, password: e })}
           secureTextEntry={showPassword === true ? false : true}
          />
            <TouchableOpacity style={{borderTopWidth:0.2,borderBottomWidth:0.2,
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6}} className="bg-[#072d4c] justify-center pr-2 pl-2 h-12" onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-8 h-8  "
                resizeMode="contain"
              />
            </TouchableOpacity>
        </View>
        <CustomButton
        className="mt-15"
        style={{ elevation: 0 }}
        title={
          loading ? (
            <ActivityIndicator color="#ECF2FF" size={19} />
          ) : (
            <Text className="text-[#ECF2FF] text-xl">Connexion</Text>
          )}
        handlePress={handleSubmit}
        containerStyles="mt-10"
      />
<TouchableOpacity style={{marginTop:70,elevation:4}} className="justify-center text-center flex" 
onPress={()=> navigation.replace('home')}>
          <Text className="text-[#072d4c] text-2xl font-semibold text-center">Retour</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
      animationType="fade"
      transparent={true}
      visible={modalOpen}
      onRequestClose={() => {
        setModalOpen(!modalOpen);
        setLoading(false)
      }}
    >
    <View className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
    <View className="flex flex-1 justify-center items-center">
    <View className="bg-white p-6 rounded-lg shadow-lg">
    <Text className="text-black  text-md ">
    {message ===1 && "Veuillez remplir tous les champs"}
    {message ===2 && "Code releveur ou mot de passe incorrect"}
    {message ===3 && "Vous n'avez pas les droits d'accèss"}
    {message ===4 && "Code releveur ou mot de passe incorrect"}
    </Text>
 <TouchableOpacity style={{elevation:5}}
  className={`${message === 1 ? 'bg-gray-500' : 'bg-red-500'} py-2 px-4 mt-5 mx-5 rounded-md`}
  onPress={() => setModalOpen(!modalOpen)}>
  <Text className="text-white text-center">Fermer</Text>
</TouchableOpacity>
</View>
</View>
    </View>
   </Modal>
    </SafeAreaView>
  );
};

export default Signin;