export default function Success({ message, title }) {
    return (
        <div className="success-container">
            <h2 className="success-title">{title}</h2>
            <p className="success-message">{message}</p>
        </div>
    );
}