import axios from "axios";
import { useEffect, useState } from "react"

const useAdmin =(user)=> {
    const [admin, setAdmin] = useState(false);
    const [isAdminLoading, setisAdminLoading] = useState(true);
    useEffect(()=>{
        const email =user?.email;
        if(email){
            axios.get(`https://serene-meadow-57507.herokuapp.com/admin/${email}`, {
                headers: {authorization: `Bearer ${localStorage.getItem('accessToken')}`}
            })
            .then(data => {
                setAdmin(data?.data?.admin);
                setisAdminLoading(false);
            })
            .catch(err=>{
                setisAdminLoading(false)
            })
        }
        else{
            setisAdminLoading(false);
        }
    }, [user])

    return [admin, isAdminLoading]
}

export default useAdmin;