import './Loading.scss'

const Loading = () => {
  return (
    <div className="loader">
      <div className="loader-inner">
        <div className="loader-wrap">
          <div className="loader-line" />
        </div>
        <div className="loader-wrap">
          <div className="loader-line" />
        </div>
        <div className="loader-wrap">
          <div className="loader-line" />
        </div>
        <div className="loader-wrap">
          <div className="loader-line" />
        </div>
        <div className="loader-wrap">
          <div className="loader-line" />
        </div>
      </div>
    </div>
  )
}

export default Loading
