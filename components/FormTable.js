import React, { useEffect, useState } from 'react';
import '../formTable.css';
import OurContextMenu from './OurContextMenu';

export default function FormTable({expenses , setExpenses ,rowId , setRowId,
  newExpense, setNewExpense}) {
    
  const [filter , setFilter]=useState("")
  const [totalAmount , setTotalAmount]=useState(0)
  var current=0;
  const [menuPosition , setMenuPosition]=useState({
    left:0,
    top:0,
  })
  // const [rowId , setRowId]=useState("")

  const filteredExpenses=expenses.filter((expense)=>
    expense.category.toLowerCase().includes(filter.toLowerCase())
) 
  // calculating total amount
  const calculateTotalAmount=()=>{
    let total=0;
    filteredExpenses.forEach((ourExpense)=>{
      total+=ourExpense.amount;
    })
    setTotalAmount(total);

  }

  useEffect(()=>{
    calculateTotalAmount();
  },[filteredExpenses])



  const handleEvent = (e, id) => {
    e.preventDefault(); 
    const {clientX,clientY}=e;
    setMenuPosition({
      left:clientX,
      top:clientY
    })
    setRowId(id)
  };
  return (
    <>
    <OurContextMenu 
      menuPosition={menuPosition}
      setMenuPosition={setMenuPosition}
      setExpenses={setExpenses}
      rowId={rowId}
      setRowId={setRowId}
      
      expenses={expenses}
      newExpense={newExpense}
      setNewExpense={setNewExpense}
      />
    <table className="formTable">
      <thead>
        <tr>
          <th>Title</th>
          <th>
          <select
            style={{
              padding: "8px 12px",
              border: "none",
              fontSize: "14px",
              outline: "none",
              cursor: "pointer",

            }}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            id="categoryFilter"
            name="categoryFilter"
          >
            <option value="">All</option>
            <option value="grocery">Grocery</option>
            <option value="stationary">Stationary</option>
            <option value="clothes">Clothes</option>
          </select>

          </th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {filteredExpenses.map(({ id, title, category, amount })=> {
          return (
            <tr 
              key={id} 
              onContextMenu={(e)=>{handleEvent(e,id)}}
            >
              <td>{title}</td>
              <td>{category}</td>
              <td>{amount}</td>
            </tr>
          );
        })}
        <tr>
            <td>
                total amount : ₹{totalAmount}
            </td>
        </tr>
      </tbody>
    </table>

    </>
  );
}
