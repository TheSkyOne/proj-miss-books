const { useState, useEffect } = React


export function BookFilter({ filter, onSetFilter }) {
    const [editedFilter, setEditedFilter] = useState({ ...filter })

    useEffect(() => {
        onSetFilter(editedFilter)
    }, [editedFilter])


    function onFilterChanged({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case "number":
                value = +target.value
                break
            case "checkbox":
                value = target.checked
                break
        }

        setEditedFilter(prevFitler => ({ ...prevFitler, [field]: value }))
    }


    const { maxPageCount, maxPrice, onSale } = editedFilter
    return (
        <section className="books-filter">
            <h2>Filter Books</h2>
            <form>
                <label htmlFor="page-count">Max Page Count:</label>
                <input onChange={onFilterChanged} type="number" id="page-count" name="maxPageCount" min={0} max={1000} value={maxPageCount}></input>

                <label htmlFor="max-price">Max Price:</label>
                <input onChange={onFilterChanged} type="number" id="max-price" name="maxPrice" min={0} max={1000} value={maxPrice}></input>

                <label htmlFor="sale">On Sale:</label>
                <input onChange={onFilterChanged} type="checkbox" id="sale" name="onSale" checked={onSale}></input>

                <button>Submit</button>
            </form>
        </section>
    )
}