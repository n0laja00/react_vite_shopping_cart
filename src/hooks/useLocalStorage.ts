import { useEffect, useState } from "react";

/*Making this function generic with T. It also has a key that is a string. Its initialValue is a type of T or a function that returns a type of T. 
The T in this instance is always an array of cart items passed by context/ShoppingCartContext.
 -The value is going to be equal to useState that's going to be of the generic type T. We make a function that fetches the key, and if it returns NOT null, it means that we have a shoppingcart.
 We parse the shopping cart if it exists.
 -If our initialValue is a type of Function, that means tha twe need to invoke it as a function. We tell TS that upon invocation, the initialValue is a function that returns the type of T.
 -Lastly, we use useEffect to update the shppping cart. We get around potential errors by telling TS that this is an array with T (value) and function (setValue)*/
export function useLocalStorage<T>(key: string, initialValue: T | (() => T))  {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue); 
        if (typeof initialValue === "function") {
          return (initialValue as () => T)()  
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue] as [typeof value, typeof setValue]
}