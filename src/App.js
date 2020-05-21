import React, {useState, useEffect } from 'react';
// import './App.css';
import { Expense } from "./models";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList';

const initalState = { charge:'', amount:'' }

function App() {
  const [expenseState, setExpenseState] = useState(initalState)
  const [expenses , setExpenses] = useState([])
  const [edit, setEdit] = useState(false)

  useEffect(()=> { listExpenses() }, []);
  useEffect(()=>{
    console.log('observing...')
    const subscription = DataStore.observe(Expense).subscribe(()=> listExpenses())
    return () => subscription.unsubscribe()
  },[expenses])

  const addExpense = async (expense) => {
    const expenseFromDataStore = await DataStore.save(new Expense(expense))
    setExpenses([...expenses, expenseFromDataStore])
  }
  const editExpense = async (original)=>{
    const expenseUpdated = await DataStore.save(
      Expense.copyOf(original, updated =>{
        updated.charge = expenseState.charge;
        updated.amount = expenseState.amount
      })
    )
    return expenseUpdated
  }
  const listExpenses = async () => {
    const listExpense = await DataStore.query(Expense, Predicates.ALL)
    setExpenses(listExpense)
  }
  const removeExpense = async (expense) =>{
    await DataStore.delete(expense)
  }


  const handleExpense = ({change, value}) => {
    let mutation = {}
    mutation[change] = value
    setExpenseState({...expenseState, ...mutation})
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!edit){
      if(expenseState.charge !== '' && expenseState.amount > 0){
        addExpense(expenseState)
      }
    } else{
      const original = expenses.find(expenseFromState => expenseFromState.id === expenseState.id )
      const expenseUpdated = await editExpense(original);
      const expensesUpdated = expenses.map(expense => expense.id !== expenseUpdated.id ? expense : expenseUpdated)
      setExpenses(expensesUpdated)
    }

  }
  const handleEdit = (expenseEdited) => {
    setExpenseState(expenseEdited)
    setEdit(true)
  }
  const handleRemove = (expenseToRemove) =>{
    removeExpense(expenseToRemove)
    setExpenses(expenses.filter(expense => expense.id !== expenseToRemove.id))
  }

  return (
    <>
      <ExpenseForm 
        expense={ expenseState }
        handleExpense={ handleExpense }
        handleSubmit={ handleSubmit }
      />
      <ExpenseList 
        expenses={ expenses }
        handleEdit={ handleEdit }
        handleRemove={ handleRemove }
      />
    </>

  )
}

export default App;
