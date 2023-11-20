import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import Question from './Question';
import { useWindowDimensions } from './getWindowDimensions'
import {SideBar} from './Sidebar'
import Navbar from "./Navbar";

const UserList = () => {
    return (
        <div>
            <Navbar/>
            <SideBar display={{md: 'unset' }} />
            <div>
                <h1>UserList</h1>
            </div>
        </div>
    )
}

export default UserList