function attachEvents() {
    let loadButton = document.getElementsByClassName('load')[0];
    let addButton = document.getElementsByClassName('add')[0];
    
    // let updateButton = document.getElementsByClassName('update')[0];
    // let deleteButton = document.getElementsByClassName('delete')[0];
    var loadFunc = () => {
        let url = `https://fisher-game.firebaseio.com/catches.json`;

        fetch(url).then(function (response) {
            if (response.ok) {
                response.json().then(function (res) {
                    let id = Object.keys(res);
                    let info = Object.values(res);
                    let i = 0;
                    document.getElementById('catches').innerHTML = '';
                    info.forEach(element => {
                        // Main div to create under catches id 
                        let div = document.createElement('div');
                        // let main = document.getElementById('main');
                        let catches = document.getElementById('catches');

                        catches.append(div);
                        div.classList.add('catch');

                        div.setAttribute("data-id", `${id[i]}`);
                        //*****************************************************************************/

                        // Angler Label and input
                        let labelAngler = document.createElement('label');
                        div.append(labelAngler);
                        labelAngler.innerHTML = `Angler`;

                        let labelInput = document.createElement('input');
                        div.appendChild(labelInput);
                        labelInput.setAttribute("type", "text");
                        labelInput.setAttribute("class", "angler");
                        labelInput.value = `${element.angler}`;

                        let hr = document.createElement('hr');
                        div.append(hr);
                        //*****************************************************************************/

                        // Weight label and input 
                        let labelWeight = document.createElement('label');
                        div.appendChild(labelWeight);
                        labelWeight.innerHTML = `Weight`;

                        let labelWeightInput = document.createElement('input');
                        div.appendChild(labelWeightInput);
                        labelWeightInput.setAttribute("type", "number");
                        labelWeightInput.setAttribute("class", "weight");
                        labelWeightInput.value = `${element.weight}`;

                        let hr2 = document.createElement('hr');
                        div.append(hr2);
                        //*****************************************************************************/

                        // Species label and input
                        let labelSpecies = document.createElement('label');
                        div.appendChild(labelSpecies);
                        labelSpecies.innerHTML = `Species`;

                        let labelSpeciesInput = document.createElement('input');
                        div.appendChild(labelSpeciesInput);
                        labelSpeciesInput.setAttribute("type", "text");
                        labelSpeciesInput.setAttribute("class", "species");
                        labelSpeciesInput.value = `${element.species}`;

                        let hr3 = document.createElement('hr');
                        div.append(hr3);
                        //*****************************************************************************/

                        // Location label and input 
                        let labelLocation = document.createElement('label');
                        div.appendChild(labelLocation);
                        labelLocation.innerHTML = `Location`;

                        let labelLocationInput = document.createElement('input');
                        div.appendChild(labelLocationInput);
                        labelLocationInput.setAttribute("type", "text");
                        labelLocationInput.setAttribute("class", "location");
                        labelLocationInput.value = `${element.location}`;

                        let hr4 = document.createElement('hr');
                        div.append(hr4);
                        //*****************************************************************************/

                        // Bait label and input 
                        let labelBait = document.createElement('label');
                        div.appendChild(labelBait);
                        labelBait.innerHTML = `Bait`;

                        let labelBaitInput = document.createElement('input');
                        div.appendChild(labelBaitInput);
                        labelBaitInput.setAttribute("type", "text");
                        labelBaitInput.setAttribute("class", "bait");
                        labelBaitInput.value = `${element.bait}`;

                        let hr5 = document.createElement('hr');
                        div.append(hr5);
                        //*****************************************************************************/

                        // Capture Time label and input 
                        let labelCaptureTime = document.createElement('label');
                        div.appendChild(labelCaptureTime);
                        labelCaptureTime.innerHTML = `Capture Time`;

                        let labelcaptureTime = document.createElement('input');
                        div.appendChild(labelcaptureTime);
                        labelcaptureTime.setAttribute("type", "text");
                        labelcaptureTime.setAttribute("class", "captureTime");
                        labelcaptureTime.value = `${element.captureTime}`;

                        let hr6 = document.createElement('hr');
                        div.append(hr6);
                        //*****************************************************************************/

                        // UPDATE Button
                        let updateButton = document.createElement('button');
                        div.appendChild(updateButton);

                        updateButton.textContent = `UPDATE`;
                        updateButton.setAttribute("class", "update");
                        // updateButton.addEventListener('click', checkID, false);
                        // updateButton.setAttribute('onClick','checkId(this');

                        //*****************************************************************************/
                        // DELETE Button
                        let deleteButton = document.createElement('button');
                        div.appendChild(deleteButton);

                        deleteButton.textContent = `DELETE`;
                        deleteButton.setAttribute("class", "delete");
                        //*****************************************************************************/
                        // console.log(element);
                        // console.log(element.angler);
                        i++;
                        // console.log(i);
                        document.getElementsByClassName('load')[0].disabled = false;
                        //*****************************************************************************/

                        //************************ Update Button Event Listener************************/
                        updateButton.addEventListener('click', function () {
                            console.log('update button clicked');
                            // console.log(this.parentElement.getAttribute('data-id'));
                            let catchId = this.parentElement.getAttribute('data-id');
                            let catcherDiv = this.parentElement;
                            let angler = catcherDiv.children[1].value;
                            let weight = catcherDiv.children[4].value;
                            let species = catcherDiv.children[7].value;
                            let location = catcherDiv.children[10].value;
                            let bait = catcherDiv.children[13].value;
                            let captureTime = catcherDiv.children[16].value;

                            // console.log(catcherDiv.children);
                            // console.log(angler);
                            // console.log(weight);
                            // console.log(species);
                            // console.log(location);
                            // console.log(bait);
                            // console.log(captureTime);
                            let url = `https://fisher-game.firebaseio.com/catches/${catchId}.json`;
                            class UpdateCatch {
                                constructor() {
                                    this.angler = angler;
                                    this.weight = weight;
                                    this.species = species;
                                    this.location = location;
                                    this.bait = bait;
                                    this.captureTime = captureTime;
                                }
                            }
                            let put = new UpdateCatch();

                            // console.log(put);

                            fetch(url, {
                                method: 'PUT',
                                body: JSON.stringify(put)
                            }).then(function (response) {
                                if (response.ok) {
                                    response.json().then(function (res) {
                                        loadFunc();
                                        console.log(res);
                                    });
                                }
                                // console.log(response);
                            });
                        });
                        //************************ Delete Button Event Listener************************/
                        deleteButton.addEventListener('click', function () {
                            console.log('delete button clicked');
                            // console.log(this.parentElement.getAttribute('data-id'));
                            let catchId = this.parentElement.getAttribute('data-id');

                            let deleteRecord = this.parentElement;
                            console.log(deleteRecord);

                            let url = `https://fisher-game.firebaseio.com/catches/${catchId}.json`;

                            // console.log(put);

                            fetch(url, {
                                method: 'DELETE',
                                body: JSON.stringify(deleteRecord)
                            }).then(function (response) {
                                if (response.ok) {
                                    response.json().then(function (res) {
                                        loadFunc();
                                        console.log(res);
                                        // return res;
                                    });
                                }
                                // console.log(response);
                            });

                        });
                    });
                    // console.log(res);
                    // console.log(id);
                });
            }
            // console.log(response);
        }).catch(err => {
            console.error(err);
        });
    };

    loadButton.addEventListener('click', function() {
        console.log('load button clicked');
        loadFunc();
    });

    addButton.addEventListener('click', function () {
        console.log('add button clicked');
        let url = `https://fisher-game.firebaseio.com/catches.json`;
        // let loadFunc = this.loadFunc();
        let angler = this.parentElement.children[2].value;
        let weight = this.parentElement.children[4].value;

        let species = this.parentElement.children[6].value;
        let location = this.parentElement.children[8].value;

        let bait = this.parentElement.children[10].value;
        let captureTime = this.parentElement.children[12].value;
        // console.log(this.parentElement.children);
        if (angler != '' && weight != '' && species != '' && location != '' && bait != '' && captureTime != '') {

        
            class Catch {
                constructor(){
                    this.angler = angler;
                    this.weight = weight;
                    this.species = species;
                    this.location = location;
                    this.bait = bait;
                    this.captureTime = captureTime;
                }
            }
            let post = new Catch();
            
            console.log(post);
            this.parentElement.children[2].value = '';
            this.parentElement.children[4].value = '';
            this.parentElement.children[6].value = '';
            this.parentElement.children[8].value = '';
            this.parentElement.children[10].value = '';
            this.parentElement.children[12].value = '';

            fetch(url, {
                method:'POST',
                body: JSON.stringify(post)
            }).then(function(response){
                if(response.ok){
                    response.json().then(function(res){
                        console.log(this);
                        loadFunc();
                        console.log(res);
                    });
                }
            });
        } else {
            let err = 'Not a valid input. Please fill out all inputs';
            alert('Not a valid input. Please fill out all input fields');
            throw err;
        }
    });
}

