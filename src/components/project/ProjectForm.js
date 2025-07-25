
import {useState, useEffect} from 'react'

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({ handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    
    // a exemplo, quando o componente é montado, ele é um 
    // o useInsertionEffect é executado antes do useEffect, ainda na fase de montagem do componente.
    // Isso é útil para garantir que certas operações sejam concluídas antes de qualquer renderização do componente.
    // O useInsertionEffect é usado principalmente para manipulações de DOM que precisam ocorrer antes da renderização, como adicionar classes CSS ou estilos inline.
    // O useInsertionEffect é executado antes do useLayoutEffect e do useEffect, garantindo que as alterações sejam aplicadas antes que o navegador pinte a tela.       
    useEffect(()=>{
        fetch("http://localhost:5000/categories", {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
        }).then((resp)=> resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" text="Nome do projeto " name="name" placeholder="Insira o nome do projeto" handleOnChange={handleChange} value={project.name ? project.name : ""}/>
            <Input type="number" text="Orçamento total " name="budget" placeholder="Insira o orçamento total"  handleOnChange={handleChange} value={project.budget ? project.budget : ""}/>
            <Select  name="category_id" text="Selecione a categoria" options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ""}/>
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm;