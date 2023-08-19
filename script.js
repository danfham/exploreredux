// DOM elements
const valueEl = document.getElementById('value')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const plusFiveBtn = document.getElementById('plusFive')
const minusFiveBtn = document.getElementById('minusFive')
const incOddBtn = document.getElementById('incOdd')
const slowIncBtn = document.getElementById('slowInc')
const customBtn = document.getElementById('customInput')

// initial state value
const initialState = {
    value: 0
}

// reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        case 'counter/payload':
            return {value: state.value + action.payload}
        default:
        return state
    }
}

// action object definitions
const addAction = {
  type: 'counter/incremented'
}

const subAction = {
  type: 'counter/decremented'
}

// generating the store
let store = Redux.createStore(counterReducer)

// defining render
const render = () => {
    const state = store.getState()
    valueEl.innerHTML = state.value.toString()
}

// establishing dispatch functions
const addOne = () => {
  store.dispatch(addAction)
}
  
const addFive = () => {
  store.dispatch({type:'counter/payload',payload:5})
}
  
const subOne = () => {
  store.dispatch(subAction)
}

const minusFive = () => {
  store.dispatch({type:'counter/payload',payload:-5})
}

const incSlow = () =>{
  setTimeout(()=>{
    store.dispatch(addAction)
  },1000)
}

const incOdd = () =>{
  if((store.getState().value % 2)!=0){
    store.dispatch(addAction)
  }
}

const customValue = () => {
  let value = Number(document.getElementById('userInput').value)
  store.dispatch({
    type:'counter/payload',
    payload:value
  })
}

// event listeners
plusBtn.addEventListener('click', addOne)
minusBtn.addEventListener('click', subOne)
plusFiveBtn.addEventListener('click', addFive)
minusFiveBtn.addEventListener('click', minusFive)
incOddBtn.addEventListener('click', incOdd)
slowIncBtn.addEventListener('click', incSlow)
customBtn.addEventListener('click', customValue)

// initial render
render()

// subscribe reruns render on dispatch
store.subscribe(render)