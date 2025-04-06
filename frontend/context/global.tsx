'use client'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'

interface GlobalContextProviderProps{
    children:ReactNode
}
interface currentProduct{
    id?:string
    name:string
    image:string
    price:string
    created_at?:string

}
interface GlobalContextType{
    products:string[]
    loading:Boolean
    error:string | null
    currentProduct:currentProduct
    setError:Dispatch<SetStateAction<string | null>>
    setLoading:Dispatch<SetStateAction<Boolean>>
    setProducts:Dispatch<SetStateAction<string[]>>
    fetchProducts:any
    deleteProduct:any
    addProduct:any
    fetchProduct:any
    updateProduct:any
}
export const GlobalContext = createContext<GlobalContextType | null>(null)


const GlobalContextProvider:React.FC<GlobalContextProviderProps> = ({children}) => {
    const [products,setProducts] = useState<string[]>([])
    const [loading,setLoading] = useState<Boolean>(false)
    const [error,setError] = useState<string | null>(null)
    const [currentProduct,setCurrentProduct] = useState<currentProduct>({name:"",id:"",image:"",price:""})

    const fetchProducts = async() => {
        setLoading(true)
        try {
            const data = await fetch(`http://localhost:5000/api/products`,{
                method:"GET"
            })
            const res = await data.json()
            setProducts(await res.data)
            setError(null)
        } catch (error:any) {
            if(error?.status == 429) {setError("Rate limit exceeded"); setProducts([])}
            else setError("Something went wrong")
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    const deleteProduct = async (id:string)=> {
        setLoading(true)
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`,{
                method:"DELETE",
            })
            setProducts((prev)=>prev.filter((product:any)=> product.id !== id))
            toast.success("Product deleted successfully")
        } catch (error:any) {
            toast.error("somethign went wrong")
            setError("Something went wrong")
            console.log(error)
        }finally{
            setLoading(false)
        }
        
        } 

    const addProduct = async (form:{name:string,image:string,price:string}) => {
        console.log(form)
        setLoading(true)
        try {
            const res = await fetch(`http://localhost:5000/api/products`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json", // Set content type as JSON
                },
                body: JSON.stringify(form)
            })
            const {data} = await res.json()
            console.log(data)
            setProducts((prev) => [...prev,data]) 
            toast.success("Product added")
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
            
        }finally{
            setLoading(false)
        }
        
        }
    const fetchProduct = async(id:string)=> {
        setLoading(true)
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`,{
                method:"GET",
                headers: {
                    "Content-Type": "application/json", // Set content type as JSON
                },
            })
            const {data} = await res.json()
            console.log(data)
            setCurrentProduct(data)

        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    const updateProduct = async(id:string,formData:any) => {
        setLoading(true)
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`,{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json", // Set content type as JSON
                },
                body: JSON.stringify(formData)
                
            })
            const {data} = await res.json()
            setCurrentProduct(data)
            toast.success("Product updated successfully")
            } catch (error) {
            toast.error("Something went wrong ")
            console.log(error)
        }
    }

  return (
    <GlobalContext.Provider value={{products,setProducts,error,loading,setError,setLoading,fetchProducts,deleteProduct,addProduct,fetchProduct,currentProduct,updateProduct}}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider