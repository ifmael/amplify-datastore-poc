import React from 'react'

const ExpenseForm = ({ expense, handleExpense, handleSubmit }) => (
  <form onSubmit={ handleSubmit }>
    <div className="form-center">
      <div className="form-group">
        <label htmlFor="charge"> Charge </label>
        <input id="charge" name="charge" className="form-control" type="text" 
          value={ expense.charge }
          onChange={ (event)=> handleExpense({change: 'charge', value: event.target.value}) }
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount"> Amount </label>
        <input id="amount" name="amount" className="form-control" type="text" 
          value={ expense.amount }
          onChange={ (event)=> handleExpense({change: 'amount', value: event.target.value}) }
        />
      </div>
    </div>
    <button type="submit" className="btn"> Submit</button>
  </form>
)

export default ExpenseForm