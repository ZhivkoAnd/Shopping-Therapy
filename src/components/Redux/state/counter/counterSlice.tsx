import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

type counterState = {
    value: number
}

const initialState: counterState = {
    value: 0
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    // Redux toolkit makes a copy of the state, apply the changes and then replace the old state, that's happening behind the scenes
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(incrementAsync.pending, () => {
            console.log("incrementAsync.pending")
        })
        .addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
            state.value += action.payload
        })
    }
})

export const incrementAsync = createAsyncThunk(
    "counter/incrementAsync",
    async (amount: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return amount;
    }
)

export const {increment, decrement, incrementByAmount} = counterSlice.actions
export default counterSlice.reducer