import React, { Component } from 'react';
import BuildTagCloud from './buildTagCloud';


class TagCloud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cloudMap: null,
            upload: false
        };
        this.textAreaInput = React.createRef();
        this.getWords = this.getWords.bind(this);
        this.showCloud = this.showCloud.bind(this);
    }
    showCloud(e) {
        e.preventDefault();
    }
    getWords(event) {
        let textArea = document.querySelector(".tag-txt-area").value; 
        let wordMap = this.buildWordMap(textArea);
        if (wordMap === '') {
            this.setState({
                upload: false
            });
        }
        else {
            this.setState({
                cloudMap: wordMap,
                upload: true
            });
        }
    }

    buildWordMap(tA) {
        let wObj,error_text,words;
         error_text = "Please enter some tags in text area";
        if (tA !== '') {
            if (tA.trim() === '') {
                document.getElementById("error_text").innerText = error_text;
                return '';
            }
        } else {
            document.getElementById("error_text").innerText = error_text;
            return '';
        }
        // Clear the error
        document.getElementById("error_text").innerText = "";
         words = tA.split(/\W+/);

        wObj = words.reduce(function(prev, curr) {
       
            if (prev[curr]) {
                prev[curr] += 1;
            } else {
                prev[curr] = 1;
            }
            return prev;
        }, {});
        return wObj;
    }

    render() {
        return (
            <div className="container">
                <h1>Cloud Generator</h1>
                <div className="tag-cloud">
                    {this.state.upload === true
                        && this.state.cloudMap
                        ? <BuildTagCloud data={this.state.cloudMap}></BuildTagCloud>
                        : <p>Cloud</p>
                    }
                </div>
                <div id="error_text" className="error"></div>
                <div className="txt-sec">
                    <form onSubmit={this.showCloud}>
                        <div>
                            <textarea
                                className="tag-txt-area"
                                placeholder="Enter word tags"
                                value={this.state.value}
                                rows="5"
                                cols="30">
                            </textarea>
                        </div>
                        <button
                            onClick={this.getWords}
                            className="load-btn">Generate
        </button>
                    </form>
                </div>
            </div>
        );
    }
}
export default TagCloud;