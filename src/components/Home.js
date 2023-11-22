import { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate  } from "react-router-dom";
import { useWindowDimensions } from './getWindowDimensions'
import Navbar from "./Navbar";
import { Input, useColorModeValue, Image } from '@chakra-ui/react';
import {DropDownContainer, DropDownHeader, DropDownListContainer, DropDownList, ListItem, options} from './DropDown'

function getMarginTop(height){
    return height/2-50 - height/6;
}

function getMarginLeft(width){
    return width/2-width/4;
}

const Home = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    function handleSearch(key) {
        if (key.keyCode === 13) {
            // navigate to /questions with searchValue as query parameter
            navigate(`/questions?search=${searchValue}`)
        }
    }    

    const searchTypes = ["questions", "users", "exercise"];
    const [searchType, setSearchType] = useState(searchTypes[0]);

    const { height, width } = useWindowDimensions();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Questions");

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
        console.log(selectedOption);
    };

    return (
        <div>
            <Navbar/>
            <div style={{
                position: 'relative',
                width: "100%",
                height:"100%",
                alignItems:'center',
                justifyContent:'center',
            }}>
                <div style={{
                    marginTop: getMarginTop(height),
                    marginLeft: getMarginLeft(width),
                    marginRight: getMarginLeft(width),
                }}>
                    <h1 style={{
                        fontSize: "54px",
                        fontWeight: "630",
                        textAlign: "center",
                        marginBottom: "30px",
                    
                    }}>
                        Queue Overflow
                    </h1>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}>
                        <Input
                            justifySelf={"center"}
                            height={"50px"}
                            maxW="100%"
                            placeholder="Search..."
                            borderColor={useColorModeValue('black.300', 'white')}
                            borderRadius="30px"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={(e) => {handleSearch(e)}}
                            fontWeight={"500"}
                            fontSize={"20px"}
                            paddingLeft={"30px"}
                            paddingRight={"30px"}
                            paddingBottom={"10px"}
                            paddingTop={"10px"}
                            marginRight={"20px"}
                        />
                        <DropDownContainer>
                            <DropDownHeader onClick={toggling}>
                                {selectedOption}
                                <Image src={require("../assets/down-arrow.png")} alt="down-arrow" width="15px" height="15px" style={{marginLeft:"10px",marginTop:"11px"}}/>
                            </DropDownHeader>
                            {isOpen && (
                            <DropDownListContainer>
                                <DropDownList>
                                {options.map(option => (
                                    <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                                    {option}
                                    </ListItem>
                                ))}
                                </DropDownList>
                            </DropDownListContainer>
                            )}
                        </DropDownContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;

