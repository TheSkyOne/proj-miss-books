const { Link } = ReactRouterDOM

export function NotFound() {

    return (
        <section className="not-found-container">
            <section className="not-found">
                <h2>Ooops... Error 404</h2>
                <p>
                Sorry but the page you are looking for does not exist.
                </p>
            </section>
            <button><Link to="/">Back</Link></button>
        </section>
    )
}