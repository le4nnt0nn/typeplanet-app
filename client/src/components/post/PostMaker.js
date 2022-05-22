import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewPost } from '../../actions/post';

// icons
import { FaTrash } from 'react-icons/fa';

const PostMaker = ({ addNewPost }) => {
    const [text, setText] = useState('');
    const [categories, setCategories] = useState([]);

    function selectedOption(disableBtnId, categoryValue) {
        var odd = document.getElementById(`${disableBtnId}`)
        odd.disabled = true;
        setCategories(oldCats => [`${categoryValue}`, ...oldCats])
    }

    return (
        <>
            <div className="text-center">
                <h3 className="mt-4">Share something</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addNewPost({ text, categories });
                        setText('');
                        setCategories([''])
                    }}
                >
                    <textarea
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        value={text}
                        name="text"
                        cols="60"
                        rows="5"
                        placeholder="My mind is from another planet..."
                    >
                    </textarea>
                    <br />
                    <input type="submit" className="post-btn btn btn-dark my-1" value="Submit" />
                </form>
                <div className="categories-buttons">
                    <h3 className="mt-3">Pick your category!</h3>
                    <div className="first-categories-buttons mt-1">
                        <button
                            onClick={() => {
                                selectedOption('content-btn', 'Question');
                                selectedOption('question-btn', '');
                            }}
                            value={categories}
                            name="categories"
                            id="question-btn"
                        >
                            Question</button>
                        <button
                            onClick={() => {
                                selectedOption('question-btn', 'Content');
                                selectedOption('content-btn', '');
                            }}
                            name="categories"
                            id="content-btn"
                        >Content</button>
                    </div>
                    <div className="second-categories-buttons mt-5">
                        <button
                            onClick={() => {
                                selectedOption('angular-btn', 'React');
                                selectedOption('react-btn', '');
                                selectedOption('java-btn', '');
                                selectedOption('c-btn', '');
                            }}
                            name="categories"
                            id="react-btn"
                        >React</button>
                        <button
                            onClick={() => {
                                selectedOption('react-btn', 'Angular');
                                selectedOption('angular-btn', '');
                                selectedOption('java-btn', '');
                                selectedOption('c-btn', '');
                            }}
                            name="categories"
                            id="angular-btn"
                        >Angular</button>
                        <button
                            onClick={() => {
                                selectedOption('java-btn', 'JavaScript');
                                selectedOption('js-btn', '');
                                selectedOption('c-btn', '');
                            }}
                            name="categories"
                            id="js-btn"
                        >JavaScript</button>
                        <button
                            onClick={() => {
                                selectedOption('c-btn', 'Java');
                                selectedOption('java-btn', '');
                                selectedOption('js-btn', '');
                                selectedOption('react-btn', '');
                                selectedOption('angular-btn', '');
                            }}
                            name="categories"
                            id="java-btn"
                        >Java</button>
                        <button
                            onClick={() => {
                                selectedOption('java-btn', 'C#');
                                selectedOption('c-btn', '');
                                selectedOption('js-btn', '');
                                selectedOption('react-btn', '');
                                selectedOption('angular-btn', '');
                            }}
                            name="categories"
                            id="c-btn"
                        >C#</button>
                    </div>
                </div>
                <button
                    onClick={() => {
                        document.getElementById('question-btn').disabled = false;
                        document.getElementById('content-btn').disabled = false;
                        document.getElementById('angular-btn').disabled = false;
                        document.getElementById('react-btn').disabled = false;
                        document.getElementById('js-btn').disabled = false;
                        document.getElementById('java-btn').disabled = false;
                        document.getElementById('c-btn').disabled = false;
                        setCategories([''])
                    }}
                    className="reset-btn mt-4"
                ><FaTrash /></button>
            </div>
        </>
    );
};

PostMaker.propTypes = {
    addNewPost: PropTypes.func.isRequired,
};

export default connect(null, { addNewPost })(PostMaker);
