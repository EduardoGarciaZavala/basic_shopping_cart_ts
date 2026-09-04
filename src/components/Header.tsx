
import type { CartItem, Guitar } from "../types";

type HeaderProps = {
    cart: CartItem[],
    addToCart: (product: Guitar) => void,
    removeToCart: (product: CartItem, action: string) => void,
    clearCart : () => void
    IsEmpty: boolean,
    cartTotal: number
}
export default function Header({ cart, addToCart, removeToCart, clearCart, IsEmpty, cartTotal }: HeaderProps) {

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="#" onClick={(e) => e.preventDefault()}>
                            <img className="img-fluid" src="./img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="img-fluid" src="./img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">

                                {IsEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (

                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cart.map(product => (
                                                        <tr key={product?.id}>
                                                            <td>
                                                                <img className="img-fluid" src={`./img/${product?.image}.jpg`} alt="imagen product" />
                                                            </td>
                                                            <td>{product?.name}</td>
                                                            <td className="fw-bold">
                                                                ${product?.price}
                                                            </td>
                                                            <td className="flex align-items-start gap-4">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        removeToCart(product, '-');
                                                                    }}
                                                                >
                                                                    -
                                                                </button>
                                                                {product?.quantity}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        addToCart(product);
                                                                        //setCart(prevCart => prevCart.map(item => item.id === product.id && item.quantity < MAX_ITEMS_IN_CART ? { ...item, quantity: item.quantity + 1 } : item));
                                                                    }}
                                                                >
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        removeToCart(product, 'x');
                                                                    }}
                                                                >
                                                                    {"X"}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                        <button onClick={(e => {
                                            e.preventDefault();
                                            clearCart();
                                        })} className="btn btn-dark w-100 mt-3 p-2">
                                            Vaciar Carrito
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
