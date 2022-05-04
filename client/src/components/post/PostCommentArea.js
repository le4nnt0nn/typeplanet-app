import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const PostCommentArea = ({ postId, addComment }) => {
    const [text, setText] = useState("");

    return (
        <>
            <div className="post-form">
                <div className="bg-primary text-center">
                    <h3>Leave a comment, dev!</h3>
                </div>
                <form
                    className="form my-1"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addComment(postId, { text });
                        setText("");
                    }}
                >
                    <textarea
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        value={text}
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Your comment..."
                        required
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </>
    );
};

PostCommentArea.propTypes = {
    addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(PostCommentArea);