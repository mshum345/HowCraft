import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import Navbar from '../components/Navbar';
import { 
    Box, 
    Heading,
    Flex,
    Input,
    Button
} from "@chakra-ui/react";

const Home = () => {
    const [craft, setCraft] = React.useState([]); //For the get method
    const [searchResults, setResults] = React.useState([]);
    const [search, setSearch] = useState({ //For the post method
        ItemName: "", //corresponds to the name of the field in the json body
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
        setSearch(prev => ({...prev, [e.target.name]: e.target.value})); //set the state to the value of the input
    }

    const handleSearch = async () => {
        try {
            const res = await axios.post("http://localhost:8080/search", search); //this is the backend endpoint
            setResults(res.data);
            console.log(res.data);
            setSearch({ ItemName: "" }); // reset the form
        } catch(err) {
            console.error(err.message); //console log the error
        }
    };

    return (
        <Box bg="#593d29" h="100%" minH="100vh" pb={5}>
            <Navbar />
            <Input type="text" bg="whiteAlpha.100" w="25%" onChange={handleChange} name="ItemName" placeholder="Search..."></Input>
            <Button type="button" onClick={handleSearch}>Search</Button>
            
            <Flex direction="column" align="center">
                {searchResults.map((search) => (
                    <Heading>
                        {search.MaterialName}
                    </Heading>
                ))}
            </Flex>
            <div id="search-results"></div>
            <Flex direction="column" align="center">
                {/* {craft.map((craft) => (
                    <Heading>
                        {craft.ItemName}
                    </Heading>
                ))} */}
            </Flex>
        </Box>
    );
}

export default Home;