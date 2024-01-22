// @ts-nocheck
import React, { useRef} from "react";

const NewComment = () => {
    const commentRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const commentValue = commentRef.current.value;
        console.log(commentValue);
        commentRef.current.value = '';
    }

    return(<div>
        <form onSubmit={handleSubmit}>
            <label>Your Comment
                <input type="text" name="comment" ref={commentRef}/>
            </label>
            <button>Submit</button>
        </form>
    </div>);
}

export default NewComment;