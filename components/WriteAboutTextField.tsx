// components/CustomTextField.tsx

import { Box, TextareaAutosize } from "@mui/material"
import { useFormik } from "formik"
import { useEffect } from "react"
import { BsFillSendFill } from "react-icons/bs"
import { useDispatch } from "react-redux"

import { useLangRedux } from "~helper/getLanguageStates"
import {
  setChatText,
  setCommand,
  setConvertation,
  setSelectedTextTemplateOpen,
  setTextFromHtml
} from "~StateManagment/LanguageSlice"

const WriteAboutTextField: React.FC = () => {
  const { chatText, converstaion, textFromHtml, command, fetching } =
    useLangRedux()

  const dispatch = useDispatch()
  const {
    values,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    submitForm,
    setFieldValue
  } = useFormik({
    initialValues: {
      text: ""
    },
    onSubmit: async (values) => {
      dispatch(setCommand(""))

      dispatch(setChatText(values.text))
      dispatch(setConvertation({ type: "req", text: values.text }))
      setFieldValue("text", "")
    }
  })

  useEffect(() => {}, [chatText])

  return (
    <div className="  w-[95%] lg:w-[90%]    ">
      <form onSubmit={handleSubmit}>
        <Box position="relative">
          <TextareaAutosize
            className="w-[100%] bg-[#E7E8EA]  text-left ltr text-sm font-normal font-sans leading-normal p-3 rounded-xl 
             shadow-lg shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid 
             border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 
              dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border transition-all duration-200"
            aria-label="empty textarea"
            placeholder={
              textFromHtml
                ? "what do you want to do with this text?"
                : "Ask me anything"
            }
            minRows={6}
            value={values.text}
            onChange={handleChange}
            id="text"
            onBlur={handleBlur}
          />
          <Box position="absolute" bottom={20} right={10}>
            <button
              disabled={values.text.length === 0}
              className={` ${values.text.length < 0 && "text-gray-100"} text-[20px] cursor-pointer ${
                values.text.length > 0 && "text-[#8e54c5]  "
              }`}
              onClick={() => {
                if (textFromHtml.length === 0 || !textFromHtml) {
                  submitForm()
                }
                // dispatch(setChatText(values.text))
                if (textFromHtml && textFromHtml.length > 0) {
                  dispatch(setConvertation({ type: "res", text: textFromHtml }))
                  dispatch(setConvertation({ type: "req", text: values.text }))
                  dispatch(setSelectedTextTemplateOpen(false))
                  dispatch(setChatText(textFromHtml))
                  dispatch(setCommand(values.text))
                  dispatch(setTextFromHtml(""))
                  setFieldValue("text", "")
                }
              }}>
              <BsFillSendFill />
            </button>
          </Box>
        </Box>
      </form>
    </div>
  )
}

export default WriteAboutTextField
