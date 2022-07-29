import { clear } from "@testing-library/user-event/dist/clear";
import React, { useState } from "react";

function ExpenseManager() {

  const [total_sal_amount,set_total_sal_amount] = useState();
  const [total_expense_amount,set_total_expense_amount] = useState();
  const [remaining_salary_amount,set_remaining_salary_amount] = useState();
  const [name,set_name] = useState('');
  const [category,set_category] = useState('');
  const [expense,set_expense] = useState('');
  const [date,set_date] = useState('');
  const [details_arr_data,set_details_data] = useState([]);
  const [update_index,set_update_index] = useState(0);
  const [hisamtgrc,set_hisamtgrc] = useState(0);
  const [hisamtrv,set_hisamttrv] = useState(0);
  const [hisamtveg,set_hisamtveg] = useState(0);
  const [hisamtmis,set_hisamtmis] = useState(0);
 
  const clear = () => {
    set_total_sal_amount();
    set_total_expense_amount();
    set_remaining_salary_amount();
    set_name('');
    set_category('');
    set_expense('');
    set_date('');
    set_details_data([]);
    set_update_index([]);
    set_hisamtgrc(0);
    set_hisamttrv(0);
    set_hisamtveg(0);
    set_hisamtmis(0);
    set_total_sal_amount(0);
  }

  const get_Total_sal_Amount = (event) => {
    let value= event.target.value;
    set_total_sal_amount(value);
    //
  }

  const get_name = (event) => {
    set_name(event.target.value);
    //
  }

  const get_category = (event) => {
    set_category(event.target.value);
    //
  }

  const get_expense = (event) => {
    set_expense(event.target.value);
    //
  }

  const get_date = (event) => {
    set_date(event.target.value);
    //
  }

  const Add = () => {
    if(name && category && expense && date){
      let temp_arr = {'user_name':name,'expense_category':category,'expense_price':expense,'expense_date':date};
      set_details_data([...details_arr_data, temp_arr]);
      display_salary();
      console.log(details_arr_data);
      history();
    }
  }

  const history =()=>{
    var trv = 0;
      var grc = 0;
      var vege = 0;
      var mis = 0;
    details_arr_data.map(i=>{
      if(i.expense_category === "Grocerray")
      {
        grc = grc+ Number(i.expense_price);  
      }
      if(i.expense_category === "Travelling")
      {
        trv = trv+ Number(i.expense_price);  
      }
      if(i.expense_category === "Vegies")
      {
        vege = vege+ Number(i.expense_price);  
      }
      if(i.expense_category === "miscelleneous")
      {
        mis = mis+ Number(i.expense_price);  
      }
    })
    set_hisamtgrc(grc);
    set_hisamttrv(trv);
    set_hisamtveg(vege);
    set_hisamtmis(mis);
  }

  React.useEffect(() => {
    history();
  });

  React.useEffect(() => {
    display_salary();
  });

  const delete_data = (index) => {
    let temp = details_arr_data.filter((_, i) => i !== index);
    set_details_data(temp);
    //
    display_salary();
  }

  const edit = (edit_index) => {
    
    details_arr_data.map((item,index) => {
      if(index === edit_index){
        set_update_index(edit_index);
        set_name(item.user_name);
        set_category(item.expense_category);
        set_expense(item.expense_price);
        set_date(item.expense_date);
      }
    })
    display_salary();
  }
  
  const update_data = () => {
    if(name && category && expense && date){
    let temp_arr = {'user_name':name,'expense_category':category,'expense_price':expense,'expense_date':date};
    let temp_array_for_update = [...details_arr_data];
    temp_array_for_update[update_index] = temp_arr;
    set_details_data(temp_array_for_update);
    }
    display_salary();
  }
  const display_salary = () => {
    let sal = 0;
   
    details_arr_data.map((item) => {
      sal+=Number(item.expense_price)
    })
    set_total_expense_amount(Number(sal));
    set_remaining_salary_amount(Number(total_sal_amount)-Number(sal));
  }

 

  return (
    <div>
      <div className="total_Amount_container">
        <div className="total_income" id="">
          <label>Total Salary Amount :</label>
          <input type="number" value={total_sal_amount} onChange={get_Total_sal_Amount}/>
        </div>
        <div className="total_income" id="">
          <label>Total Expense Amount :</label>
          <input type="number" value={total_expense_amount}/>
        </div>
        <div className="total_income" id="">
          <label>Remaining Salary Amount :</label>
          <input type="number" value={remaining_salary_amount}/>
        </div>
      </div>

      <div style={{display:"grid",placeItems:"center",padding:"2vw",backgroundColor:"rgb(124, 213, 242)"}}>
        <table className="show_categorywise_amount"> 
        
            <tr>
                <td><h3>Grocerray:</h3></td>
                <td><h4>${hisamtgrc}</h4></td>
            </tr>
            <tr>
                <td><h3>Vegies:</h3></td>
                <td><h4>${hisamtveg}</h4></td>
            </tr>
            <tr>
                <td><h3>Travelling:</h3></td>
                <td><h4>${hisamtrv}</h4></td>
            </tr>
            <tr>
                <td><h3>miscelleneous:</h3></td>
                <td><h4>${hisamtmis}</h4></td>
            </tr>
        </table>
      </div>
      <div style={{display:"grid",placeItems:"center",backgroundColor:"rgb(11, 133, 174)"}}>
          <table className="details">
              <tr>
                  <td>name</td>
                  <td><input value={name} onChange={get_name}/></td>
                  <td>category</td>
                  <td>
                      <select style={{width:"100%",outline:"none",border:"none"}} value={category}
                       onChange={get_category}>
                        <option selected disabled>select category</option>
                        <option>Grocerray</option>
                        <option>Vegies</option>
                        <option>Travelling</option>
                        <option>miscelleneous</option>
                      </select>
                  </td>
              </tr>
              <tr>
                  <td>Expense</td>
                  <td><input type="number" value={expense} onChange={get_expense}/></td>
                  <td>Date</td>
                  <td><input type="date" value={date} onChange={get_date}/></td>

              </tr>
          </table>
          <div>
            <button style={{width:"12vw",height:"5vh",margin:"4px"}} onClick={Add}>Add</button>
            <button style={{width:"12vw",height:"5vh",margin:"4px"}} onClick={clear}>Clear</button>
            <button style={{width:"12vw",height:"5vh",margin:"4px"}} onClick={update_data}>update</button>
          </div>
      </div>
      <div className="show_table_detail">
          <table>
          <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Date</th>
              <th>Expense Amount</th>
              <th>Action</th>
              <th>Action</th>
          </tr>
          {
            details_arr_data.map((item,index) => (
              <tr>
                <td>{item.user_name}</td>
                <td>{item.expense_category}</td>
                <td>{item.expense_date}</td>
                <td>{item.expense_price}</td>
                <td><i class="fa-solid fa-pen" onClick={() => edit(index)}></i></td>
                <td><i class="fa-solid fa-trash-can"  onClick={() => delete_data(index)}></i></td>

              </tr>
            ))
          }
          
          </table>
      </div>
    </div>
  );
}

export default ExpenseManager;
