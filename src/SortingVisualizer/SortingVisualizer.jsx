import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from '../sortingAlgos/sortingAlgos.js';


const ANIMATION_SPEED_MS = 0.05; // speed of animation
const NUMBER_OF_ARRAY_BARS = 3500; // how many values in array
const PRIMARY_COLOUR = '#956fd6'; // main col
const SECONDARY_COLOUR = 'red'; // when being compared
const HEIGHT_OF_BARS = Math.floor(window.innerHeight * .85);

console.log(NUMBER_OF_ARRAY_BARS);

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; ++i) {
            array.push(randomIntFromInterval(5, HEIGHT_OF_BARS)); // can't really see if value is 1
        }
        this.setState({ array });
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        let iGlobal = 0;
        for (let i = 0; i < animations.length; ++i) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2; // we compare every 2 vals
            const value = animations[i][0];
            // console.log(value);
            // console.log(calcColor(value));

            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOUR : calcColor(value);

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
            iGlobal = i;
        } // after the whole thing is done

        let len = this.state.array.length

        for (let j = 0; j < len; ++j) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const barOneStyle = arrayBars[j].style;
            const color = calcColor(this.state.array[j])
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
            }, (iGlobal + j + 200) * ANIMATION_SPEED_MS)
        }
    }

    quickSort() { }

    heapSort() { }

    bubbleSort() { }


    // may need to add a function to test the sorting algorithms


    render() {
        const { array } = this.state;

        return (
            <div>
                <div className="TopBar">
                    <span className = "TopBar__Title">Sort Visualizer</span>
                    <button class="TopBut" onClick={() => this.resetArray()}>Create New Array</button>
                    <button class="TopBut" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button class="TopBut" onClick={() => this.quickSort()}>Quick Sort</button>
                    <button class="TopBut" onClick={() => this.heapSort()}>Heap Sort</button>
                    <button class="TopBut" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>

                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: calcColor(value),
                                height: `${value}px`,

                            }}></div>
                    ))}
                </div>
            </div>


        );
    }
}


function calcColor(val) {
    var minHue = 262.1, maxHue = 0; // #956fd6 moment
    var curPercent = 1 - (val - 5) / (HEIGHT_OF_BARS - 5);
    var colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + `, 55.7%,63.7%)`;
    return colString;
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}