//Great tutorial for learnig how to use Firebase with React
//ref: https://travis.media/how-to-use-firebase-with-react/


import React, { useState, useEffect } from 'react';

import { firebaseApp, firebaseDb }  from './utilities/Firebase';
import { addDoc, collection, getDocs } from "firebase/firestore";

import Header from "./components/Header";
import Footer from "./components/Footer";

import './App.css';


function App() {

  //Initialize state variables to store list of FAQ questions
  //First item is the state variable name (faqs)
  //Second item is the setter function for the faqs state variable
  //The parameter of useState() is the initial value of the state variable
  const [faqs, setFaqs] = useState([]);

  //console.log(JSON.stringify(firebaseApp.options, null, 2));

    
  let newQuestion = {
    question: "When are you open?",
    answer: "Everyday from 9-5."
  };

  //Placed addDoc into function to avoid displaying twice for every refresh tht occurs on page
  //ref: https://firebase.google.com/docs/firestore/quickstart?hl=en&authuser=0 (especially for addDoc)
  function addFaq(question) {
    addDoc(collection(firebaseDb, "faqs"), question);
  }

  //effect hook function loads on components render
  useEffect(() => {
    let done = false; //use this to determine when the getDocs is done
    const getFaqs = async () => {

      //since getDocs may take long, await results
      const snapshot = await getDocs(collection(firebaseDb, "faqs"));

      //getDocs returns an array of documents within the docs property
      //so we can map it to generate a new array containing only the document object
      let faqList = snapshot.docs.map((faq) => (faq.data()));
      
      //conditional in place as a clean up for any memory leak because useEffect is always trying to retreive data
      //check if load was already done
      if (done) {
        return;
      }

      //testing if this useEffect works
      //console.log(faqList[0]);
      //console.log(faqList[0].question);
      setFaqs(faqList);

      return () => {
        done = true;//we'eve finished loading
      }
    }
    getFaqs();//run the async function to load documents
  }), [setFaqs];//here, setFaqs() has been added as a dependency for useEffect()



  return (
    <div className="App">
      <Header />
      <main id="main">
        <button
          onClick={() => addFaq(newQuestion)}
        >
          Add
        </button>
        {
          faqs.map((faq) => (
            <div>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </div>
          ))
        }
      </main>
      <Footer />
    </div>
  );
}

export default App;
