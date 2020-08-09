import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, } from 'react-native'
import landingImg from '../../assets/images/landing.png'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import studyIcon from '../../assets/icons/study.png'
import classesIcon from '../../assets/icons/give-classes.png'
import heartIcon from '../../assets/icons/heart.png'
import GiveClasses from '../GiveClasses';
import {  useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api';

function Landing(){

    const [totalConnections, setTotalConnections] = useState(0);

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        api.get('connections').then(res => {
            const {total} = res.data
            setTotalConnections(total)
        })
    }, [])   

    useEffect(() =>{
        AsyncStorage.getItem('favorites').then(res => {
            if (res){
                setFavorites(JSON.parse(res))
            }
        })
        
    }, [])
    const { navigate } = useNavigation();

    //chamando a proxima aba
    function handleNavigateToGiveClassesPage(){
      navigate('GiveClasses')
    }

    function handleNavigateToStudyPages(){
        navigate('Study')
    }
    return(
        <View style={styles.container}>
           <Image style={styles.banner} source={landingImg} />
           <Text style={styles.title}>
               App em construção... {'\n'}
               <Text style={styles.titleBold}> Oq deseja fazer? </Text>
           </Text>

            <View style={styles.buttonsContainer} >
                <RectButton onPress={handleNavigateToStudyPages} style={[styles.button, styles.buttonPrimary]} >
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}> Estudar </Text>
                </RectButton> 

                <RectButton  onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]} >
                    <Image source={classesIcon} />
                    <Text style={styles.buttonText}> Dar aula </Text>
                </RectButton> 

            </View>

            <Text style={styles.totalConnections} >
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon} />
            </Text>

            
           
        </View>
    );
}

export default Landing;
