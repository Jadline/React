import photo from "./assets/photo.png"
function Card (){
     return (
        <div className="card">
            <img src={photo} alt="profile picture"></img>
            <h2 className="card-title">Njeri Jadline</h2>
            <p className="card-text">I am a student of Mathematics</p>

        </div>
     );
}
export default Card