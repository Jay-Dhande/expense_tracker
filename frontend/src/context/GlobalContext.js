import { createContext, useContext, useState } from "react";
import axios from 'axios'
// import { getIncomes } from "../../../../backend/controllers/income";

const BASE_URL = 'http://localhost:3000/api/v1/'

const GlobalContext = createContext() 

export const GlobalContextProvider  = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [isUser , setIsUser] = useState("") ; 

    const setUser = (name) => {
        setIsUser(name) ; 
        return setIsUser ;
    }

    //calculate incomes
    const addIncome = async (income) => {
        
        const response = await axios.post(`${BASE_URL}add-income` , income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes(income.name)
    }
     
    const getIncomes = async (name) => {
        console.log("get inc req" , name) ;
        try {
            
            const response = await axios.get(`${BASE_URL}get-incomes`  , {
                params:{
                    name:name
                }
            })
            console.log(response.data) ; 

            setIncomes(response.data)
        } catch (error) {
            console.log(error) ; 
        }
    }
    
    const deleteIncome = async(ele) => {
        try{
            const id =ele.id ; 
            const name= ele.name ; 
            console.log("trying to del") ; 
            console.log("ele :" , ele , "id :" , id , " name :" , name) ; 
            try{

                const res = await axios.delete(`${BASE_URL}delete-income/${id}`) ; 
            }
            catch(err){
                console.log(err) ; 
            }
            console.log("deleted") ; 
            getIncomes(name) ; 
        }
        catch(err){
                // console.log(response.data) ;  
                console.log(err) ; 
        }  

    }

    const totalIncome = (name) => {
        // getIncomes() ; 
        
        let totalIncome = 0 ; 
        incomes.forEach((income) => {
             totalIncome += income.amount ; 
        });
        return totalIncome ; 
    }
    // console.log(totalIncome()) ; 


    // expense 
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense` ,expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses(expense.name)
    }

    const getExpenses = async (name) => {
        console.log("nameeee" ,name) ; 
        try{
            console.log("name" , name) ; 

            const response = await axios.get(`${BASE_URL}get-expenses` , {
                params:{
                    name:name
                }
            })
            setExpenses(response.data)
        }
        catch(err){
             console.log(err) ; 
        }
        // console.log(response.data)
    }
    
    const deleteExpense = async(ele) => {
        try{
            console.log("trying to del") ;
            const id = ele.id ; 
            const name = ele.name  ; 
            const res = await axios.delete(`${BASE_URL}delete-expense/${id}`) ; 
            console.log("deleted") ; 
            getExpenses(name) ; 
        }
        catch(err){
                // console.log(response.data) ;  
                console.log(err) ; 
        }  

    }

    const totalExpense = (name) => {
        // getExpenses() ; 

        let totalExpense = 0 ; 
        expenses.forEach((expense) => {
            totalExpense += expense.amount ; 
        });
        return totalExpense ; 
    }
    // console.log(totalExpense(name)) ; 

   const totalBalance = (name) => {
    return totalIncome(name) - totalExpense(name) ; 
   }

   const transactionHistory = (name) => {

    const history = [...incomes, ...expenses]
    history.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return history.slice(0, 3)
}
    
const viewTransactions = (name) => {
    const history = [...incomes, ...expenses]
    history.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return history ; 
} 

    
    

    return (
        <GlobalContext.Provider value={{
        setUser,
        addIncome ,
        getIncomes ,
        incomes ,
        deleteIncome, 
        totalIncome , 
        getExpenses , 
        addExpense , 
        totalExpense ,
        deleteExpense,  
        expenses , 
        totalBalance, 
        transactionHistory,
        error , 
        setError,
        viewTransactions,
         }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}