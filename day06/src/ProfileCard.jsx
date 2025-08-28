const ProfileCard = ({ name, role, image, description }) => {
    return (
        <div style={styles.card}>
            <img src={image} alt={name} style={styles.image} />
            <h2>{name}</h2>
            <h4>{role}</h4>
            <p>{description}</p>
        </div>
    );
};

const styles = {
    card: {
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        maxWidth: "250px",
        textAlign: "center",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        margin: "10px",
    },
    image: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
    },
};

export default ProfileCard;
