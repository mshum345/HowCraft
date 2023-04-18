import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import Navbar from '../components/Navbar';
import { 
    Box, 
    Heading,
    Input,
    Button,
    Flex
} from "@chakra-ui/react";

const Admin = () => {
    var createdSuccess = false;
    const [craft, setCraft] = React.useState([]); //For the get method
    
    const [remove, setRemove] = useState({ //For the delete method
        RecipeID: "", //corresponds to the name of the field in the json body
    });
    const [createResults, setCreateResults] = React.useState([]);
    const [create, setCreate] = useState({ //For the delete method
        MaterialName: "", //corresponds to the name of the field in the json body
    });
    const [updateResults, setUpdateResults] = React.useState([]);
    const [update, setUpdate] = useState({ //For the delete method
        MaterialName: "", //corresponds to the name of the field in the json body
    });
    useEffect(() => {
        const getCraft = async () => {
            try{
                const res =await axios.get("http://localhost:8080/") //this is the backend endpoint
                    setCraft(res.data); //set the state to the data returned from the backend
            }
            catch(err){
                console.error(err.message); //console log the error
            }
        }
        getCraft(); //call the function
    }, []);

    const handleChange = (e) => {
        setRemove(prev => ({...prev, [e.target.name]: e.target.value})); //set the state to the value of the input
        setCreate(prev => ({...prev, [e.target.name]: e.target.value})); 
        setUpdate(prev => ({...prev, [e.target.name]: e.target.value})); 
    }

    const handleRemove = async (id) => {
        try {
            console.log(remove)
            const res = await axios.delete("http://localhost:8080/admin/delete/" + id); //this is the backend endpoint
            console.log(res.data)
            setRemove({ RecipeID: "" }); // reset the form
        } catch(err) {
            console.error(err.message); //console log the error
        }
    };

    const handleCreate = async () => {
        try {
            const res = await axios.post("http://localhost:8080/admin", create); //this is the backend endpoint
            setCreateResults(res.data);
            console.log(res.data)
            setCreate({ MaterialName: "" }); // reset the form
            createdSuccess = true;
        } catch(err) {
            console.error(err.message); //console log the error
            createdSuccess = false;
        }
    };

    const handleUpdate = async (id) => {
        try {
            console.log(update)
            const res = await axios.put("http://localhost:8080/admin/update/" + id); //this is the backend endpoint
            console.log(res.data)
            setUpdate({ MaterialName: "" }); // reset the form
        } catch(err) {
            console.error(err.message); //console log the error
        }
    };

    function ifCreated(createdSuccess) {
        if (!createdSuccess) {
            return null;
        }
        else {
            return (
                <h1>
                    Successfully inserted material!
                </h1>
            )
        }
    }

    return (
        <Box bg="#593d29" h="100%" minH="100vh" pb={5}>
            <Navbar />
            <Input type="text" bg="whiteAlpha.100" w="25%" onChange={handleChange} name="RecipeID" placeholder="Delete Recipe ID..."></Input>
            <Button type="button" onClick={()=>handleRemove(remove.RecipeID)}>Delete</Button>

            <Input type="text" bg="whiteAlpha.100" w="25%" onChange={handleChange} name="MaterialName" placeholder="Create Material..."></Input>
            <Button type="button" onClick={handleCreate}>Create</Button>

            <Input type="text" bg="whiteAlpha.100" w="25%" onChange={handleChange} name="MaterialName" placeholder="Edit Item..."></Input>
            <Button type="button" onClick={()=>handleUpdate(update.MaterialName)}>Edit</Button>
            
            <Flex direction="column" align="center">
                
            </Flex>
        </Box>
    );
}

export default Admin;
