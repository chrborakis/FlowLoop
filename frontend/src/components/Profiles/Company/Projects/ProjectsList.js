import React, {useState,useEffect,useRef } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircleLoader } from 'react-spinners';
import { getProjects } from "./ProjectUtils";
import Project from './Project';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ProjectsList = ({company}) => {
    const [ projects, setProjects] = useState([]);
    const [ newProject, setNewProject] = useState();
    const [ loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect( () => {
        getProjects(company,setProjects, setLoading, setHasNextPage, currentPage)
    }, [company, currentPage]);

    // useEffect( () => {  
    //     if (newProject) {
    //         console.log('newProject:', newProject);
    //         setProjects((prevProjects) => [newProject.data, ...prevProjects]);
    //     }
    // }, [newProject])

    const loadMore = () => {
        if (hasNextPage && !loading) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (<>
        <div className="center-projects">
            <InfiniteScroll
                dataLength={projects?.length}
                next={loadMore}
                hasMore={hasNextPage} loader={<div className="loader-container"><CircleLoader color="#36d7b7" /></div>}
                endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
                pullDownToRefreshContent={<div style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</div>}
                releaseToRefreshContent ={<div style={{ textAlign: 'center' }}>&#8593; Release to refresh</div>}
            >
                {projects.map( project => 
                    project && <Project key={project.project_id} project={project}/>
                )}
            </InfiniteScroll>
        </div>
    </>);
}

export default ProjectsList