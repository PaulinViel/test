import "./pageNavigator.css";

const PageNavigator = ({page, count, page_size, changePage}) => {
    const totalPages = Math.floor(count / page_size)

    const nextPage = () => {
        if (page + 1 <= totalPages) {
            return page + 1
        }
    }

    const previousPage = () => {
        if (page - 1 !== 0) {
            return page - 1
        }
    }

    return (
        <div className="navigator">
            <span onClick={() => changePage(previousPage())} className="arrow left" />

            <span className="number">{page}</span>

            <span onClick={() => changePage(nextPage())} className="arrow right" />
        </div>
    )
}

export default PageNavigator
