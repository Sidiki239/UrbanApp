import React ,{useState, useEffect} from 'react'
import {StyleSheet,TouchableOpacity,ScrollView, 
    ActivityIndicator, Modal,Image,RefreshControl ,FlatList
    ,TextInput, 
    Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from "axios"
 import logo from "../assets/logo/logo.png"
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import moment from 'moment';
 import SelectDropdown from 'react-native-select-dropdown'

const edit ={
uri:"https://cdn-icons-png.flaticon.com/512/5996/5996831.png"
}
const delete2 ={
  uri:"data:image/png;base64,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"

}

const HorizontalFlatList = ({ onZoneSelected }) => {


  const [unites, setUnites] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState({ id: 'all', name: 'Toutes' });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setRefreshing(true); // Définir refreshing à true avant de faire l'appel API
        const [uniteResponse, zoneResponse] = await Promise.all([
          axios.get("https://urban-backend-theta.vercel.app/api/unite/getall"),
          axios.get("https://urban-backend-theta.vercel.app/api/zone/allzone/"),
        ]);

        if (uniteResponse.data && zoneResponse.data) {
          setUnites(uniteResponse.data);
          setZones([{ id: 'all', name: 'Toutes' }, ...zoneResponse.data]);
        } else {
          console.error("Réponse invalide");
        }
        setLoading(false);
        setRefreshing(false); // Définir refreshing à false une fois les données récupérées
      } catch (error) {
        console.error(error);
        setLoading(false);
        setRefreshing(false); // Définir refreshing à false en cas d'erreur
      }
    };

    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData()
      .then(() => {
        setRefreshing(false);
      })
      .catch((error) => {
        setRefreshing(false);
        console.error('Erreur lors du rafraîchissement des données:', error);
      });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedZone(item);
        onZoneSelected(item);
      }}
      style={{
        elevation:1,
        marginTop: 5,
        marginLeft: 5,
        width:80,
        marginRight: 5,
       height:40,
       borderRadius:12,
       alignItems:"center",
       justifyContent:"center",
        backgroundColor: selectedZone?.zone === item.zone ? 'lavender' : 'white',
      }}
      className="flex justify-between  flex-column rounded-xl"
    >
      <View className="mx-2 my-2">
        <Text
          className="text-black text-md uppercase"
          style={{
            fontWeight: selectedZone?.zone === item.zone ? 'bold' : 'normal',
          }}
        >
          {item.zone ? item.zone :"Toutes" }   
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      className="mt-1 py-2 mx-5 mb-2  "
      data={zones}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
   
      initialScrollIndex={0}
    />
  );
};

export default function Records() {
    const [refreshing, setRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigation = useNavigation()
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [releves, setReleves] = useState([]);
  const [user, setUser] = useState([]);
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
  }, [releves, userData?._id]);
   const [activeZone, setActiveZone] = useState("Toutes");


  const [filteredReleves, setFilteredReleves] = useState([]);
  const [zone, setZone] = useState([]);
const [unite , setUnite] = useState([])

