import {create} from 'zustand'

const useStore = create((set)=>({
    token: JSON.parse(localStorage.getItem("token")),
    dataChange:true,

    setCredentials:(token)=> set({token}),
    setDataChange:(value)=>set({dataChange:value})
}))

export default useStore