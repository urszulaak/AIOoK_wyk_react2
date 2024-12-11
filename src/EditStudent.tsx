import { useState } from 'react';
import { StudentClass } from './types/Student';

type StudentPropsType={
    student:StudentClass;
    editFn:(new_student:StudentClass)=>void;
    cancelFn: () => void;
}

export default function EditStudent(props: StudentPropsType): React.ReactElement {
    const [editedStudent, changeEditStudentData] = useState({
        name: props.student.Name,
        surname: props.student.Surname,
        index_nr: props.student.Index_nr,
        dataUrodzenia: props.student.dataUrodzenia.toISOString().split('T')[0],
        adres: props.student.adres,
        grupa: props.student.grupa,
        stypendium: props.student.stypendium,
        marks: [...props.student.marks],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        changeEditStudentData(prev => ({
          ...prev,
          [name]: name === 'index_nr' 
            ? (value === '' ? 0 : parseInt(value, 10))
            : value
        }));
      };

    const saveChanges = (): void => {
        const updatedStudent = new StudentClass(
            editedStudent.name,
            editedStudent.surname,
            editedStudent.index_nr,
            new Date(editedStudent.dataUrodzenia)
        );
        updatedStudent.adres = editedStudent.adres;
        updatedStudent.grupa = editedStudent.grupa;
        updatedStudent.stypendium = Number(editedStudent.stypendium);
        updatedStudent.marks = [...editedStudent.marks];
    
        props.editFn(updatedStudent);
        };
  
        return (
            <>
              <div>
                Name: <input 
                  type="text" 
                  name="name" 
                  value={editedStudent.name} 
                  onChange={handleChange} 
                />
                Surname: <input 
                  type="text" 
                  name="surname" 
                  value={editedStudent.surname} 
                  onChange={handleChange} 
                />
                Date of birth: <input 
                  type="date" 
                  name="dataUrodzenia" 
                  value={editedStudent.dataUrodzenia} 
                  onChange={handleChange} 
                />
                <button onClick={saveChanges}>Save</button>
                <button onClick={props.cancelFn}>Cancel</button>
              </div>
            </>
        );
}

