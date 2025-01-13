import React, { useState } from 'react';
import "../inputForm.css";

export default function InputForm({ expenses, setExpenses, newExpense, setNewExpense, rowId }) {

  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const validationErrors = validation(newExpense);
    if (Object.keys(validationErrors).length === 0) {
      const existingExpense = expenses.find(
        (expense) => expense.title === newExpense.title
      );

      if (existingExpense) {
        setErrors({ title: "An expense with this title already exists." });
        return;
      }
      // if (NaN(newExpense.amount)) {
      //   setErrors({ title: "NaN , enter a valid number." });
      //   return;
      // }
       setExpenses((prev) => [
        ...prev,
        { ...newExpense, id: crypto.randomUUID() },
      ]);
      setNewExpense({
        title: "",
        category: "",
        amount: '',
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validation = (formData) => {
    const validationErrors = {};
    if (!formData.title) {
      validationErrors.title = "Please enter a title.";
    }
    if (!formData.category) {
      validationErrors.category = "Please enter a category.";
    }
    if (!formData.amount) {
      validationErrors.amount = "Please enter an amount.";
    }
    return validationErrors;
  };

  return (
    <>
      <div className="inputFormContainer">
        <label htmlFor="title">Title</label>
        {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
        <input
          type="text"
          name="title"
          value={newExpense.title}
          placeholder="enter title..."
          id="title"
          onChange={(e) => {
            setNewExpense((prev) => ({
              ...prev,
              title: e.target.value,
            }));
            setErrors((prev) => ({ ...prev, title: "" }));
          }}
        />

        <label htmlFor="category">Category</label>
        {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
        <input
          type="text"
          name="category"
          value={newExpense.category}
          placeholder="enter category..."
          id="category"
          onChange={(e) => {
            setNewExpense((prev) => ({
              ...prev,
              category: e.target.value,
            }));
            setErrors((prev) => ({ ...prev, category: "" })); 
          }}
        />

        <label htmlFor="amount">Amount</label>
        {errors.amount && <p style={{ color: 'red' }}>{errors.amount}</p>}
        <input
          type="text"
          name="amount"
          value={newExpense.amount}
          placeholder="enter amount..."
          id="amount"
          onChange={(e) => {
            setNewExpense((prev) => ({
              ...prev,
              amount: parseFloat(e.target.value)
            }));
            setErrors((prev) => ({ ...prev, amount: "" }));
          }}
        />
        <button onClick={handleSubmit} type="submit">
          {rowId && ( newExpense.title && newExpense.category && newExpense.amount) ? "Edit" : "ADD"}
        </button>
      </div>
    </>
  );
}
