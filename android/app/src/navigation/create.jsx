import { Image, Text, View ,Alert ,TextInput ,Pressable,StyleSheet, RefreshControl ,SafeAreaView,ScrollView, Modal ,ActivityIndicator ,TouchableOpacity} from 'react-native'
import React ,{useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
 import logo from "../assets/logo/logo.png"
 import axios from 'axios'
 import { useNavigation } from '@react-navigation/native';
 import SelectDropdown from 'react-native-select-dropdown'
function Create() {
  
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [unites, setUnites] = useState([]);
  const [zone, setZone] = useState([]);
  const [tempUnits, setTempUnits] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState("");
  
   const navigation = useNavigation()
//#ECF2FF #072d4c
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const storedUserData = await AsyncStorage.getItem('userData');
          const storedToken = await AsyncStorage.getItem('token');
    
          if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
          }
          if (storedToken) {
            setToken(storedToken);
          }
          setLoading(false);
        } catch (error) {
          console.error('Erreur lors de la récupération des données', error);
          setLoading(false);
        }
      };
    
      fetchUserData();
    }, []);
    const onRefresh = async () => {
      try {
        setRefreshing(true);
        const [uniteResponse, zoneResponse, releveResponse, userResponse] = await Promise.all([
          axios.get("https://urban-backend-theta.vercel.app/api/unite/getall"),
          axios.get("https://urban-backend-theta.vercel.app/api/zone/allzone/"),
        ]);
  
        if (uniteResponse.data && zoneResponse.data ) {
          setUnites(uniteResponse.data);
          setZone(zoneResponse.data);
     
        } else {
          console.error("Réponse invalide");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setRefreshing(false);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const [uniteResponse, zoneResponse] = await Promise.all([
            axios.get("https://urban-backend-theta.vercel.app/api/unite/getall"),
            axios.get("https://urban-backend-theta.vercel.app/api/zone/allzone/"),
          ]);
    
          if (uniteResponse.data && zoneResponse.data) {
            setUnites(uniteResponse.data);
            setZone(zoneResponse.data);
          } else {
            console.error("Réponse invalide");
          }
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);
    

       const [form, setForm] = useState({
        id_releveur: userData?._id,
        nombre_compteur: "",
        ref_zone: selectedZone,
        ref_zone_unite: "",
      });
      const resetForm = () => {
        setForm({
          nombre_compteur: '',
          ref_zone: '',
          ref_zone_unite: '',
        });
      };
   
      const handleZonePress = (id) => {
        setSelectedZone(id);
        const selectedZone = unites.filter((unite) => unite.reference?.slice(0, 4) === id);
        setTempUnits(selectedZone);
        setModalOpen(true);
      };
      
      const handleNombreCompteurChange = (text) => {
        setForm({ ...form, nombre_compteur: text });
      };
      
      const handleUnitSelect = (selectedItem) => {
        setForm({ ...form, ref_zone_unite: selectedItem });
      };
      
      const handleAddReleve = () => {
        if (form.ref_zone_unite === "" || form.nombre_compteur === "") {
          Alert.alert("Champs vides");
        } else {
          setLoading(true);
          axios
            .post("https://urban-backend-theta.vercel.app/api/releve/create", {
              id_releveur: (userData?._id).toString(),
              nombre_compteur: form.nombre_compteur,
              ref_zone: selectedZone,
              ref_zone_unite: form.ref_zone_unite,
            })
            .then((res) => {
              setLoading(false);
              if (res.status === 201) {
                setForm({
                  id_releveur: "",
                  nombre_compteur: "",
                  ref_zone: "",
                  ref_zone_unite: "",
                });
                setModalOpen(false);
                Alert.alert(
                  "Relevé ajouté",
                  "Le relevé a été ajouté avec succès",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        navigation.navigate("records");
                      },
                    },
                  ],
                  { cancelable: false }
                );
              } else if (res.status === 400) {
                Alert.alert("Veuillez réessayer");
              }
            })
            .catch((error) => {
              setLoading(false);
              console.error("Erreur lors de l'ajout du rélevé :", error);
              Alert.alert("Erreur lors de l'ajout du rélevé ");
            });
        }
      };
  return (
    <ScrollView
    className={`bg-[#ECF2FF] h-full flex-1 ${modalOpen ? 'blur-3xl' : ''}`}
    style={{ elevation: 3 }}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >

  <View style={{elevation:1}} className="flex py-3 px-5 space-y-10 bg-white">
  <View className="flex justify-between items-start flex-row mb-0">
               <View>
                 <Text className="font-pmedium text-md text-black">
                 BTracker
                 </Text>
                 <Text className="text-2xl font-bold text-black">
            Nouvelle relève     </Text>
               </View>
               <View className="mt-1.5">
                 <Image
                   source={logo}
                   className="w-9 h-10"
                   resizeMode="contain"
                 />
               </View>
             </View>
                </View>
    

                 <View className="flex justify-between m-5 items-start flex-row mb-0">
                 <View>
                   <Text className="font-pmedium text-lg text-black">
                   Selectionnez la zone pour insérer
                   </Text>
                  
                 </View>
                 
               </View>

               <View className="flex justify-between mt-5 p-4 gap-1 items-center  flex-row flex-wrap mb-0">
               {loading === false && (
                 zone.map((zone) => (
                   <TouchableOpacity
                     key={zone.zone}
                     onPress={() => handleZonePress(zone.zone)}
                     className="w-[40%] m-5 p-auto font-rounded-md h-20  bg-slate-50 justify-center"
                     style={{ elevation: 1 }}
                   >
                     <Text className="text-black space-x-2  text-center text-2xl">
                       {zone.zone}
                     </Text>
                   </TouchableOpacity>
                 ))
               )}
           
               
             </View>
             {loading === true && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ActivityIndicator color="navy" size={40} />
              </View>
            )}

             <Modal
             animationType="fade"
             transparent={true}
             visible={modalOpen}
             onRequestClose={() => {
               Alert.alert('Modal has been closed.');
               setModalOpen(!modalOpen);
               resetForm();
             }}
           >
         
           
           
           <View className="absolute -top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center">
             <View className="flex flex-1 justify-center items-center">
               <View className="bg-white p-6 rounded-lg shadow-lg">
                 <Text className="text-center text-black text-lg 
                 uppercase font-normal mb-1">Ajouter sur la zone </Text>
                 <Text className="text-center text-red-600 text-2xl 
                  font-semibold mb-4"> {selectedZone}</Text>
                 <SelectDropdown
                 data={tempUnits}
                 onSelect={(item)=>handleUnitSelect(item.reference)}
                 renderButton={(selectedItem, isOpened) => {
                   return (
                     <View  
                     className='  flex-row self-center justify-center 
                     p w-200 h-50 bg-slate-200 rounded-md'
                     style={styles.dropdownButtonStyle}>
                       <Text style={styles.dropdownButtonTxtStyle}>
                         {(selectedItem && selectedItem.reference) || (selectedItem && selectedItem[0].reference)}
                       </Text>
                    </View>
                   );
                 }}
                 renderItem={(item, index, isSelected) => {
                   return (
                     <View  style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                      <Text className="text-black " style={styles.dropdownItemTxtStyle}>{item?.reference}</Text>
                     </View>
                   );
                 }}
                 showsVerticalScrollIndicator={true}
                 dropdownStyle={styles.dropdownMenuStyle}
               />
               <TextInput 
               value={form.nombre_compteur}
               onChangeText={handleNombreCompteurChange}
               className="text-black font-pmedium text-lg rounded-md"
               style={styles.dropdownButtonStyle}
               keyboardType='numeric'
               placeholder="Nombre de compteurs"
               placeholderTextColor="#7B7B8B"
               
             />


             {loading ? <View
              className='py-1 mt-10 w-60 self-center  px-4 rounded-md'
              
              ><ActivityIndicator color="#072d4c" size={30} /></View>
            :
            <View>
            <TouchableOpacity
            className="bg-[#072d4c] py-1 mt-10 w-60 self-center  px-4 rounded-md"
            onPress={handleAddReleve}
            
          >
            <Text className="text-white text-center text-xl">Ajouter</Text>
          </TouchableOpacity>
        
                <TouchableOpacity
                  className=" py-1 mt-5 w-60 self-center bg-gray-400  px-4 rounded-md"
                  onPress={() => setModalOpen(!modalOpen)}
                >
                  <Text className="text-white  text-center text-xl">Fermer</Text>
                </TouchableOpacity>
              
              
            </View>
            }
           
               
                 </View>
             </View>
             </View>
           </Modal>
    
  {/* 
    
     <ScrollView className="px-5 py-5">
        <Text className="text-2xl text-black font-semibold">Ajouter un relevé</Text>

        <FormField
          title="Zone"
          value={form.zone}
          placeholder="A3A6"
          handleChangeText={(e) => setForm({ ...form, zone: e })}
          otherStyles="mt-5"
        />

       
       

     


        <TextInput style={{borderRadius:5}}
        value={form.nombre_compteur}
        className="flex-1 mt-10 text-white font-psemibold text-base  w-full h-12 px-4 bg-black-100  border-2 border-black-200 focus:border-[#92c7f2] flex flex-row items-center"
        placeholder="Nombre de compteurs"
     keyboardType='numeric'
      handleChangeText={(e) => setForm({ ...form, nombre_compteur: e })}
          
      />
       

        <CustomButton
          title={ <View><ActivityIndicator color="black"/></View>}
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView> */}
    </ScrollView>

  )
}

export default Create

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "180px",
    height: 50,
    marginTop:20,
    backgroundColor: '#E9ECEF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
   // fontWeight: '100',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});