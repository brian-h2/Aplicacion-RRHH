export default function Error({ message, code }) {
    return (
        <div className="error-container">
            <h2 className="error-title">Error {code}</h2>
            <p className="error-message">{message}</p>
        </div>
    );
}