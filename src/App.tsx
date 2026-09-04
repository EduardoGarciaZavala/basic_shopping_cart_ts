
import './App.css'
import Guitar from './components/Guitar';
import Header from './components/Header';
import { useCart } from './hooks/useCart';


function App() {

  const { cart, data, addToCart, removeToCart, clearCart, IsEmpty, cartTotal } = useCart();

  return (
    <>

      <Header cart={cart} addToCart={addToCart} removeToCart={removeToCart} clearCart={clearCart} IsEmpty={IsEmpty} cartTotal={cartTotal} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data && data.map(product => (
            <Guitar key={product.id} product={product} addToCart={addToCart} />
          ))}

        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App



