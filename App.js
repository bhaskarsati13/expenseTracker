import React, { useState } from 'react';

import FormTable from './components/FormTable';
import './homeCombined.css'
import { ourProducts } from './formTableData';
import InputForm from './components/InputForm';

export default function App() {
  const [expenses , setExpenses]=useState(ourProducts.products)
  console.log("our expenses are  :" , expenses)
  const [newExpense, setNewExpense] = useState({
      title: "",
      category: "",
      amount: "",
    })
  const [rowId , setRowId]=useState("")
  // console.log("rowId:" , rowId)
  
  return (
    <>
    <p style={{ fontSize: 30, textAlign:'center' }}><b>your expenses</b></p>
    <div className="homeCombined">
      <InputForm 
        expenses={expenses}
        setExpenses={setExpenses} 
        newExpense={newExpense}
        setNewExpense={setNewExpense}
        rowId={rowId}
      />

      <FormTable 
        expenses={expenses} 
        setExpenses={setExpenses}
        newExpense={newExpense}
        setNewExpense={setNewExpense}
        rowId={rowId}
        setRowId={setRowId}
      />

    </div>
    </>
  )
}
