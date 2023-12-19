import { useState, useEffect, useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { EditorState } from '@uiw/react-codemirror'
import { EditorView, keymap, highlightActiveLine } from '@codemirror/view'
import { Alert, Button, Col, Dropdown, Menu, MenuProps, Row, Select, Space } from 'antd'
import {
  BorderOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  CompassOutlined,
  DownOutlined,
  PlayCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import './style.scss'
import CustomedButton from '../CustomedButton'

const LanguageItems: MenuProps['items'] = [
  {
    label: 'Javascript',
    key: '1',
  },
  {
    label: 'HTML/CSS',
    key: '2',
  },
]

const ThemeItems: MenuProps['items'] = [
  {
    label: 'VSCode Dark',
    key: '1',
  },
  {
    label: 'VSCode Light',
    key: '2',
  },
]

const CodeEditor = () => {
  const [output, setOutput] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [code, setCode] = useState<string>('')
  const [outputBox, setOutputBox] = useState<boolean>()

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode)
  }, [])

  const testCases = [
    { key: '01', title: 'Test case', icon: <CheckCircleFilled className="text-green-400 text-3xl" />, show: false },
    { key: '02', title: 'Test case', icon: <CloseCircleFilled className="text-red-600 text-3xl" />, show: false },
    { key: '03', title: 'Test case', icon: <CheckCircleFilled className="text-green-400 text-3xl" />, show: false },
  ]
  const [visibleTestCase, setVisibleTestCase] = useState<boolean[]>(Array(testCases.length).fill(false))

  const toggleTestCase = (index: number) => {
    const newVisibleTestCase = [...visibleTestCase]
    newVisibleTestCase[index] = !newVisibleTestCase[index]
    setVisibleTestCase(newVisibleTestCase)
  }

  return (
    <>
      <div className="fixed w-[56%] border-b-4 border-blue-900 bg-cool-gray-800 px-4 z-10 overflow-y-auto">
        <div className="flex justify-between items-center h-16">
          <div>
            <Select
              className="bg-cool-gray-700 rounded-lg ml-4 text-teal-400 font-popins"
              defaultValue="Javascript"
              style={{ width: 120, border: '0', color: '#00D1FF' }}
              options={[
                { value: 'javascript', label: 'Javascript' },
                { value: 'htmlcss', label: 'HTML/CSS' },
              ]}
              bordered
            />
            <Dropdown
              menu={{ items: ThemeItems }}
              placement="bottomRight"
              className="bg-cool-gray-700 py-2 px-6 rounded-lg ml-4 text-teal-400 font-popins"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  theme
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div>
            <Button className="coding-header-button p-0 m-0 h-6 w-6 rounded-full border-0 mr-7">
              <SyncOutlined className="text-white text-xl" />
            </Button>
            <Button className="coding-header-button p-0 m-0 h-6 w-6 rounded-full border-0">
              <BorderOutlined className="text-white text-xl" />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <CodeMirror
          className="text-base"
          height="378px"
          width="300px"
          minWidth="100%"
          maxWidth="300px"
          theme={vscodeDark}
          value={code}
        />
      </div>
      <div className="fixed bg-cool-gray-800 bottom-0 w-[56%] h-56 p-4 border-t-4 border-blue-900">
        <Row>
          <Col xl={18}>
            <div className="overflow-y-auto overflow-x-hidden h-48">
              <div
                className={`${
                  outputBox
                    ? 'overflow-x-hidden h-36 overflow-y-auto'
                    : outputBox === false
                    ? 'overflow-x-hidden h-36 overflow-y-auto hidden'
                    : 'overflow-x-hidden h-36 overflow-y-auto hidden'
                }`}
              >
                <p className="font-popins text-base text-white">Output</p>
                <Button className="bg-red-400" onClick={() => setOutputBox(false)}>
                  CLOSE
                </Button>
                <pre>{output}</pre>
                <div id="output-container">{selectedLanguage === 'htmlcss' && <p>HTML/CSS OUTPUT</p>}</div>
              </div>
              <p className="font-popins text-base text-white">Test cases</p>
              <div className="list-test-case overflow-y-auto overflow-x-hidden h-36">
                <div className="p-4 py-0">
                  {testCases.map((item, index) => (
                    <div key={index}>
                      <div className="w-full h-12 px-4 bg-cool-gray-700 rounded-full my-2">
                        <div
                          onClick={() => toggleTestCase(index)}
                          className="flex justify-between items-center w-full h-12 p-4 my-2 bg-cool-gray-700 rounded-full"
                        >
                          <p className="font-popins text-lg text-white m-0">
                            {item.key}&nbsp;&nbsp;{item.title}
                          </p>
                          {item.icon}
                        </div>
                      </div>
                      {visibleTestCase[index] && (
                        <div className="h-16 w-full transition-transform text-white border border-gray-opacity bg-gray-800 rounded-sm p-2 px-4 text-md mt-2">
                          <p>Input</p>
                          <p>Output</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>
          <Col xl={6}>
            <div className="p-4">
              {
                <CustomedButton
                  label="RUN CODE"
                  Icon={PlayCircleOutlined}
                  classNameButton="border-0"
                  classNameIcon="text-2xl font-popins"
                />
              }
              <div className="pt-4">
                {
                  <CustomedButton
                    label="SUBMIT"
                    Icon={CompassOutlined}
                    classNameButton="border-0"
                    classNameIcon="text-2xl font-popins"
                  />
                }
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default CodeEditor
