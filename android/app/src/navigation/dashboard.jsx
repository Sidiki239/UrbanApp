import { useState , useEffect} from "react";
import { FlatList,TouchableOpacity,RefreshControl, Image, Pressable, SafeAreaView,ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from "react-native";
 import logo from "../assets/logo/logo.png"
import { useNavigation } from '@react-navigation/native';
import axios from "axios"
import moment from 'moment';


function Dashboard()  {
  const [userData, setUserData] = useState(null);
  const [releves, setReleves] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation1 = useNavigation()


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



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ releveResponse, userResponse] = await Promise.all([
  
         axios.get("https://urban-backend-theta.vercel.app/api/releve/getall"),
          axios.get("https://urban-backend-theta.vercel.app/api/user/getAllUser"),
        ]);

        if ( releveResponse.data && userResponse.data) {
         
        setReleves(releveResponse.data);
          setUser(userResponse.data);
        } else {
          console.error("Réponse invalide");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const [ releveResponse, userResponse] = await Promise.all([
      axios.get("https://urban-backend-theta.vercel.app/api/releve/getall"),
        axios.get("https://urban-backend-theta.vercel.app/api/user/getAllUser"),
      ]);

      if ( releveResponse.data && userResponse.data) {
 
        setReleves(releveResponse.data);
        setUser(userResponse.data);
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
    onRefresh();
  }, []);


  function getTotalParMois(releves) {
    const totaux = {};
  
    releves.filter((releve) => releve.id_releveur === userData?._id).forEach((releve) => {
      const moisAnnee = `${new Date(releve.date_releveur).getMonth() + 1}/${new Date(releve.date_releveur).getFullYear()}`;
      const nombre_compteur = releve.nombre_compteur || 0; // Renvoyer 0 si nombre_compteur est null
      if (totaux[moisAnnee]) {
        totaux[moisAnnee] += nombre_compteur;
      } else {
        totaux[moisAnnee] = nombre_compteur;
      }
    });
  
    return Object.entries(totaux).map(([moisAnnee, total]) => ({ moisAnnee, total }));
  }
const userRelevesCount = releves
  .filter(releve => releve?.id_releveur === userData?._id)
  .reduce((acc, releve) => acc + releve.nombre_compteur, 0);

    const [modalVisible, setModalVisible] = useState(false);

const HorizontalFlatList = () => {
  const monthlyTotals = getTotalParMois(
    releves.filter((releve) => releve.id_releveur === userData?._id)
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        marginTop: 20,
        width:100,
        marginLeft: -5,
        marginRight: 15,
        elevation:1
       // height: 60,
      }}
      className="flex justify-between w-auto p-3 bg-white   flex-column rounded-xl"
    >
      <View className="  ">
        <Text className="text-black text-xl font-semibold capitalize"
          style={[
            styles.monthText,
            new Date().getMonth() + 1 === parseInt(item.moisAnnee.split('/')[0])
              ? styles.currentMonthText
              : null,
          ]}
        >
          {new Date(2023, parseInt(item.moisAnnee.split('/')[0]) - 1, 1).toLocaleString(
            'default',
            { month: 'long' }
          )}  {' '}
      
        </Text>
        <Text className="text-red-600 font-normal text-2xl mt-2 "
          style={[
            styles.totalText,
            new Date().getMonth() + 1 === parseInt(item.moisAnnee.split('/')[0])
              ? styles.currentMonthText
              : null,
          ]}
        >
          {item.total}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      className=" pr-15"
      data={monthlyTotals}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};
 
//#ECF2FF  #072d4c
  return (
    <SafeAreaView className=" flex h-full bg-[#ECF2FF]">
    <ScrollView className=" flex h-full bg-[#ECF2FF]"  refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
  
    <View style={{elevation:1}} className="flex py-3 px-5 space-y-10 bg-white">
    <View className="flex justify-between items-start flex-row mb-0">
                 <View>
                   <Text className="font-pmedium text-md text-black">
                   BTracker
                   </Text>
                   <Text className="text-2xl font-bold text-black">
           Dashboard     </Text>
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

<View>
                
<View className=" my-2 px-2 space-y-5">
<TouchableOpacity className="mt-5"  >
  <View  style={{elevation:1,border:"1px solid black",borderColor:"black"}}  className="flex justify-between bg-white   flex-column gap-4  rounded-xl w-[97%] m-auto">
     <Text className="text-black text-left  text-psemibold text-xl">
             Totals des compteurs </Text>
 <Text className="text-black text-left font-semibold text-5xl">
 {userRelevesCount}   </Text>
  </View>
</TouchableOpacity>

<HorizontalFlatList/>
<View className="mx-5  flex flex-row justify-between  ">
  {(releves?.filter((releve) => releve.id_releveur === (userData?._id)).length === 0) ? (
    <Text className="text-black justify-center mt-3 center text-2xl">Aucune entrée ajoutée.</Text>
  ) : (
    <>
      <Text className="text-black text-xl">Derniers rélevés</Text>
      <TouchableOpacity onPress={() => navigation1.navigate("records")}>
        <Text className="text-gray-900 text-base">Voir tout</Text>
      </TouchableOpacity>
    </>
  )}
</View>
<View className="flex-column   px-4 mx-5 self-center    w-full -mt-5  ">
{releves.slice(0,6).filter((releve) => releve.id_releveur === (userData && userData._id ? userData._id.toString() : '')).map((zone) => (
 <TouchableOpacity style={{elevation:1}}  key={zone._id}
 
 className="w-[100%]  border-r-black-200 border-collapse mt-5 bg-white px-1 py-1  rounded-md center  flex-row justify-between " >

<View className="flex-row justify-between gap-5 ">
<View style={{flexDirection:"column",gap:10}}>
<Text className="text-red-500 font-bold text-md" >    
<Text>
{
moment(zone.date_releveur).isSame(moment(), 'day')
? 'Aujourd\'hui'
: moment(zone.date_releveur).isSame(moment().subtract(1, 'days'), 'day')
? 'Hier'
: moment().diff(moment(zone.date_releveur), 'days') < 7
? `Il y a ${moment().diff(moment(zone.date_releveur), 'days')} jours`
: moment(zone.date_releveur).format('DD/MM/YYYY')
}
</Text>
</Text>
<Text  className="text-black text-xl ml-1 font-normal">{zone.ref_zone}</Text>
</View>
</View>
<View style={{flexDirection:"column",gap:10}}>
<Text className="text-blue-600 font-bold text-md" >{zone.ref_zone_unite}</Text>
<Text  className="text-black text-xl font-extrabold">{zone.nombre_compteur}</Text>
</View>
 </TouchableOpacity>
))}
</View>
  </View>
  </View>
    <View>
    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Hello World!</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Fermer</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
 
</View>
</ScrollView>
  </SafeAreaView>


  );
};

const styles = StyleSheet.create({
 
  
  flatListContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    marginRight: 16,
    borderRadius: 8,
  },


  
//Modal Styling 
centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  button1: {
    justifyContent:"space-between",
    flexDirection:"row",
   alignContent:"center",
  padding:10,
  borderColor:1,
  borderColor:1,
  alignItems:"center",
  paddingVertical:5,
      elevation: 0,
    },
  button: {
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    top:3,
    fontSize:13,
    color: '#F19233',
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
export default Dashboard;