import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgos from '../sortingAlgos/sortingAlgos.js';

const ANIMATION_SPEED_MS = 3; // speed of animation
const NUMBER_OF_ARRAY_BARS = 310; // how many values in array


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
        for (let i = 0; i < 230; ++i) {
            array.push(randomIntFromInterval(5, 666)); // can't really see if value is 1
        }
        this.setState({ array });
    }

    mergeSort() {
        const animations = sortingAlgos.mergeSort(this.state.array);
        for (let i = 0; i < animations.length; ++i) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2; // we compare every 2 vals

            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animation[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'palegreen';

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
        }
    }
    
    quickSort() {}
    
    heapSort() {}

    bubbleSort() {}


    // may need to add a function to test the sorting algorithms


    render() {
        const { array } = this.state;
        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{ height: `${value}px` }}></div>
                ))}
                <button onClick={() => this.resetArray()}>Create New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>
        );
    }
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