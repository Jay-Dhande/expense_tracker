import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../styles/Layouts'
import Chart from './Chart'
import { useGlobalContext } from '../context/GlobalContext'
import { dollar } from '../utils/Icons'
import History from './History' ;


export default function DashBoard() {
  const {incomes , expenses ,getExpenses , getIncomes , totalIncome , totalExpense , totalBalance} = useGlobalContext() ; 
 
  const setName = localStorage.getItem("name") ; 
  // const gIncome =  getIncomes() ; 
  // const gExp = getExpenses();
  useEffect(() =>{
    getIncomes(localStorage.getItem("name"))
}, [])
useEffect(() =>{
  getExpenses(localStorage.getItem("name"))
}, [])

  return (
    <DashBoardStyled>
        <InnerLayout>
        <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome(setName)}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpense(setName)}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance(setName)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                ${incomes.filter(income =>  income.name === setName).length>=1 ? Math.min(...incomes.map(item => item.amount)) : 0}
                            </p>
                            <p>
                                ${incomes.filter(income =>  income.name === setName).length>=1 ? Math.max(...incomes.map(item => item.amount)) : 0}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                ${expenses.filter(income =>  income.name === setName).length>=1 ? Math.min(...expenses.map(item => item.amount)) : 0}
                            </p>
                            <p>
                                ${expenses.filter(income =>  income.name === setName).length>=1 ? Math.max(...expenses.map(item => item.amount)): 0}
                            </p>
                        </div>
                    </div>
                </div>
        </InnerLayout>
    </DashBoardStyled>
  )
}

const DashBoardStyled = styled.div`
.stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 300px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 1rem;
                margin-top: 1rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 1.5rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 1.8rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1rem;
                span{
                    font-size: 1.5rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 0.7rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.3rem;
                }
            }
        }
    }
`