import React from 'react';
import "../ourContextMenu.css";
export default function OurContextMenu({ menuPosition, setMenuPosition,
  rowId, setRowId, setExpenses, expenses , newExpense ,setNewExpense }) {
  const { left, top } = menuPosition;

  const isVisible = left !== 0 || top !== 0;

  // console.log(`consoling left, top positions: left: ${left}, top: ${top}`);
  const [clickedExpense]=expenses.filter((expense)=>expense.id===rowId)

  return (
    <div
      className={`ourContextMenu ${isVisible ? "" : "hideIt"}`}
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 1000,
      }}
    >
      <div
        onClick={() => {
          // console.log("editing - - - - ");
          setMenuPosition({ left: 0, top: 0 });
          setNewExpense({
            title:clickedExpense.title,
            category:clickedExpense.category,
            amount:clickedExpense.amount
          })
          // setRowId("")
         }}
      >
        edit
      </div>
      <div
        onClick={() => {
          // console.log("deleting - - - - ");
          setMenuPosition({ left: 0, top: 0 });
          setExpenses((expenseList) =>
            expenseList.filter((expenseItem) => expenseItem.id !== rowId)
          );
        }}
      >
        delete
      </div>
    </div>
  );
}
