import React, {Fragment} from "react";
//import Class from './Meals.module.css';

import MealsSummary from "./MealsSumary/MealsSumary";
import MealsList from "./MealsList/MealsList";

const Meals = () => {
    return <Fragment>
        <MealsSummary />
        <MealsList />
    </Fragment>
};

export default Meals; 