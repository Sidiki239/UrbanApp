import React , { useRef ,useState,useEffect} from 'react'
import {ScrollView, 
Image, Button,
  Pressable, DrawerLayoutAndroid,FlatList,
  Alert, Text, View, SafeAreaView, ImageBackground ,StatusBar} from 'react-native';
  import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { icons } from '../constants';
import Signin from '../auth/Signin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Records from './records';
import Create from './create';
import Profile from './profile';
import Dashboard from './dashboard';
const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xm`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};
export default function Navigation() {
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
          // Vérifier la validité du token
          if (await isTokenValid(storedToken)) {
            navigation.navigate('layout');
            
            
          } else {
            // Rediriger vers la page de connexion
            navigation.navigate('signin');
          }
        } else {
          // Rediriger vers la page de connexion
          navigation.navigate('signin');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du token', error);
        // Rediriger vers la page de connexion
        navigation.navigate('signin');
      }
    };
  
    fetchData();
  }, [navigation]);
  
//#072d4c  #ECF2FF

  return (
  <NavigationContainer independent={true} >
    <View className='flex-1 '>

    

    <Tab.Navigator
    screenOptions={({route}) => ({
      headerTransparent:false,
     tabBarActiveTintColor:"#ECF2FF",
      tabBarInactiveTintColor: "gray",
      tabBarLabelStyle: { fontSize: 10 , color:"black"},
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        backgroundColor:"#072d4c",
        width: "100%",
        height:70,
      //  borderTopWidth:0.3,
       // borderTopColor:"#ECF2FF",
        alignSelf:"center",
        elevation:0,bottom:0,borderRadius:0,paddingVertical:10
     },
  
    })}>

<Tab.Screen
  name="home1"
  component={Dashboard}
  options={{
    tabBarHideOnKeyboard:true,
    tabBarShowLabel:false,
    tabBarLabel: 'Accueil',
    headerShown: false,
    tabBarIcon: ({ focused , color }) => (
      <TabIcon
      icon={icons.home}
      color={color}
      name="Accueil"
      focused={focused}
    />
    )
  }}
/>
<Tab.Screen
  name="records"
  component={Records}
  options={{
    tabBarHideOnKeyboard:true,
    tabBarShowLabel:false,
    tabBarLabel: 'New',
    headerShown: false,
    tabBarIcon: ({ focused , color }) => (
      <TabIcon
      icon={icons.bookmark}
      color={color}
      name="Rélevés"
      focused={focused}
    />
    ),
  }}
/>
<Tab.Screen
  name="create"
  component={Create}
  options={{
    tabBarHideOnKeyboard:true,
    tabBarShowLabel:false,
    tabBarLabel: 'New',
    headerShown: false,
    tabBarIcon: ({ focused ,color }) => (
      <TabIcon
      icon={icons.plus}
      color={color}
      name="Ajouter"
      focused={focused}
    />
    ),
  }}
/>
<Tab.Screen
  name="profile"
  component={Profile}
  options={{
    tabBarHideOnKeyboard:true,
    tabBarShowLabel:false,
    tabBarLabel: 'New',
    headerShown: false,
    tabBarIcon: ({ focused , color }) => (
      <TabIcon
      icon={icons.profile}
      color={color}
      name="Profile"
      focused={focused}
    />
    ),
  }}
/>
  </Tab.Navigator>

</View>
 

</NavigationContainer>
  )

}


