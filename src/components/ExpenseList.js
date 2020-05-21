import React from 'react'
import ExpenseItem from './ExpenseItem'


const ExpenseList = ({ expenses, handleEdit, handleRemove}) => (
  <ul className="list">
    { expenses.map( expense =>(
      <ExpenseItem 
        key={ expense.id }
        expense={ expense}
        handleEdit={ handleEdit }
        handleRemove={ handleRemove }
      />
    ))}
  </ul>

)

export default ExpenseList