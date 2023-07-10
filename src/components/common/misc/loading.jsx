const Loading = () => {
    return (
        <>
            Loading...
            <div className="spinner-border mt-5" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </>
    )
}

export default Loading;