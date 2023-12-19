import { Carousel } from 'antd'
import './style.scss'
const contentStyle: React.CSSProperties = {
  color: '#fff',
  borderRadius: '20px',
  objectFit: 'cover',
  height: '300px',
  width: '100%',
}

const CarouselItem = () => {
  return (
    <Carousel autoplay>
      <div>
        <img
          style={contentStyle}
          src="https://images.unsplash.com/photo-1682685797507-d44d838b0ac7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://images.unsplash.com/photo-1701893852514-e079530f6bb8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://images.unsplash.com/photo-1701941258075-ae093a5f0185?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </Carousel>
  )
}

export default CarouselItem
