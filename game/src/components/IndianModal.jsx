import logo from '../assets/indian.png'

const IndianModal = () => {
  return (
    <div className='indian-modal'>
      <img src = {logo} />
     <div className='inner'>
     <h1>
        Game is over! you chose the indian guy
      </h1>
     </div>
     
    </div>
  )
}

export default IndianModal
