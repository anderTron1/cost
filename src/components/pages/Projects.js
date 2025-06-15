
import { useLocation } from "react-router-dom"

import Message from "../layout/Message"
import Container from "../layout/Container"
import Loading from "../layout/Loading"
import LinkButton from "../layout/LinkButton"

import styles from "./Projects.module.css"
import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from "react"

function Projects(){
    
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: "GET",
                HEADERS: {
                    "Content-Type": "application/json",
                },
            }).then((resp) => resp.json())
            .then((data) =>{
                console.group(data)
                setProjects(data)
                setRemoveLoading(true)
            }).catch((err) => console.log(err))
        }, 3000)
    }, [])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(resp => resp.json())
        .then(()=> {
            setProjects(projects.filter((projects) => projects.id !== id))
            //message
            setProjectMessage("Projeto removido com sucesso!")
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message}/>}
            {projectMessage && <Message type="success" msg={projectMessage}/>}
            <Container customClasse="start">
                {projects.length > 0 && 
                    projects.map((projects) => (
                        <ProjectCard 
                        id={projects.id}
                        name={projects.name}
                        budget={projects.budget}
                        category={projects.category.name}
                        key={projects.id}
                        handlerRemove={removeProject}
                         />
                    ))}
                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 &&
                        <p>Não há projetos cadastrados!</p>
                    }
            </Container>
        </div>
    )
}


export default Projects