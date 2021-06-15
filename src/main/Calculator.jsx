import React from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
} //Initial Properties

export default class Calculator extends React.Component {

    state = { ...initialState } //Add initial properties to state

    constructor(props) {

        super(props)
        this.clear = this.clear.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clear() {
        this.setState( {...initialState} ) //Back to initial properties
    }

    setOperation(operation) {

        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true}) //Verifying the state current and add second number of equation (state values array)
        } else {

            const result = operation === '=' //If true, finish equation
            const currentOperation = this.state.operation //Variable control if user wants continue the equation
            const values = [...this.state.values]

            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }//Prevents error when user double click in '=' button

            values[1] = 0

            this.setState({
                displayValue: values[0], //Equation result
                operation: result ? null : operation, //Set operation null if user wants finish equation
                current: result ? 0 : 1,
                clearDisplay: !result,
                values
            })
        }
    }

    addDigit(n) {

        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        } //Verifying for two points in equation

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay 
        //Add numbers to display and prevent add '0' when displayValue is '0'

        const currentValue = clearDisplay ? '' : this.state.displayValue
        //If clearDisplay == true displayValue is '0'
        const displayValue = currentValue + n
        
        this.setState({ displayValue, clearDisplay: false})


        if (n !== '.') {
            const i = this.state.current //Storing the index into the value (state) array
            const newValue = parseFloat(displayValue) //Parsing string to float
            const values = [...this.state.values] //Duplicating array (state)
            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {

        return (
            <div className="calculator">
                <Display value={this.state.displayValue} /> {/*Setting state to display value */}
                <Button label="AC" click={this.clear} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}