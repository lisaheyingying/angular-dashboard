import xlsx from 'node-xlsx';

import {
  getTargetColumn,
  getLastSunday
} from './utils'

const expName = ["6/25", "7/2", "7/9", "7/16", "7/23", "7/30", "8/6", "8/13", "8/20", "8/27", "9/3", "9/10", "9/17", "9/24", "10/1", "10/8", "10/15", "10/22", "10/29", "11/5", "11/12", "11/19", "11/26", "12/3", "12/10", "12/17", "12/24", "12/31", "1/7", "1/14", "1/21", "1/28"]
const resumeExpValue = [5, 15, 30, 50, 70, 95, 120, 140, 160, 180, 195, 215, 235, 255, 270, 290, 310, 330, 345, 365, 385, 405, 420, 440, 460, 480, 495, 515, 535, 555, 570, 585];
const onsiteExpValue = [0, 2, 7, 14, 24, 34, 46, 58, 68, 78, 88, 95, 105, 115, 125, 132, 142, 152, 162, 169, 179, 189, 199, 206, 216, 226, 236, 243, 253, 263, 273, 280];
const reqExpValue = [0, 0, 0, 0, 1, 2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 21, 22, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43]

// tmp hard code
const reqReal = [0, 0, 0];
const interviewReal = [0, 0, 0];


const RESUME = 'CV Upload Date';
const ONSITE = 'TP/Onsite Interview Time';

const filePath = require('path').resolve(__dirname, '../assets/Isilon Hiring Candidates Track Sheet.xlsx');

// return {name: string, resume: number, phone: number, onsite: number}[]
export const getTrend = () => {
  const rawData = xlsx.parse(filePath)[0].data;
  let resume = getTargetColumn(rawData, RESUME),
    onsite = getTargetColumn(rawData, ONSITE);
  return {
    resumeExpect: getCombined(expName, resumeExpValue),
    interviewExpect: getCombined(expName, onsiteExpValue),
    reqExpect: getCombined(expName, reqExpValue),
    resumeReal: reduceByDate(getLastSunday(resume)),
    reqReal: getCombined(expName, reqReal),
    interviewReal: getCombined(expName, interviewReal)
    //interviewReal: reduceByDate(getLastSunday(onsite)),
    //reqReal: []
  }
}

// @param dateArray: string[]
// return {name: string, value: number}[]
function reduceByDate(dateArray) {
  return dateArray
    .reduce((a, b) => {
      let exitIndex = a.findIndex(str => str && str.name === b);
      if (exitIndex >= 0) {
        a[exitIndex].value++;
        return a;
      }
      return [...a, {
        name: b,
        value: 1
      }];
    }, [])
    .reduce((a, b) => {
      return a.length ? [...a, {
        name: b.name,
        value: a[a.length - 1].value + b.value
      }] : [b];
    }, []);
}

function getCombined(dates, values) {
  return values.map((value, index) => {
    return {
      name: dates[index],
      value
    }
  });
}
