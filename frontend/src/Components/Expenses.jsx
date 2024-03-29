import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../styles/Layouts'
import { useGlobalContext } from '../context/GlobalContext'
import ExpenseForm from './ExpenseForm';
import { useEffect } from 'react';
import IncomeItem from './IncomeItem';


export default function Expenses({username , setUserName}) {

    const {addExpense,expenses, getExpenses, deleteExpense, totalExpense} = useGlobalContext()

    useEffect(() =>{
        getExpenses(localStorage.getItem("name")) ; 
    }, [])


  return (
    <ExpensesStyled>
        <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-income">
            Total Expenses : <span>{totalExpense(localStorage.getItem("name"))}</span>
        </h2>

        <div className="income-content">
            <div className="form-container">
                    <ExpenseForm />
                </div>
                
                <div className="incomes">
                    {expenses.map((expense) => {
                      const {_id, title, amount, date, category, description, type , name} = expense;
                      return <IncomeItem
                          key={_id}
                          id={_id} 
                          title={title} 
                          description={description} 
                          amount={amount} 
                          date={date} 
                          type={type}
                          name={name}
                          category={category} 
                          indicatorColor="var(--color-green)"
                          deleteItem={deleteExpense}
                      />   
                    })}
            </div>
        </div>
        </InnerLayout>   
    </ExpensesStyled>
  )
}

const ExpensesStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 1.5rem;
        .incomes{
            flex: 1;
        }
    }
`;
