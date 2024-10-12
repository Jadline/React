import {useEffect} from "react"
export function useKey(targetkey,callback){
    useEffect(() => {
        function handlekeydown(e){
          if(e.code.toLowerCase() === targetkey.toLowerCase()){
            callback?.()
           
          }
        }
        document.addEventListener('keydown',handlekeydown)
        return () => {
          document.removeEventListener('keydown',handlekeydown)
        }
       
    },[targetkey,callback])
}