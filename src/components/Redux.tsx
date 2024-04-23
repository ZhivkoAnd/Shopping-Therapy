import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './Redux/state/store'
import {increment, decrement, incrementByAmount, incrementAsync} from './Redux/state/counter/counterSlice'

const Redux = () => {

  // We use useSelecter to connect to the store
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();


  return (
    <h1>
      {count}
      <div>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <button onClick={() => dispatch(incrementByAmount(10))}>Increment By Amount</button>
        <button onClick={() => dispatch(incrementAsync(10))}>Increment Async</button>
      </div>
    </h1>
  )
}

export default Redux