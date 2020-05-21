import React from 'react'

const ExpenseItem = ({expense, handleEdit, handleRemove}) => (
  <li >
    <div>
      <span>{ expense.charge }</span>
      <span>{ expense.amount }</span>
    </div>
    <div>
      <button onClick={ ()=>{ handleEdit(expense) } }>Edit</button>
      <button onClick={ ()=>{ handleRemove(expense)} }>Remove</button>
    </div>
  </li>
)

export default ExpenseItem