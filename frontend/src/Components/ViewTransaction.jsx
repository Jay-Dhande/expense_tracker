import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/GlobalContext'
import { useEffect } from 'react';


export default function ViewTransaction() {
    
    const {viewTransactions , getExpenses , getIncomes  ,totalBalance} = useGlobalContext() ; 
    
    const [...history] = viewTransactions() ;

    useEffect(() =>{
        getIncomes()
        getExpenses()
    }, [])
    
    return (
    <ViewTransactionStyled>
        <h2 className='past-content'>Past Transactions</h2>
        <div className="transactions">
            {
                history.map((item) => {
                        const{_id , title , amount  , type} = item ; 
                        return (
                            <div key={_id} className="history-item">
                                    <p style={{
                                        color: type === 'expense' ? 'red' : 'var(--color-green)'
                                    }}>
                                        {title}
                                    </p>
                                    <p style={{
                                        color: type === 'expense' ? 'red' : 'var(--color-green)'
                                    }}>
                                        {   
                                            
                                            type === 'expense' ? `-${amount <= 0  ? 0 : amount}` : `+${amount <= 0 ? 0: amount}`
                                        }
                                    </p>
                            </div>
                        )
                    })}


        </div>
        <div className="net-balance">
            Net-Balance : {totalBalance()}
        </div>
    </ViewTransactionStyled>
  )
}

const ViewTransactionStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 5px;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px;
    }
    .past-content{
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
    .net-balance{
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
`