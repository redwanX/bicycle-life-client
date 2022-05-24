import axios from "axios";
import { useEffect, useState } from "react"

const useToken = user =>{
    const [token, setToken] = useState('');
    useEffect( () =>{
        const email = user?.user?.email || user?.email;
        if(email){
            console.log(user?.user);
            console.log(user);
            axios.put(`http://localhost:5000/login/${email}`,user.user)
            .then(data => {
                const accessToken = data.data.token;
                localStorage.setItem('accessToken', accessToken);
                setToken(accessToken);
            })
        }

    }, [user]);
    return [token];
}
export default useToken