import React, { useEffect, useState } from 'react'
import _ from "lodash";

import DisplayComments from './DisplayComments'
import { ActionProvider } from './ActionContext'
import SignField from './SignField'
import Input from './Input'

export const CommentSection = ({
  commentsArray,
  currentUser,
  setComment,
  signinUrl,
  signupUrl,
  customInput,
  onSignin
}) => {
  const [comments, setComments] = useState(commentsArray)
  
  useEffect(() => {
    setComments(commentsArray)
  }, [commentsArray])

  // console.log("CommentSection : ", currentUser)

  return (
    <ActionProvider
      currentUser={currentUser}
      setComment={setComment}
      comments={comments}
      signinUrl={signinUrl}
      signupUrl={signupUrl}
      customInput={customInput}
    >
      <div className={"section"}>
        <div className={"inputBox"}>
          {signupUrl && !currentUser ? <SignField  onSignin={onSignin} /> : <Input />}
        </div>
        <div className={"displayComments"}>
          <DisplayComments comments={comments} />
        </div>
      </div>
    </ActionProvider>
  )
}
