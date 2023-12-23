import MonacoEditor, { OnMount } from '@monaco-editor/react'
import { CodeEditorType } from '@/@types/home'

const CodeEditor: React.FC<CodeEditorType> = ({ onChange, initialValue }) => {
  const onEditorDidMount: OnMount = (editor) => {
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue()
      console.log(value)
      onChange(editor.getValue())
    })
    editor.getModel()?.updateOptions({ tabSize: 2 })
  }

  return (
    <div className="mt-16 md:w-[53%] lg:w-[54.3%] xl:w-[55.6%]">
      <MonacoEditor
        onMount={onEditorDidMount}
        value={initialValue}
        height="400px"
        width="100%"
        theme="vs-dark"
        defaultLanguage="javascript"
        options={{
          wordWrap: 'on',
          minimap: { enabled: true },
          lineNumbersMinChars: 3,
          fontSize: 16,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

export default CodeEditor
