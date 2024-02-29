import { Alert, FormItemProps, Input } from 'antd'
import Form from 'antd/es/form'
import React from 'react'

export interface InputProps extends FormItemProps {
  name: string
  label: string
  placeholder?: string
  required?: boolean
}

const FormItem: React.FC<InputProps> = ({
  name,
  label,
  rules = [],
  children,
  placeholder,
  required = true,
  ...props
}) => {
  return (
    <div className="w-full relative">
      <h3 className="absolute -top-2 left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">{label}</h3>
      <Form.Item
        name={name}
        rules={[
          {
            required: required,
            message: (
              <Alert
                className="bg-transparent text-base text-red-700"
                message={`Please enter your ${label}`}
                banner
                type="error"
              />
            ),
          },
          ...rules,
        ]}
        className={children ? '' : 'border-2 rounded-lg border-white w-full mb-10 flex flex-col'}
        {...props}
      >
        {children ? (
          children
        ) : (
          <Input
            className="h-12 bg-transparent border-none text-white text-md focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
            placeholder={placeholder}
            style={{ color: 'white' }}
          />
        )}
      </Form.Item>
    </div>
  )
}

export default FormItem
