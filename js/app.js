body = document.querySelector('body');
t = 0;
function levels() {
    let chooseLevel = `
      <div class="levels">
      
        <img src="img/target.png" width="150" heigth="150" alt="target" style="border-radius:0%;"/>
        <h1 style="text-shadow:4px 4px 4px red; color:white; ">Shooting Game </h1>
        <h2>Choose your level</h2>
        <p></p>
        <form>
            <div style="text-align:left">
            <input type="radio" name="level" value="beginner" checked> Beginner<br>
            <input type="radio" name="level" value="intermediate"> Intermediate<br>
            <input type="radio" name="level" value="expert"> Expert<br><br>
            <input style="background-color: red; color: white; height: 40px; width: 300px;" type="button" value ="Start" onclick="fnLevel(level.value)">
            </div>
        </form> 
       
      </div>
  `;
    let wLevels = document.createElement('div');
    wLevels.innerHTML = chooseLevel;
    body.appendChild(wLevels);

}
function fnLevel(c){
    if(c=='beginner') t=2000
    else if(c=='intermediate') t=1500
    else{t=1000}
    localStorage.setItem('level',c);
    localStorage.setItem("t",t); 
    location.href='start.html';
    event.preventDefault()
 } 

window.addEventListener("load", levels, true);