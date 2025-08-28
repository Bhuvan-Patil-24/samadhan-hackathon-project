import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ProfileCard
        name="Aniket Mishra"
        role="Frontend Developer"
        image="/public/profileImg.png"
        description="Passionate about building interactive UIs with React."
      />

      <ProfileCard
        name="Bhuvan Patil"
        role="Data Scientist"
        image="/public/profileImg.png"
        description="Loves working with ML models and big data."
      />
      <ProfileCard
        name="Aniket Mishra"
        role="Frontend Developer"
        image="/public/profileImg.png"
        description="Passionate about building interactive UIs with React."
      />

      <ProfileCard
        name="Bhuvan Patil"
        role="Data Scientist"
        image="/public/profileImg.png"
        description="Loves working with ML models and big data."
      />
    </div>
  );
}

export default App;
