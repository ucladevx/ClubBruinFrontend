import './App.css';
import emailjs from 'emailjs-com'

function Home() {
  return (
    <div>
    <div className="parent">
      {/* <button onClick = {() => speak()}>Send the mail</button> */}
      <h1 className="header">Interested in beta testing?</h1>
      <form onSubmit={sendEmail}>
        <div>
          <div>
            <input id="name" className="formStyling" placeholder="Name" name="name"></input>
          </div>
          <div>
            <input id="email" className="formStyling" placeholder="Email" name="email"></input>
          </div>
          <div>
            <input className="submitForm" type="submit" value="Submit"></input>
          </div>
          </div>
          </form>
          <button onClick={(e)=>{ e.preventDefault(); window.location.href="https://docs.google.com/forms/d/e/1FAIpQLSf4vdslGY1ODGTcD7Y0OChwIpHaRkW7zQrKifFhtISCVijFkg/viewform"}} className="googleform">Help Guide Us By Filling Out Our Google Form!</button>
        <img className="royce" src="/assets/darkerroyce.png" alt="royce"></img>

    </div>
    <div className="right">
      <img className="logo" src="/assets/club_bruin_logo.png" alt="logo"></img>
      <p className="description">Missing the Bruin Bear? Sunsets at Royce? Rende? late night convos? Club Bruin is a virtual campus experience for UCLA. <br></br><br></br>Imagine Club penguin but for bruins. We are looking to create a fun place where you can meet new people, chill with the old friends and re-live being on campus.</p>
    </div>
    </div>
  );
}

function sendEmail(e) {
  e.preventDefault();

  if (document.getElementById('name').value === '' || document.getElementById('email') === '') {
      alert("Fill out both name and email!");
      return;
  }

  else {
    emailjs.sendForm('gmail', 'template_rjrfzls', e.target, 'user_lqCTtWyyr92dj22nZro4N')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    e.target.reset()
  }

  alert('Your response was recorded. Thank you!')

}


export default Home;