attachEvents();

/*
Each
catch should have: 
•angler - string representing the name of the person who caught the fish
• weight - floating - point number representing the weight of the fish in kilograms
• species - string representing the name of the fish species
• location - string representing the location where the fish was caught
• bait - string representing the bait used to catch the fish
• captureTime - integer number representing the time needed to catch the fish in minutes


sample POST Request
{
    "angler": "Paulo Amorim",
    "weight": 636,
    "species": "Atlantic Blue Marlin",
    "location": "Vitória, Brazil",
    "bait": "trolled pink",
    "captureTime": "80"
}
//* this is the structure that needs to be implemented under elementID <fieldset id="main">
<div id="catches">
    <div class="catch" data-id="<id-goes-here>">
        <label>Angler</label>
        <input type="text" class="angler" value="Paulo Amorim" />
        <hr>
        <label>Weight</label>      
        <input type="number" class="weight" value="636" />
        <hr>
        <label>Species</label>
        <input type="text" class="species" value="Atlantic Blue Marlin" />
        <hr>
        <label>Location</label>
        <input type="text" class="location" value="Vitória, Brazil" />
        <hr>
        <label>Bait</label>
        <input type="text" class="bait" value="trolled pink" />
        <hr>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="80" />
        <hr>
        <button class="update">Update</button>
        <button class="delete">Delete</button>
    </div>
</div>
*/