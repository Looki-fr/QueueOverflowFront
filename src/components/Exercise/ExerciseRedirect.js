import { useEffect } from "react"

import { useNavigate  } from "react-router-dom";
export const ExerciseRedirect = () => {
    const navigate = useNavigate()
    useEffect(() => {
        // get parameter from url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        navigate(`/exercise?id=${id}`)
    }, []);
    return (
        <div>
            
        </div>
    )
}