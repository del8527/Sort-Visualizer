import React from 'react';
import './Dropdown.scss';

export default class Dropdown extends React.Component {

    render() {
        return (
            <nav>
                <ul>
                    <li><button class="TopBut" onClick={() => this.resetArray()}>Randomize</button></li>
                    <li>
                        <a href="#0">Sorting Algorithms</a>
                        <ul>
                                <li> <button  onClick={() => this.mergeSort()}>Merge Sort</button> </li>
                                <li> <button  onClick={() => this.quickSort()}>Quick Sort</button> </li>
                                <li> <button  onClick={() => this.heapSort()}>Heap Sort</button> </li>
                                <li> <button  onClick={() => this.bubbleSort()}>Bubble Sort</button> </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}