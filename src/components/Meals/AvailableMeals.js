import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [availableMeals, setAvaialableMeals] = useState(null);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const dataTranform = (meals) => {
      const loadedMeals = [];
      for (const key in meals) {
        loadedMeals.push({
          id: key,
          name: meals[key].name,
          description: meals[key].description,
          price: meals[key].price,
        });
      }
      setAvaialableMeals(loadedMeals);
    };

    fetchMeals(
      {
        url: "https://food-order-app-c697a-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json",
      },
      dataTranform
    );
  }, [fetchMeals]);

  let mealsList = <p className={classes.feedback_text}>No Meals Found!</p>;

  // if (isLoading) {
  //   mealsList = <p className={classes.feedback_text}>Loading ...</p>;
  // }

  // if (error) {
  //   mealsList = <p className={classes.feedback_text}>{error}</p>;
  // }

  if (availableMeals !== null) {
    mealsList = availableMeals.map((meal) => (
      <MealItem
        key={Math.random()}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }

  return (
    <React.Fragment>
      {isLoading && (
        <section>
          <p className={classes.feedback_text}>Loading ...</p>
        </section>
      )}
      {error && (
        <section>
          <p className={classes.feedback_text}>{error}</p>
        </section>
      )}
      {availableMeals !== null && (
        <section className={classes.meals}>
          <Card>
            <ul>{mealsList}</ul>
          </Card>
        </section>
      )}
    </React.Fragment>
  );
};

export default AvailableMeals;
