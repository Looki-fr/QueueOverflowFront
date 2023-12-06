import { useEffect } from "react"

export const ExerciseRedirect = () => {
    useEffect(() => {
        // get parameter from url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        window.location.replace(`http://localhost:3000/exercise?id=${id}`)
    }, []);
    return (
        <div>
            
        </div>
    )
}