useEffect(() => {
  const fetchData = async () => {
    try {
      const [releveResponse, userResponse, uniteResponse, zoneResponse] = await Promise.all([
        axios.get("https://urban-backend-theta.vercel.app/api/releve/getall"),
        axios.get("https://urban-backend-theta.vercel.app/api/user/getAllUser"),
        axios.get("https://urban-backend-theta.vercel.app/api/unite/getall"),
        axios.get("https://urban-backend-theta.vercel.app/api/zone/allzone/"),
      ]);
      const releves = releveResponse.data;
      setReleves(releves);
      setUser(userResponse.data);
      setUnite(uniteResponse.data);
      setZone(zoneResponse.data);
      // Initial filtering for the current user
      setFilteredReleves(releves.filter((releve) => releve.id_releveur === userData?._id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [userData?._id]);

const handleDeleteRecord = async (recordId) => {
  try {
    const confirmed = await new Promise((resolve, reject) => {
      Alert.alert(
        'Confirmation de suppression',
        'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
        [
          {
            text: 'Annuler',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'Supprimer',
            onPress: () => resolve(true),
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    });

    if (confirmed) {
      await axios.delete(`https://urban-backend-theta.vercel.app/api/releve/delete/${recordId}`);
      Alert.alert('Enregistrement supprimé avec succès');
      fetchRecords(); // Réactualiser la liste des enregistrements
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'enregistrement :', error);
  }
};
  const [search, setSearch] = useState("");

const [form, setForm] = useState({
  id_releveur: userData?.userType || "",
  nombre_compteur: editableReleve?.nombre_compteur || "",
  ref_zone: editableReleve?.ref_zone || "",
  ref_zone_unite: editableReleve?.ref_zone_unite || "",
});
      const handleNombreCompteurChange = (text) => {
        setForm({ ...form, nombre_compteur: text });
      };
      
  const [modalVisible, setModalVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [activeRecord, setActiveRecord] = useState(null);


    const [selectedReleve, setSelectedReleve] = useState(null);

    const handleRelevelClick = (id) => {
      const releve1 =  releves.find((releve)=>releve._id === id)
      setSelectedReleve(releve1);
    };
    const [editableReleve, seteditableReleve] = useState([])
    const [tempUnits, setTempUnits] = useState([]);
    const [selectedZone, setSelectedZone] = useState({ id: "all", zone: "Toutes" });

const handleEditReleve = (id)=>{
  const releve2 =  releves.find((p)=>p._id === id)
 
  const selectedZone = unite.filter((unite) => unite.reference?.slice(0,4) === releve2.ref_zone);
  setModalOpen(true) 
  setTempUnits(selectedZone)
seteditableReleve(releve2)
}
const handleUnitSelect = (selectedItem) => {
  setForm({ ...form, ref_zone_unite: selectedItem ,ref_zone: selectedItem.slice(0,4)});
};

  const handleZoneSelected = (selectedZone) => {
    if (selectedZone.id === 'all') {
      setActiveZone(selectedZone?.zone)
      setFilteredReleves(releves.filter((releve) => releve.id_releveur === userData._id));
    } else {
      setFilteredReleves(releves.filter((releve) => releve.id_releveur === userData._id && releve.ref_zone === selectedZone?.zone));
   setActiveZone(selectedZone?.zone)
    }
  };
   const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('https://urban-backend-theta.vercel.app/api/releve/getall');
      setRecords(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des enregistrements :', error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const [uniteResponse, zoneResponse,releveResponse] = await Promise.all([
        axios.get("https://urban-backend-theta.vercel.app/api/unite/getall"),
        axios.get("https://urban-backend-theta.vercel.app/api/zone/allzone/"),
        axios.get('https://urban-backend-theta.vercel.app/api/releve/getall')
      ]);

      if (uniteResponse.data && zoneResponse.data) {
        setUnite(uniteResponse.data);
        setReleves(releveResponse.data)
        setZone([{ id: 'all', name: 'Toutes' }, ...zoneResponse.data]);
      } else {
        console.error("Réponse invalide");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };
const handleEditRecord = (id) => {
  if (form.ref_zone === "" || form.ref_zone_unite === "" || form.nombre_compteur === "") {
    Alert.alert("Champs vides", "Veuillez remplir tous les champs", [
      { text: "OK" },
    ]);
  } else {
    setLoading(true); // Définir le loading à true avant l'envoi de la requête
    axios
      .put(`https://urban-backend-theta.vercel.app/api/releve/update/${id}`, {
        nombre_compteur: form.nombre_compteur,
        ref_zone: form.ref_zone,
        ref_zone_unite: form.ref_zone_unite,
      })
      .then((res) => {
        if (res.status === 200) {
          setForm({
            nombre_compteur: "",
            ref_zone: "",
            ref_zone_unite: "",
          });
          setModalOpen(false);
           setShowDetails(false);
          Alert.alert(
            "Relevé modifié",
            "Le relevé a été modifié avec succès",
            [
              {
                text: "OK",
              },
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert("Erreur", "Une erreur est survenue, veuillez réessayer", [
            { text: "OK" },
          ]);
        }
        setLoading(false); // Définir le loading à false après la réponse de la requête
      })
      .catch((error) => {
        console.error("Erreur lors de la modification du rélevé :", error);
        Alert.alert("Erreur", "Une erreur est survenue, veuillez réessayer", [
          { text: "OK" },
        ]);
        setLoading(false); // Définir le loading à false après la réponse de la requête
      });
  }
};
 //#072d4c  #ECF2FF
  return (
 <ScrollView 
    className="bg-[#ECF2FF] h-full"
       refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } >
    <SafeAreaView className="bg-[#ECF2FF] h-full" >
     <View style={{elevation:1}} className="flex py-3 px-5 space-y-10 bg-white">
    <View className="flex justify-between items-start flex-row mb-0">
                 <View>
                   <Text className="font-pmedium text-md text-black">
                   BTracker
                   </Text>
                   <Text className="text-2xl font-bold text-black">
               Mes enregistrements     </Text>
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
                 <View className="mx-5 mt-5 mb-2 flex flex-row justify-between ">
                 <Text className="text-black font-normal text-lg">Tous les rélevés ({filteredReleves.length})</Text>
                 <Text className="text-gray-700 text-base">{activeZone}</Text>
                
                 </View>
    <HorizontalFlatList onZoneSelected={handleZoneSelected} className="my-2" />

                 <ScrollView className="">

               <View className="flex-column  p-4 self-center gap-5 w-full">
  {filteredReleves.length === 0 ? (
    <View className=" items-center justify-center mt-12 ">
      <Text className="text-black text-lg justify-center">Aucun enregistrement pour cette zone.</Text>
    </View>
  ) : (
    filteredReleves.filter((releve) => releve.id_releveur === userData._id).map((releve) => (
      <TouchableOpacity
        style={{ elevation: 1 }}
        key={releve._id} // Utilisation de la clé unique ici
        onPress={() => setShowDetails(false)}
        onLongPress={() => {
          handleRelevelClick(releve._id);
          setShowDetails(true);
        }}
        delayLongPress={300}
        className="w-[100%]  border-r-black-200 border-collapse bg-white px-1 py-1  rounded-md center  flex-row justify-between"
      >
        <View className="flex-row justify-between gap-5">
          <View style={{ flexDirection: "column", gap: 10 }}>
            <Text className="text-red-500 font-bold text-md">
              {moment(releve.date_releveur).isSame(moment(), 'day') ? 'Aujourd\'hui' : moment(releve.date_releveur).isSame(moment().subtract(1, 'days'), 'day') ? 'Hier' : moment(releve.date_releveur).format('DD/MM/YYYY')} 
            </Text>
            <Text className="text-black text-xl ml-1 font-normal">{releve.ref_zone}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "column", gap: 10 }}>
          <Text className="text-blue-600 font-bold text-sm">{releve.ref_zone_unite}</Text>
          <Text className="text-black text-xl font-extrabold">{releve.nombre_compteur}</Text>
        </View>
        {selectedReleve?._id === releve._id && showDetails && (
          <View className="flex-row items-center  w-1/3 gap-1 justify-end">
            <TouchableOpacity
              onPress={() => handleEditReleve(releve._id)}
              className="rounded-md  w-auto"
            >
              <Image
                source={edit}
                className="w-8 h-10"
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleDeleteRecord(releve._id)} className="text-center rounded-md  w-auto">
              <Image
                source={delete2}
                className="w-9 h-9"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    ))
  )}
</View>
                 </ScrollView>
          
            <Modal
             animationType="fade"
             transparent={true}
             visible={modalOpen}
             onRequestClose={() => {
               Alert.alert('Modal has been closed.');
               setModalOpen(!modalOpen);
             }}
           >
         
           
           
           <View className="absolute -top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center">
             <View className="flex flex-1 justify-center items-center">
               <View className="bg-white p-6 rounded-lg shadow-lg">
                 <Text className="text-center text-black text-2xl 
                  font-normal mb-1">Modifier une entrée </Text>
                 <Text className="text-center text-red-600 text-xl 
                  font-semibold mb-2"> Date: {moment(editableReleve.date_releveur).isSame(moment(), 'day') ? 'Aujourd\'hui' : moment(editableReleve.date_releveur).format('DD/MM/YYYY')}</Text>
                
                 <SelectDropdown
                 onSelect={(item)=>handleUnitSelect(item.reference)}
                 data={tempUnits}
                 renderButton={(selectedItem, isOpened) => {
                   return (
                     <View  
                     className='  flex-row self-center justify-center 
                     p w-200 h-50 bg-slate-200 rounded-md'
                     style={styles.dropdownButtonStyle}>
                       <Text style={styles.dropdownButtonTxtStyle}>
                         {(selectedItem && selectedItem.reference) || editableReleve?.ref_zone_unite}
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
  value={editableReleve?.nombre_compteur || 0}
  onChangeText={handleNombreCompteurChange}
  className="text-black font-pmedium text-lg rounded-md"
  style={styles.dropdownButtonStyle}
  keyboardType="numeric"
  placeholder="Nombre de compteurs"
  placeholderTextColor="#7B7B8B"
/>

            {loading ?
              
              <View className="py-1 mt-10 w-60 self-center  px-3 rounded-md">
              <ActivityIndicator color="#072d4c" size={30}/> 
              </View>
              : 
              <View>
               <TouchableOpacity onPress={()=>handleEditRecord(editableReleve?._id)}
             className="bg-[#072d4c] py-1 mt-10 w-60 self-center  px-3 rounded-md"  >
             <Text className="text-white text-center rounded-md text-xl">Modifier</Text>
           </TouchableOpacity>
         
                 <TouchableOpacity
                   className=" py-1 mt-5 w-60 self-center bg-gray-400  px-2 rounded-md"
                   onPress={() => setModalOpen(!modalOpen)}
                 >
                   <Text className="text-white  text-center text-xl">Fermer</Text>
                 </TouchableOpacity>
              
              </View>}
                 </View>
             </View>
             </View>
           </Modal>
    
    </SafeAreaView>
       </ScrollView>

    
  );
}
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
  
  FlatListContainer:{
  flexWrap:"wrap",
    paddingBottom:5,
    width: "95%",
    alignSelf:"center",
    marginTop: 50,
    marginBottom:20,
    borderRadius: 12,
   backgroundColor:"red",
   // marginHorizontal:"10%",
    height: 50, // Modifier la hauteur selon vos besoins
  
    },

    title1:{
    color:"black"
    },
    item1:{
  
      borderRadius:12,
      backgroundColor:"lavender",
     backfaceVisibility:"visible",
    height:"auto",
   elevation:5,
   justifyContent:"center",
     // paddingVertical:15,
      paddingHorizontal:10,
      marginHorizontal:5
      },
  container: {
   // margin:1,
    marginTop: 20,
   // flexDirection: 'row',
    //flexWrap: 'wrap',
   // gap:0,
   alignItems:"center",
    justifyContent: 'center',
  },
  item: {
    padding:10,
    backgroundColor: 'white',
    height: 70,
    width: '90%',
    paddingVertical: 0,
    paddingHorizontal: 5,
    borderRadius: 4,
    marginBottom: 15,
   // marginTop: ,
    borderTopColor:"black",
    borderBottomColor:"black",
    //borderTopWidth:1,
   // borderBottomWidth:1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
scrollView:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:10

  },
  ScrollView:{
    top:20,
    marginBottom:30,
  
    },
    containerRecord:{
        marginTop:5,
        padding:2,
        borderRadius:10,
        //paddingTop:15,
        height:"100vh",
        overflow:"scroll",
        alignSelf:"center",
        width:"90%",
        flexDirection:"column",
        justifyContent:"space-between",
    },
separator:{
  marginTop:25,
    height:1,
    backgroundColor:"black",
    marginBottom:10,
    borderRadius:15,
    width:"50%",
    alignSelf:"center",
    },
tableOption:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:5,
    padding:1,
    marginLeft:"auto",
    marginRight:"auto",
     height:"auto",
    marginBottom:10, 
    },

  welcome:{
   alignSelf:"center",
  width:"90%",
    flexDirection:"row",
    justifyContent:"space-between",
marginTop:20,
marginLeft:"auto",
marginRight:"auto",
    height:"auto",
    borderRadius:7,
    padding:10,
  
  },
  textWelcome:{
    justifyContent:"center",
    color:"white",
    fontWeight:"500",
    fontSize:20,
    
    },
    textWelcome1:{
    fontSize:12,
    justifyContent:"center",
    color:"black",
    
    },
    title:{
      color:"black",
      fontSize:12,
      fontWeight:"bold"
    },
//Modal Styling 
centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    width:"60%",
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
  justifyContent:"space-between",
  flexDirection:"row",
 alignContent:"center",
padding:10,
alignItems:"center",
paddingVertical:5,
    elevation: 0,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    borderRadius:12,
    alignContent:"center",padding:2

  },
  buttonClose: {
    top:15,
    marginTop:15,
    textAlign:"right",
    backgroundColor: 'red',
   
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
    })