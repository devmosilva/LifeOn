import React from 'react';

import PageHeader from '../../components/PageHeader';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import { AnyARecord } from 'dns';
import api from '../../services/api';

export interface Teacher {

        avatar: string,
        bio: string,
        cost: number,
        id: number,
        name: string,
        subject: string,
        user_id: number,
        whatsapp: string 
    
}
interface  TeacherItemProps {
    teacher: Teacher;
}


const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    function createNewConnection(){
      api.post('connections' , {
          user_id: teacher.id
      })  
    }

    const messageWhatsaap = 'teste'

return (
        <article className="teacher-item">
            <header>
            <img src={teacher.avatar} alt="Matheus Oliveira"/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
              {teacher.bio}
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>{teacher.cost}</strong>
                </p>
                <a onClick={createNewConnection} target='_blank' href={`https://wa.me/${teacher.whatsapp}?text=${messageWhatsaap}`} >
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>

)

}

export default TeacherItem;