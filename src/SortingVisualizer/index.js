import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 33;

const TIMEOUT_TIME = 5000;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInitialization: true,
      array: [],
      allOtherGuysOnLeft: [],
      leftGuys: [],
      rightGuys: [],
      allOtherGuysOnRight: [],
      displayArray: []
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({...this.state, isInitialization: true, array: array, displayArray: array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const sortedArrayToDisplayOnLeft = this.state.array.slice();
    for(const i in animations) {
      const animation = animations[i];
      (function (self) {
          setTimeout(() => {
          /*
          
          */


            const { leftPart, rightPart, currentArray } = animation;
            const { allOtherGuysOnLeft, leftGuys, rightGuys, allOtherGuysOnRight } = adjustStateBasedOnAnimation(sortedArrayToDisplayOnLeft, currentArray, self.state.displayArray, leftPart, rightPart);
            self.setState({...self.state, 
              isInitialization: false, 
              allOtherGuysOnLeft: allOtherGuysOnLeft, 
              leftGuys : leftGuys, 
              rightGuys: rightGuys, 
              allOtherGuysOnRight:allOtherGuysOnRight,
              displayArray: sortedArrayToDisplayOnLeft,
            });
        }, TIMEOUT_TIME * i);
      })(this)
    };
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    // console.log(this.state);
    const { isInitialization, displayArray, allOtherGuysOnLeft, leftGuys, rightGuys, allOtherGuysOnRight } = this.state;
    return (
      <div>
        <div className="container">
          { isInitialization ? (
            <div className='all-other-guys item'>
              {getArrayBarsFromArray(displayArray)}
            </div>
          ) : (
            <React.Fragment>
              <div className='all-other-guys item'>
                {getArrayBarsFromArray(allOtherGuysOnLeft)}
              </div>

              <div className='left-guys-array-box item'>
                {getArrayBarsFromArray(leftGuys)}
              </div>
              
              <div className='right-guys-array-box item'>
                {getArrayBarsFromArray(rightGuys)}
              </div>
              
              <div className='all-other-guys item'>
                {getArrayBarsFromArray(allOtherGuysOnRight)}
              </div>
            </React.Fragment>              
          )}
        </div>

        <div className='buttons'>
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => this.testSortingAlgorithms()}>
            Test Sorting Algorithms (BROKEN)
          </button>
        </div>
    </div>

    );
  }
}

const getArrayBarsFromArray = (array) => {
  return array.map((value, idx) => (
    <div
      className="array-bar"
      key={idx}
      style={{
        backgroundColor: PRIMARY_COLOR,
        height: `${value}px`,
      }}></div>
  ));
}

const adjustStateBasedOnAnimation = (sortedArrayToDisplayOnLeft, currentArray, array, leftPart, rightPart) => {
  // console.log(leftPart, rightPart);
  copyArrayIntoLeftSortedArray(sortedArrayToDisplayOnLeft, currentArray, leftPart, rightPart);
  const allOtherGuysOnLeft = sortedArrayToDisplayOnLeft.slice(0, leftPart[0]);
  const leftGuys = array.slice(leftPart[0], leftPart[1] + 1);
  const rightGuys = array.slice(rightPart[0], rightPart[1] + 1);
  const allOtherGuysOnRight = array.slice(rightPart[1] + 1, array.length)
  // console.log(allOtherGuysOnLeft, leftGuys, rightGuys, allOtherGuysOnRight);
  return {allOtherGuysOnLeft, leftGuys, rightGuys, allOtherGuysOnRight};
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
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

const copyArrayIntoLeftSortedArray = (arrayToHaveCopiedValues, arrayToBeCopied, leftRange, rightRange) => {
  for(let i = leftRange[0]; i <= rightRange[1]; i++) {
    arrayToHaveCopiedValues[i] = arrayToBeCopied[i];
  }
  console.log(arrayToHaveCopiedValues);
  return arrayToHaveCopiedValues;
}
