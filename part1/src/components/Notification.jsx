const Notification = ({ message, type = 'success' }) => {
    if (!message) return null

    return (
        <div className={type === 'error' ? 'error' : 'notification'}>
            {message}
        </div>
    )
}

export default Notification
