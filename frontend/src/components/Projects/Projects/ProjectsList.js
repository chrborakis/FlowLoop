import React, {useState,useEffect,useRef, useMemo } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircleLoader } from 'react-spinners';
import { getProjects } from "./ProjectUtils";
import Project from './Project';
import Button from '@mui/material/Button';


import NewProject from "./NewProject";

const ProjectsList = ({company}) => {
    const [ projects, setProjects] = useState([]);
    const [ newProject, setNewProject] = useState(null);
    const [ loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    const [newProjModal, setNewProjModal] = useState(false);

    const end_message = projects?.length === 0 ? "No projects found!" : "You have seen all projects!"

    useEffect( () => {
        getProjects(company,setProjects, setLoading, setHasNextPage, currentPage)
    }, [company, currentPage]);

    useEffect( () => {
        if (newProject) {
            setProjects(prevProjects => [newProject, ...prevProjects]);
        }
    },[newProject])

    const loadMore = () => {
        if (hasNextPage && !loading) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (<>
        <div className="center-projects">
            <Button variant="contained" color="primary" onClick={() => setNewProjModal(true)}>New Project</Button>
            <NewProject company={company} show={newProjModal} onHide={() => setNewProjModal(false)} setNewProject={setNewProject}/>  
            
            <InfiniteScroll
                dataLength={projects?.length}
                next={loadMore}
                hasMore={hasNextPage} loader={<div className="loader-container"><CircleLoader color="#36d7b7" /></div>}
                endMessage={<p style={{ textAlign: 'center' }}><b>{end_message}</b></p>}
                pullDownToRefreshContent={<div style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</div>}
                releaseToRefreshContent ={<div style={{ textAlign: 'center' }}>&#8593; Release to refresh</div>}
            >
            {projects?.length > 0 && (
                projects.map( project => 
                    project && <Project key={project.project_id} project={project} setProjects={setProjects}/>
                )
            )}
            </InfiniteScroll>
        </div>
    </>);
}

export default ProjectsList