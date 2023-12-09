import { useEffect } from "react"
import { useNavigate  } from "react-router-dom";
export const QuestionRedirect = () => {
    const navigate = useNavigate()
    useEffect(() => {
        // get parameter from url
        navigate(`/yourQuestions`)
    }, []);
    return (
        <div>
            
        </div>
    )
}