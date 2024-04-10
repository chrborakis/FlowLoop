// import React, {useEffect, useState} from "react";
// import {Modal,Button, Form,Dropdown,Row,Col,Card } from "react-bootstrap"
// import { GoArrowRight } from "react-icons/go";

// const DivisionsForm = ({project}) => {
//     const [divisions, setDivisions] = useState([{ title: '', description: '' }]);

//     const handleAddDivision = () => setDivisions([...divisions, { name: '', value: '' }]);
  
//     const handleRemoveDivision = (index) => {
//         const newDivisions = [...divisions];
//         newDivisions.splice(index, 1);
//         setDivisions(newDivisions);
//     };
  
//     const handleInputChange = (index, event) => {
//       const newDivisions = [...divisions];
//       newDivisions[index][event.target.name] = event.target.value;
//       setDivisions(newDivisions);
//     };
  
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log(divisions);
//     };
  
//     return(<>
//         <Form className='form' onSubmit={handleSubmit}>
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Project Divisions{project}
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//             {divisions.map((division, index) => (
//                 <div key={index}>
//                     <Card>
//                     <Form.Group as={Col} className="mb-8" controlId={`field-${index}`}>
//                         <Form.Label>Title</Form.Label>
//                         <Form.Control type="text" name="name" required
//                             value={division.name} onChange={(e) => handleInputChange(index, e)}
//                         />
//                     </Form.Group>
//                     <Form.Group as={Col} className="mb-3" controlId={`value-${index}`}>
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control name="description" type="text" as="textarea" rows={4} 
//                             placeholder="Insert a description..."  required
//                             value={division.description} onChange={(e) => handleInputChange(index, e)}
//                         />
//                     </Form.Group>
//                     <Card.Footer>
//                         <Button variant="danger" onClick={() => handleRemoveDivision(index)}>Remove</Button>
//                     </Card.Footer>
//                     </Card>
//                 </div>
//             ))}
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="primary" onClick={handleAddDivision}>Add Division</Button>
//                 <Button variant="success" type="submit">Submit</Button>
//             </Modal.Footer>
//         </Form>
//     </>)
// }

// export default DivisionsForm

