import React from 'react';

function BuildTagCloud(props) {
    let data = props.data;
    const fontMaxSize = 50;

    /* Random Color Generator*/
    let Color = () => {
        let rgb = [];
        for (let i = 0; i < 3; i++) {
            let r = Math.floor(Math.random() * 256);
            rgb.push(r);
        }
        return rgb;
    }
    /* Calculating the max Value from the array*/
    let MaxValue = () => {
        let val = Object.values(data);
        let max = val.reduce(function (a, b) {
            return Math.max(a, b);
        });
        return max;
    }
    let maxVal = MaxValue();

    /* Mapping through the data and calculating fontSize and applying the different css to the dom element */
    return (
        <div className='cloud-piece'>
            {Object.keys(data).sort(function () {
                return 0.5 - Math.random()
            }).map(function (curr, i, arr) {
                let fontSize = Math.round((data[curr] / maxVal) * fontMaxSize);

                if (fontSize < 20) {
                    fontSize = 20;
                }
                let colorRand = Color();
                let styles = {
                    margin: '5px',
                    fontSize: fontSize,
                    display: 'inline-block',
                    color: `rgb(${colorRand})`,
                    lineHeight: 1.2
                };
                if(curr.length >= 25) {
                    curr = curr.slice(0,15) + `...`;
                }
                return (
                    <span key={i} style={styles}>{curr}</span>
                )
            })}
        </div>
    )
}
export default BuildTagCloud;
