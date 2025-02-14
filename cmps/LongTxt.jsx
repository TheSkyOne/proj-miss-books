const {useState} = React

export function LongTxt({ children, length = 100 }) {
    const [expandStatus, setExpandStatus] = useState(false)

    function onExpandButtonClicked(){
        setExpandStatus(prevExpandStatus => !prevExpandStatus)
    }

    let displayText = ""
    if (children.length < length || expandStatus === true) displayText = children
    else displayText = children.slice(0, length) + "..."

    const showExpandButton = children.length > length
    const expandTxt = expandStatus ? "Collapse" : "Expand"
    return (
        <section>
            <p className="long-txt-para">{displayText}</p>
            {showExpandButton && <button onClick={onExpandButtonClicked} className="long-txt-expand-button">{expandTxt}</button>}
        </section>

    )
}