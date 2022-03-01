import React, {useEffect, useState} from "react";

import Card from "../../UI/Card/Card";
import Class from './MealsList.module.css';
import MealItem from "./MealItem/MealItem";
import { Circles } from  'react-loader-spinner'

const fetchMeals = async (setMeals, setIsLoading, setHasError) => {
  try{
    const response = await fetch("https://food-order-project-34dc7-default-rtdb.europe-west1.firebasedatabase.app/meals.json")
    const data = await response.json();
    let keys =  Object.keys(data);
    const meals = [];
    if(keys.length > 0){
      for(let meal in data){
        meals.push({
          id: meal,
          name: data[meal].name,
          description: data[meal].description,
          price: data[meal].price
        })
      }
    }
    setMeals([...meals]);
    setIsLoading(false);
  }catch(error){
    setHasError(true);
  }
}

const MealsList = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(()=> {
      fetchMeals(setMeals, setIsLoading, setHasError);
    }, []);

    const mealsList = meals.map( meal => {
        return <MealItem key={meal.id} meal={meal} />
    });

    const spinner = <Circles color="#8a2b06" height={80} width={80} />

    return <section className={Class.meals}>
        <Card>
          {
            hasError 
            ? <p className={Class.error}>Something went wrong, Please refrash the webpage.</p>
            :
            isLoading 
             ? spinner 
             : <ul style={{width: '100%'}}>{mealsList}</ul>
          }
        </Card>
    </section>
}

export default MealsList;