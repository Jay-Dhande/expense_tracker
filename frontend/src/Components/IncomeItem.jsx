import React from 'react'
import styled from 'styled-components'
import { dateFormat } from '../utils/dateFormat';
import { calender, comment, dollar, trash , money , freelance , stocks , users ,bitcoin ,card , yt , piggy , book ,food , medical , tv  ,clothing ,circle, takeaway } from '../utils/Icons';
import Button from './Button';


export default function IncomeItem({id, title, amount, date, category, description, deleteItem , indicatorColor , type ,name}) {
    
    const categoryIcon = () =>{
        switch(category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }

    // console.log('type', type)
  
    return (
    <IncomeItemStyled indicator={indicatorColor}>
        <div className="icon">
           {type === 'expense' ? expenseCatIcon() : categoryIcon()}
        </div>
        <div className="content">
            <h5>{title}</h5>
            <div className="inner-content">
                <div className="text">
                    <p>{dollar} {amount}</p>
                    <p>{calender} {dateFormat(date)}</p>
                    <p>
                        {comment}
                        {description}
                    </p>
                </div>
                <div className="btn-con">
                <Button 
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem({id:id , name:name})}
                        />
                </div>
            </div>
        </div>
    </IncomeItemStyled>
  )
}

const IncomeItemStyled  = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 0.3rem;
    margin-bottom: 0.3rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    color: #222260;
    .icon{
        width: 60px;
        height: 60px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1rem;
            padding-left: 1.5rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 55%;
                transform: translateY(-50%);
                width: .6rem;
                height: .6rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.2rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    } 
` ; 