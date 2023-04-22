root = 0

createSampler = function(sound){
  sample = samples[sound]
  cGain = 1/sample.amp
	//ptos
  degree = 60 - sample.pitch
  cRate = Math.pow(2,degree/12) 
  //returns
  if(sample.source == "freesound") 
  	{return Freesound(sample.id, { maxVoices:8, rate:cRate, gain:cGain})
    }
}

ptos = function(num){
  degree = num + root
  return Math.pow(2,degree/12) 
}

// major = function(num){
//   degree = num + root
//   scale = [0,2,4,5,7,9,11]
//   octave = Math.floor(degree / scale.length)
//   degree = scale[ degree degree.length]
// }

samples = {
  "harp" : {
    "id": 521934,
    "pitch": 51,
    "amp": 1, 
    "source": "freesound"
  },
  "rhodes" : {
    "id": 65719,
    "pitch": 39,
    "amp": 1, 
    "source": "freesound"
  },
  "marimba" : {
    "id": 577698,
    "pitch": 44.2,
    "amp": 1, 
    "source": "freesound"
  },
  "bambooMarimba" : {
    "id": 130530,
    "pitch": 60.5,
    "amp": 1.5, 
    "source": "freesound"
  },
  "ukulele" : {
    "id": 136942,
    "pitch": 62.8,
    "amp": .5, 
    "source": "freesound"
  },
  "caixa" : {
    "id": 531787,
    "pitch": 60,
    "amp": .5, 
    "source": "freesound"
  },
  "balafon" : {
    "id": 528064,
    "pitch": 49.5,
    "amp": .2, 
    "source": "freesound"
  },
  "kalimba" : {
    "id": 536550,
    "pitch": 63,
    "amp": 1, 
    "source": "freesound"
  },
  "karimba" : {
    "id": 58675,
    "pitch": 59.7,
    "amp": .2, 
    "source": "freesound"
  },
  "voice" : {
    "id": 508347,
    "pitch":65,
    "amp": .4, 
    "source": "freesound"
  }
}