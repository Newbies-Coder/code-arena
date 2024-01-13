type VerifyStatusProps = {
  name: string
}

const StatusColor = {
  Verify: '#34CD26',
  Banned: '#EC3740',
  Unverify: '#E8FC00',
  Celebrity: '#007AD9',
}

const VerifyStatus = (props: VerifyStatusProps) => {
  return (
    <div className="flex items-center justify-start gap-2">
      <div className="w-2 h-2 rounded-full" style={{ background: StatusColor[props.name] }}></div>
      <div className="text-sm font-normal font-['Poppins'] leading-normal">{props.name}</div>
    </div>
  )
}

export default VerifyStatus
