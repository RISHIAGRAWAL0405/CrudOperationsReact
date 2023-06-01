import React from 'react'
import Child from './child'
import './comp2.css'
import { useState, useRef } from 'react';
export default function Parent() {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState('');
  const [resultArr, setResultArr] = useState([]);
  const [finalRes, setFinalRes] = useState([]);
  const [changeColor, setChangeColor] = useState(false)

  const scrollref = useRef();
  const handleClick = (coustomer) => {
    setChangeColor(!changeColor)
    setFinalRes(coustomer)
    finalRes.push(coustomer)
    console.log(finalRes)
  }
  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value)

    let temp = []
    user.forEach(x => {
      if (x.GuestName.toLowerCase().includes(e.target.value.toLowerCase())) {
        console.log("Founded>>", x.GuestName)
        temp.push(x);
      }
    });
    setResultArr(temp);
  };


  // Defining async function
  async function getapi(url) {
    const response = await fetch(url);

    var data = await response.json();
    console.log(data);
    setUser(data.data)
    setResultArr(data.data)
  }

  const getData = (userInput) => {
    console.log("Parent", userInput);
    if (userInput.Mode == "Edit") {
      let temp = JSON.parse(JSON.stringify(resultArr))
      temp.forEach(x => {
        if (x.ProfileSerNo == userInput.ProfileSerNo) {
          x.GuestName = userInput.GuestName;
          x.Mobile = userInput.Mobile;
          x.Email = userInput.Email;
          console.log("hii this is the value passed by the child", x.ProfileSerNo)
        }
      });
      let temp1 = JSON.parse(JSON.stringify(user))
      temp1.forEach(x => {
        if (x.ProfileSerNo == userInput.ProfileSerNo) {
          x.GuestName = userInput.GuestName;
          x.Mobile = userInput.Mobile;
          x.Email = userInput.Email;
          console.log("hii this is the value passed by the child", x.ProfileSerNo)
        }
      });
      setUser(temp1)
      console.log("hi this is temp array", temp)
      setResultArr(temp)
    }
    else if (userInput.Mode == "Add") {
      let maxpro = 0;
      for (let i = 0; i < resultArr.length; i++) {
        if (resultArr[i].ProfileSerNo > maxpro) {
          maxpro = resultArr[i].ProfileSerNo;
        }
      }
      maxpro = maxpro + 1;
      let obj = userInput
      obj.ProfileSerNo = maxpro
      let temp = JSON.parse(JSON.stringify(resultArr));
      temp.push(obj)
      user.push(obj)
      setResultArr(temp);
      console.log("thsi is result array", resultArr)
      console.log("this is user array", user)
      finalRes.ProfileSerNo = obj.ProfileSerNo;
    }
    else if (userInput.Mode == "Delete") {
      resultArr.splice(resultArr.findIndex(a => a.ProfileSerNo == userInput.ProfileSerNo), 1)
      // resultArr.splice(resultArr.indexOf(userInput.ProfileSerNo))
      let temp = JSON.parse(JSON.stringify(resultArr));
      user.splice(user.findIndex(a => a.ProfileSerNo == userInput.ProfileSerNo), 1)
      // console.log("hi this is temp",temp)
      setResultArr(temp);
    }
    if (scrollref.current != undefined) {
      scrollref.current.scrollIntoView({ behaviour: "smooth" });
    }
  }

  return (
    <div>
      PARENT CLASS
      <br></br>
      <button onClick={() => getapi('https://script.googleusercontent.com/a/macros/nirmauni.ac.in/echo?user_content_key=ekcbtCJKDEWsmHs419ixo673ENJXqy-WbO2UooTtid87pB4LG9nwuFSwGhJoJJ96WvvYHsyegas0_SVbNHe9BBpqt-q7ughiOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKAm6qSSuXKURTa5nkBT_cYyq5dVRAWnl1lEr42NCnC6Gix1bR_W-VbQ3uTHdT107AogjSU9Qg4-7YugZAWYXAM6WcBCexW3oSwaM-EiwKc8Uy3nXhGjnfLBfPHJn1uADODc_ScPTHfLrg&lib=MACDJlCVSO6qlqviURMZT8Ca_1eEp_Rmg')}>Clickme</button>
      <input type="text" placeholder="Search.." onChange={handleChange} />
      <h1>Guest details</h1>
      <Child rishi={finalRes} onSubmit={getData} />
      <div className="scrollit" >
        <table>
          <tr>
            <th>Guest Name</th>
          </tr>
          {resultArr.map((coustomer, index) => {
            return (
              <tr key={index}>
                <td ref={(coustomer.ProfileSerNo == finalRes.ProfileSerNo) ? scrollref : null} onClick={() => { handleClick(coustomer) }} className={(coustomer.ProfileSerNo == finalRes.ProfileSerNo) ? "rose" : "dark"}>{coustomer.GuestName}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  )
}
