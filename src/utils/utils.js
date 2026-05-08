import { useNavigate } from "react-router"

export const logOut = ()=>{
    localStorage.clear('id')
    const navigate = useNavigate()
    navigate('/')
}
