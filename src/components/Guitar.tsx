import type {Guitar} from '../types'

type GuitarProps = {
    product: Guitar,
    addToCart: (item: Guitar) => void
}

const Guitar = ({ product, addToCart }: GuitarProps) => {

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`./img/${product?.image}.jpg`} alt="imagen guitar" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{product?.name}</h3>
                <p>{product?.description}</p>
                <p className="fw-black text-primary fs-3">${product?.price}</p>
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(product)
                    }}
                    className="btn btn-dark w-100"
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}

export default Guitar