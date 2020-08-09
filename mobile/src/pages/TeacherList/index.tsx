import React, { useState } from 'react';
import { View , Text , TextInput} from 'react-native'
import { Feather} from '@expo/vector-icons'

import styles from './styles'
import PageHeader from '../../components/PageHeader';
import TeacherItem ,{ Teacher }from '../../components/TeacherItem';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([])
    const [teachers, setTeachers] = useState([])

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(res => {
            if(res){
                const favoritedTeachers = JSON.parse(res);
                const favoritedTeachersIds = favoritedTeachers.map((teachers:Teacher) => {
                    return teachers.id;
                })
                setFavorites(favoritedTeachersIds)
            }   
        })
    }

    useFocusEffect(() =>{
        loadFavorites();
    })

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit(){
        loadFavorites();
       const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
        
            }})
            
            setIsFiltersVisible(false)
            setTeachers(response.data) 
                
    }

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    return (

        <View style={styles.container} >
            <PageHeader  title="Serviços disponíveis" 
            headerRight={(
                        <BorderlessButton onPress={handleToggleFiltersVisible}>
                            <Feather name="filter" size={20} color="#FFF" />
                        </BorderlessButton>
            )}>
                  {isFiltersVisible &&( <View style={styles.searchForm}>
                        <Text style={styles.label}> Serviço</Text>
                        <TextInput style={styles.input}
                        value={subject}
                        onChangeText={text => setSubject(text)}
                        placeholder="Qual a matéria"
                        placeholderTextColor="#cbcc" />
                    
                    
                    <View style={styles.inputGroup}>
                            <View style={styles.inputBlock} >

                                 <Text style={styles.label}> Dia da semana</Text>
                                 <TextInput style={styles.input}
                                  value={week_day}
                                  onChangeText={text => setWeekDay(text)}
                                 placeholder="Qual o dia?" 
                                 placeholderTextColor="#cbcc"/>

                            </View>

                             <View style={styles.inputBlock} >

                                 <Text style={styles.label}> Horario </Text>
                                 <TextInput style={styles.input}
                                  value={time}
                                  onChangeText={text => setTime(text)}
                                 placeholder="Qual horario?" 
                                 placeholderTextColor="#cbcc"/>
                                    </View> 
                            </View>

                            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Buscar</Text>

                            </RectButton>
                  </View> )}
            </PageHeader>

           
            <ScrollView style={styles.teacherlist}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
            }} >
              {teachers.map((teacher: Teacher) => (
                    <TeacherItem key={teacher.id} 
                    teacher={teacher} 
                    favorited={favorites.includes(teacher.id)}/>
                ))}
         
            </ScrollView>
        </View>
    )
}

export default TeacherList;