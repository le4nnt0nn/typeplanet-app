import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewPost } from '../../actions/post';

const PostMaker = ({ addNewPost }) => {
    const [text, setText] = useState('');
    const [categories, setCategories] = useState(['']);

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
                        placeholder="My mind if from another planet..."
                    >
                    </textarea>
                    <br/>
                    <button onClick={() => {setCategories(categories.push('React'))}}>React</button>
                    <button>Angular</button>
                    <input type="submit" className="post-btn btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </>
    )
}

PostMaker.propTypes = {
    addNewPost: PropTypes.func.isRequired,
  };
  
  export default connect(null, { addNewPost })(PostMaker);
