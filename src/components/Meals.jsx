import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./Error";

const reqConfig = {};

export default function Meals() {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", reqConfig, []);

  if (isLoading) {
    return <h3 className="center">Guess what grandma's cooking today?</h3>;
  }

  if (error) {
    return (
      <Error
        title="We're having a little trouble fetching grandma's recipes."
        message={error}
      />
    );
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
