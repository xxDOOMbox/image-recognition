const app = new Clarifai.App({
 apiKey: APIKEY
});

const results = document.getElementById('results');
const form    = document.getElementById('form');
const list    = document.getElementById('concepts');  
const image   = document.getElementById('image'); 
form.addEventListener('submit', handleSubmit); 

function handleSubmit(e) {
  e.preventDefault(); 
  const imageURL = document.getElementById('image-url').value
  document.getElementById('image-url').value = ''
  what(imageURL); 
}

// predict the contents of an image by passing in a url
// https://samples.clarifai.com/metro-north.jpg

function what(image) {
  app.models.predict(Clarifai.GENERAL_MODEL, image).then(
    function(response) {
      list.innerHTML = '';
      showImage(image); 
      showConcepts(response.outputs[0].data.concepts);
    },
    function(err) {
      console.error(err);
    }
  );
};

function showImage(url) {
  image.src = url;
}

function showConcepts(concepts) {
  concepts.forEach(concept => {
    const li = document.createElement('li'); 
    li.innerText = `${concept.name}: probability ${concept.value.toFixed(3)}`;
    list.append(li);
  });
};



// Example URLs: 
// couple
console.log('https://img-s3.onedio.com/id-5718922252924a4f1c21cfb1/rev-0/raw/s-4bb88bec855a94e343b67458b4d73d7c1214b7da.jpg');

// two people biking
console.log('http://www.lmt-lss.com/wp-content/uploads/2015/08/R62.jpg');

// bird 
console.log('https://d1le9g1q5z956q.cloudfront.net/picture-of-the-day/139/large_The-Curious-Parrot-Pobble-365.png');

// scary face 
console.log('http://familyonbikes.org/blog/wp-content/uploads/2012/03/face.jpg'); 

// amsterdam 
console.log('http://www.publicdomainpictures.net/pictures/160000/velka/famous-nyhavn-cityscape.jpg');
