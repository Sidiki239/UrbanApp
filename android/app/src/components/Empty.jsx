import { StyleSheet, Text, View ,Image } from 'react-native'
import React from 'react'
import {images} from "../constants/images"
import CustomButton from './CustomButton'

const Empty = ({title , subtitle}) => {
  return (
    <View  className="justify-center items-center px-4">
      <Image source={images.empty}
      resizeMode='contain'
      className="w-[270px] h-[215px]"
      />
      <Text className="text-xl font-psemibold text-center mt-2  text-white">{title}</Text>
  
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
<CustomButton
title="Create video"
handlePress={()=>(<></>)}
containerStyles="w-full my-5"

/>
    </View>
  )
}

export default Empty

const styles = StyleSheet.create({})