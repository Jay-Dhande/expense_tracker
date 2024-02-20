import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../styles/Layouts'
import { useGlobalContext } from '../context/GlobalContext'
import Form from './Form';
import { useEffect } from 'react';
import IncomeItem from './IncomeItem';


export default function Incomes() {

    const {addIncome,incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

    useEffect(() =>{
        getIncomes(localStorage.getItem("name"))
    }, [])


  return (
    <IncomesStyled>
        <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">
            Total Income : <span>{totalIncome(localStorage.getItem("name"))}</span>
        </h2>

        <div className="income-content">
            <div className="form-container">
                    <Form />
                </div>
                
                <div className="incomes">
                    {incomes.filter((income) => income.name===localStorage.getItem("name")).map((income) => {
                      const {_id, title, amount, date, category, description, type ,name} = income;
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
                          deleteItem={deleteIncome}
                      />   
                    })}
            </div>
        </div>
        </InnerLayout>   
    </IncomesStyled>
  )
}

const IncomesStyled = styled.div`
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
`