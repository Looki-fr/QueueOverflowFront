import { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate  } from "react-router-dom";
import { useWindowDimensions } from './getWindowDimensions'
import Navbar from "./Navbar";
import { Input, useColorModeValue, Image, Text, Icon } from '@chakra-ui/react';
import {DropDownContainer, DropDownHeader, DropDownListContainer, DropDownList, ListItem, options} from './DropDown'
import { BsSearch } from "react-icons/bs";

function getMarginTop(height){
    return height/2-50 - height/6;
}

function getMarginLeft(width){
    if (width>1000) {
    return width/2-width/4;
    }
    return width/2-width/2.5;
}
const Home = (props) => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    function handleSearch(key) {
        if (key.keyCode === 13) {
            if (selectedOption === "Questions") {
                navigate(`/questions?search=${searchValue}`)
            } else if (selectedOption === "Your Questions") {
                navigate(`/yourQuestions?search=${searchValue}`)
            } else if (selectedOption === "Exercises") {
                navigate(`/exercises?search=${searchValue}`)
            }
        }
    }    

    const { height, width } = useWindowDimensions();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Questions");

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
    };

    useEffect(() => {
        props.setLastPage("/home");
    }, []);

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

                    <Text
                        fontSize={width>700 ? "6xl" : "4xl"}
                        fontWeight="bold"
                        color={useColorModeValue('black', 'white')}
                        textAlign="center"
                    >
                        Queue Overflow
                    </Text>
                    
                    <div style={{
                        display: "flex",
                        flexDirection: width>700 ? "row" : "column",
                        justifyContent: "flex-start",
                        alignItems: width>700?"flex-start":"center",
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            marginRight:width>700?"20px":"0px",
                            marginTop:width>700 ? "0px" : "50px",
                            width: "100%",
                        }}>
                            <Input
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
                            />
                            {width<=700 && (
                                <div onClick={() => handleSearch({keyCode:13})} style={{
                                    paddingTop:"5px",
                                    marginLeft:"10px",
                                    marginTop:"5px",
                                    }}>
                                    <Icon
                                        as={BsSearch}
                                        cursor="pointer"
                                        w={"30px"}
                                        h={"30px"}
                                    />
                                </div>
                            )}
                        </div>
                        <div style={{
                            marginTop: width>700 ? "0px" : "50px",
                        }}>
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
        </div>
    );
}
export default Home;

