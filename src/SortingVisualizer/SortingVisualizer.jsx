import React from 'react';
import './SortingVisualizer.scss';
import { getMergeSortAnimations } from '../sortingAlgos/mergeSort.js';


const ANIMATION_SPEED_MS = 0.1; // speed of animation
const NUMBER_OF_ARRAY_BARS = 3500; // how many values in array
const PRIMARY_COLOUR = '#956fd6'; // main col
const SECONDARY_COLOUR = 'red'; // when being compared
const HEIGHT_OF_BARS = Math.floor(window.innerHeight * .85);
const theme = 'rainbow';
let isRunning = false;

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

    black() {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; ++i) {
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = 'black';
            }, i * ANIMATION_SPEED_MS);
        }
        theme = 'black';
    }

    rainbow() {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; ++i) {
            let val = parseInt(arrayBars[i].style.height);
            
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = calcColor(val);
            }, i * ANIMATION_SPEED_MS);
        }
        theme = 'rainbow';
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        let iGlobal = 0;
        isRunning = true;
        // this.setState({array: this.state.array, isRunning : true}); // added
        for (let i = 0; i < animations.length; ++i) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2; // we compare every 2 vals
            console.log(animations);
            console.log(arrayBars)

            // const value = parseInt(arrayBars[i].style.height);
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
        setTimeout(() => {
            isRunning = false;
            console.log("44444")
        }, iGlobal * ANIMATION_SPEED_MS)
    }

    quickSort() { }

    heapSort() { }

    bubbleSort() { }


    // may need to add a function to test the sorting algorithms


    render() {
        const { array } = this.state;

        let cursor = "pointer";
        let buttonColor = "#3a3a3c";

        if (isRunning === true) {
            buttonColor = "#956fd6";
            cursor = "not-allowed";
        }
        console.log(isRunning);

        return (
            <div>
                <div className="TopBar">
                    <span className="TopBar__Title">Sort Visualizer</span>
                    <nav>
                        <ul>
                            <li><button
                                className="Rando"
                                style={{ color: buttonColor, cursor: cursor }}
                                onClick={() => {
                                    if (isRunning === false) {
                                        this.resetArray()
                                    }
                                }
                                }
                            >Randomize</button></li>
                            <li>
                                <button>Sorting Algorithms</button>
                                <ul>
                                    <li> <button className="TopBut" onClick={() => this.mergeSort()}>Merge Sort</button> </li>
                                    <li> <button className="TopBut" onClick={() => this.quickSort()}>Quick Sort (WIP)</button> </li>
                                    <li> <button className="TopBut" onClick={() => this.heapSort()}>Heap Sort (WIP)</button> </li>
                                    <li> <button className="TopBut" onClick={() => this.bubbleSort()}>Bubble Sort (WIP)</button> </li>
                                </ul>
                            </li>
                            <li><button>Themes (Coming soon)</button>
                                {/* <ul>
                                    <li> <button className="TopBut" id="Black" onClick={() => this.black()}>Black</button></li>
                                    <li> <button className="TopBut" id="Rainbow" onClick={() => this.rainbow()}>Rainbow</button></li>
                                </ul> */}
                            </li>
                        </ul>
                    </nav>
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