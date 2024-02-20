import { createContext, useContext, useState } from "react";
import axios from 'axios'
// import { getIncomes } from "../../../../backend/controllers/income";

const BASE_URL = 'http://localhost:3000/api/v1/'

const GlobalContext = createContext() 

export const GlobalContextProvider  = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        
        const response = await axios.post(`${BASE_URL}add-income` , income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes(income.name)
    }

    const getIncomes = async (name) => {
        const response = await axios.get(`${BASE_URL}get-incomes`  , name)
        setIncomes(response.data)
        // console.log(response.data)
    }
    
    const deleteIncome = async(ele) => {
        try{
            const id =ele.id ; 
            const name= ele.name ; 
            console.log("trying to del") ; 
            const res = await axios.delete(`${BASE_URL}delete-income/${id}`) ; 
            console.log("deleted") ; 
            getIncomes(name) ; 
        }
        catch(err){
                // console.log(response.data) ;  
                console.log(err) ; 
        }  

    }

    const totalIncome = () => {
        // getIncomes() ; 
        
        let totalIncome = 0 ; 
        incomes.forEach((income) => {
             totalIncome += income.amount ; 
        });
        return totalIncome ; 
    }
    console.log(totalIncome()) ; 


    // expense 
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense` ,expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses(expense.name)
    }

    const getExpenses = async (name) => {
        const response = await axios.get(`${BASE_URL}get-expenses` , name)
        setExpenses(response.data)
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

    const totalExpense = () => {
        // getExpenses() ; 

        let totalExpense = 0 ; 
        expenses.forEach((expense) => {
            totalExpense += expense.amount ; 
        });
        return totalExpense ; 
    }
    console.log(totalExpense()) ; 

   const totalBalance =() => {
    return totalIncome() - totalExpense() ; 
   }

   const transactionHistory = () => {
    const history = [...incomes, ...expenses]
    history.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return history.slice(0, 3)
}
    
const viewTransactions = () => {
    const history = [...incomes, ...expenses]
    history.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return history ; 
} 

    
    

    return (
        <GlobalContext.Provider value={{addIncome ,
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
        viewTransactions
         }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}